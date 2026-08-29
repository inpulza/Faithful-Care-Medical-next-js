import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { z } from "zod";
import { normalizeExternalContactSourcePage, sendContactFormEmails } from "../../lib/contact-email";
import { publicRoutes } from "../../lib/route-contract";

export const runtime = "nodejs";

const allowedPages = new Set([...publicRoutes.map(({ path }) => path), "/es/"]);
const allowedServices = new Set([
  "Schedule a visit",
  "Ask a question",
  "Membership info",
  "Other",
]);

const contactFormSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Valid email is required").max(254),
  phone: z.string().trim().max(30).optional().default(""),
  service: z
    .string()
    .trim()
    .max(100)
    .optional()
    .default("")
    .transform((value) => (value && allowedServices.has(value) ? value : value ? "Other" : "")),
  message: z.string().trim().max(2000).optional().default(""),
  sourcePage: z.string().refine((value) => allowedPages.has(value), "Invalid source page"),
});

interface RateBucket {
  count: number;
  resetAt: number;
}

const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const rateBuckets = new Map<string, RateBucket>();

function clientKey(request: Request): string {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    || request.headers.get("x-real-ip")
    || "unknown";
}

function checkRateLimit(key: string): { allowed: boolean; retryAfterMs: number } {
  const now = Date.now();
  const bucket = rateBuckets.get(key);
  if (!bucket || bucket.resetAt <= now) {
    rateBuckets.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return { allowed: true, retryAfterMs: 0 };
  }
  if (bucket.count >= RATE_LIMIT_MAX) {
    return { allowed: false, retryAfterMs: bucket.resetAt - now };
  }
  bucket.count += 1;
  return { allowed: true, retryAfterMs: 0 };
}

export async function POST(request: Request) {
  const requestId = randomUUID();
  const limit = checkRateLimit(clientKey(request));
  if (!limit.allowed) {
    return NextResponse.json(
      {
        success: false,
        error: "Too many submissions from this connection. Please wait a few minutes and try again, or call us at (239) 423-0205.",
      },
      {
        status: 429,
        headers: { "Retry-After": Math.ceil(limit.retryAfterMs / 1000).toString() },
      },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, error: "Invalid JSON body" }, { status: 400 });
  }

  const result = contactFormSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json(
      { success: false, error: result.error.issues[0]?.message || "Invalid form data" },
      { status: 400 },
    );
  }

  const emailResult = await sendContactFormEmails(
    {
      ...result.data,
      sourcePage: normalizeExternalContactSourcePage(result.data.sourcePage),
    },
    requestId,
  );
  if (!emailResult.success) {
    console.error(`[contact] request ${requestId} failed to send`);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to process your request. Please try again or call us at (239) 423-0205.",
        requestId,
      },
      { status: 500 },
    );
  }

  return NextResponse.json({ success: true, requestId });
}
