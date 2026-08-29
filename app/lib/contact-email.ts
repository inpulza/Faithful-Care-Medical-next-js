import { Resend } from "resend";

const FROM_EMAIL = "Faithful Care Medical <noreply@faithfulcaremedical.com>";
const CLINIC_EMAIL = "info@faithfulcaremedical.com";
const PRODUCTION_DOMAIN = "https://faithfulcaremedical.com";

function getBaseUrl(): string {
  if (process.env.NODE_ENV === "production") {
    return PRODUCTION_DOMAIN;
  }
  const replitDomain = process.env.REPLIT_DOMAINS?.split(",")[0];
  if (replitDomain) {
    return `https://${replitDomain}`;
  }
  return PRODUCTION_DOMAIN;
}

function getLogoUrl(): string {
  return `${getBaseUrl()}/images/faithful-care-logo-email.png`;
}

function getSiteUrl(): string {
  return PRODUCTION_DOMAIN;
}

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  sourcePage: string;
}

export function normalizeExternalContactSourcePage(sourcePage: string): string {
  if (sourcePage.startsWith("/primary-care/")) return "/primary-care";
  if (sourcePage.startsWith("/palliative-care/")) return "/palliative-care";
  if (sourcePage === "/es/medico-de-familia-naples" || sourcePage === "/es/cuidados-paliativos-naples") return "/es";
  return sourcePage;
}

const PHI_KEYWORDS = [
  "diabetes", "diabetic", "insulin", "a1c", "hba1c",
  "cancer", "tumor", "chemo", "chemotherapy", "radiation", "biopsy", "oncology",
  "hiv", "aids", "hepatitis", "sti", "std", "herpes", "syphilis", "gonorrhea",
  "depression", "anxiety", "bipolar", "schizophrenia", "ptsd", "suicidal",
  "psychiatric", "mental health", "therapist", "ssri", "antidepressant",
  "pregnan", "miscarriage", "abortion", "contraceptive", "menopause", "ivf",
  "addiction", "alcoholic", "rehab", "opioid", "narcotic", "fentanyl", "oxycodone",
  "stroke", "heart attack", "myocardial", "copd", "asthma", "emphysema",
  "alzheimer", "dementia", "parkinson", "ms ", "multiple sclerosis", "lupus",
  "kidney disease", "dialysis", "liver disease", "cirrhosis",
  "blood pressure", "hypertension", "cholesterol", "thyroid",
  "medication", "medicine", "prescription", "rx", "dose", "mg", "pills",
  "diagnos", "symptom", "pain", "bleeding", "swelling", "rash", "infection",
  "surgery", "operation", "hospital", "er ", "emergency room",
  "ssn", "social security", "dob", "date of birth", "medical record",
];

const MESSAGE_LENGTH_THRESHOLD = 200;

export function classifyMessageRisk(raw: string): {
  risky: boolean;
  reason: "empty" | "long" | "keyword" | "safe";
  safeMessageHtml: string;
} {
  const message = (raw || "").trim();
  if (!message) {
    return { risky: false, reason: "empty", safeMessageHtml: "" };
  }
  const lower = message.toLowerCase();
  const matched = PHI_KEYWORDS.find((kw) => lower.includes(kw));
  const tooLong = message.length > MESSAGE_LENGTH_THRESHOLD;
  if (matched || tooLong) {
    const reason: "long" | "keyword" = matched ? "keyword" : "long";
    return {
      risky: true,
      reason,
      safeMessageHtml: `<em style="color:#92400e;">Message withheld for privacy (${reason === "keyword" ? "possible health terms" : "long free-text"}). Please call the patient at the number above before responding by email. Length: ${message.length} chars.</em>`,
    };
  }
  return { risky: false, reason: "safe", safeMessageHtml: escapeHtml(message) };
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function sanitizeForAttr(str: string): string {
  return encodeURIComponent(str);
}

function getPageLabel(sourcePage: string): string {
  const pageMap: Record<string, string> = {
    "/": "Home",
    "/contact": "Contact",
    "/primary-care": "Primary Care - Overview",
    "/palliative-care": "Palliative Care - Overview",
    "/primary-care/checkups-prevention": "Primary Care - Checkups & Prevention",
    "/primary-care/chronic-disease": "Primary Care - Chronic Disease",
    "/primary-care/same-day-visits": "Primary Care - Same-Day Visits",
    "/primary-care/womens-health": "Primary Care - Women's Health",
    "/primary-care/senior-care": "Primary Care - Senior Care",
    "/primary-care/procedures-diagnostics": "Primary Care - Procedures & Diagnostics",
    "/palliative-care/about-palliative-care": "Palliative Care - About",
    "/palliative-care/symptom-relief": "Palliative Care - Symptom Relief",
    "/palliative-care/patient-family-support": "Palliative Care - Patient & Family Support",
    "/palliative-care/planning-transitions": "Palliative Care - Planning & Transitions",
    "/locations/naples": "Location - Naples",
    "/locations/marco-island": "Location - Marco Island",
    "/locations/golden-gate": "Location - Golden Gate",
    "/locations/immokalee": "Location - Immokalee",
    "/locations/bonita-springs": "Location - Bonita Springs",
    "/locations/estero": "Location - Estero",
    "/locations/fort-myers": "Location - Fort Myers",
    "/locations/cape-coral": "Location - Cape Coral",
    "/about": "About Dr. Reve",
    "/reviews": "Patient Reviews",
    "/new-patients": "New Patients",
    "/medicare": "Medicare",
    "/es": "Spanish - Home",
    "/es/": "Spanish - Home",
    "/es/medico-de-familia-naples": "Spanish - Family Medicine",
    "/es/cuidados-paliativos-naples": "Spanish - Palliative Care",
    "/es/seguros-y-medicare": "Spanish - Insurance & Medicare",
    "/es/contacto": "Spanish - Contact",
  };
  return pageMap[sourcePage] || sourcePage;
}

function buildClientConfirmationHtml(data: ContactFormData): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>We received your message</title>
</head>
<body style="margin:0;padding:0;background-color:#f0f4f8;font-family:-apple-system,'Segoe UI','Helvetica Neue',Arial,sans-serif;-webkit-font-smoothing:antialiased;">
  <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background-color:#f0f4f8;padding:48px 16px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="max-width:560px;">

          <tr>
            <td align="center" style="padding-bottom:32px;">
              <a href="${getSiteUrl()}" style="text-decoration:none;">
                <img src="${getLogoUrl()}" alt="Faithful Care Medical Services" width="220" style="display:block;height:auto;border:0;" />
              </a>
            </td>
          </tr>

          <tr>
            <td>
              <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background-color:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.08);">

                <tr>
                  <td style="padding:48px 40px 0 40px;text-align:center;">
                    <table cellpadding="0" cellspacing="0" role="presentation" style="margin:0 auto 24px auto;">
                      <tr>
                        <td style="width:64px;height:64px;border-radius:50%;background-color:#e8f5e9;text-align:center;vertical-align:middle;font-size:28px;line-height:64px;">
                          &#10003;
                        </td>
                      </tr>
                    </table>
                    <h1 style="margin:0 0 8px;color:#1a3a6b;font-size:26px;font-weight:700;line-height:1.3;letter-spacing:-0.3px;">
                      Thank you, ${escapeHtml(data.name)}!
                    </h1>
                    <p style="margin:0 0 32px;color:#5f6b7a;font-size:16px;line-height:1.6;">
                      We received your message and a care coordinator<br>will reach out to you shortly.
                    </p>
                  </td>
                </tr>

                <tr>
                  <td style="padding:0 40px;">
                    <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background-color:#f8fafc;border-radius:12px;border:1px solid #e2e8f0;">
                      <tr>
                        <td style="padding:20px 24px 8px 24px;">
                          <p style="margin:0 0 12px;color:#94a3b8;font-size:11px;text-transform:uppercase;letter-spacing:1px;font-weight:700;">Your submission</p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:0 24px;">
                          <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                            <tr>
                              <td style="padding:10px 0;border-top:1px solid #e2e8f0;color:#64748b;font-size:13px;width:90px;vertical-align:top;">Name</td>
                              <td style="padding:10px 0;border-top:1px solid #e2e8f0;color:#1e293b;font-size:14px;font-weight:500;">${escapeHtml(data.name)}</td>
                            </tr>
                            <tr>
                              <td style="padding:10px 0;border-top:1px solid #e2e8f0;color:#64748b;font-size:13px;vertical-align:top;">Email</td>
                              <td style="padding:10px 0;border-top:1px solid #e2e8f0;color:#1e293b;font-size:14px;font-weight:500;">${escapeHtml(data.email)}</td>
                            </tr>
                            ${data.phone ? `<tr>
                              <td style="padding:10px 0;border-top:1px solid #e2e8f0;color:#64748b;font-size:13px;vertical-align:top;">Phone</td>
                              <td style="padding:10px 0;border-top:1px solid #e2e8f0;color:#1e293b;font-size:14px;font-weight:500;">${escapeHtml(data.phone)}</td>
                            </tr>` : ""}
                            ${data.service ? `<tr>
                              <td style="padding:10px 0;border-top:1px solid #e2e8f0;color:#64748b;font-size:13px;vertical-align:top;">Service</td>
                              <td style="padding:10px 0;border-top:1px solid #e2e8f0;color:#1e293b;font-size:14px;font-weight:500;">${escapeHtml(data.service)}</td>
                            </tr>` : ""}
                            ${data.message ? `<tr>
                              <td style="padding:10px 0;border-top:1px solid #e2e8f0;color:#64748b;font-size:13px;vertical-align:top;">Message</td>
                              <td style="padding:10px 0;border-top:1px solid #e2e8f0;color:#1e293b;font-size:14px;font-weight:500;line-height:1.5;">We received your note and the care team will see it. For your privacy, we don't repeat the message back here. Please call <a href="tel:+12394230205" style="color:#1a3a6b;text-decoration:none;font-weight:600;">(239) 423-0205</a> for anything urgent.</td>
                            </tr>` : ""}
                          </table>
                        </td>
                      </tr>
                      <tr><td style="height:16px;"></td></tr>
                    </table>
                  </td>
                </tr>

                <tr>
                  <td style="padding:32px 40px;text-align:center;">
                    <table cellpadding="0" cellspacing="0" role="presentation" style="margin:0 auto;">
                      <tr>
                        <td style="background-color:#1a3a6b;border-radius:10px;padding:16px 36px;">
                          <a href="${getSiteUrl()}" style="color:#ffffff;font-size:15px;font-weight:600;text-decoration:none;display:inline-block;letter-spacing:0.2px;">Visit Our Website</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <tr>
                  <td style="padding:0 40px 40px 40px;">
                    <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background-color:#f0f5ff;border-radius:10px;">
                      <tr>
                        <td style="padding:20px 24px;text-align:center;">
                          <p style="margin:0 0 4px;color:#64748b;font-size:14px;">Need immediate help? Call us directly:</p>
                          <a href="tel:+12394230205" style="color:#1a3a6b;font-size:20px;font-weight:700;text-decoration:none;letter-spacing:-0.3px;">(239) 423-0205</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

              </table>
            </td>
          </tr>

          <tr>
            <td style="padding:32px 16px;text-align:center;">
              <p style="margin:0 0 4px;color:#94a3b8;font-size:13px;font-weight:600;">Faithful Care Medical Services</p>
              <p style="margin:0 0 4px;color:#94a3b8;font-size:12px;line-height:1.5;">9955 Tamiami Trail N. Suite 2, Naples, FL 34108</p>
              <p style="margin:0 0 16px;color:#94a3b8;font-size:12px;">Mon-Fri 8:30 AM - 5:00 PM &middot; Sat 8:30 AM - 12:00 PM</p>
              <p style="margin:0;">
                <a href="${getSiteUrl()}" style="color:#64748b;font-size:12px;text-decoration:underline;">faithfulcaremedical.com</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function buildClinicNotificationHtml(data: ContactFormData): string {
  const pageLabel = getPageLabel(data.sourcePage);
  const timestamp = new Date().toLocaleString("en-US", {
    timeZone: "America/New_York",
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Contact Form Submission</title>
</head>
<body style="margin:0;padding:0;background-color:#f0f4f8;font-family:-apple-system,'Segoe UI','Helvetica Neue',Arial,sans-serif;-webkit-font-smoothing:antialiased;">
  <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background-color:#f0f4f8;padding:48px 16px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="max-width:560px;">

          <tr>
            <td align="center" style="padding-bottom:32px;">
              <img src="${getLogoUrl()}" alt="Faithful Care Medical Services" width="200" style="display:block;height:auto;border:0;" />
            </td>
          </tr>

          <tr>
            <td>
              <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background-color:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.08);">

                <tr>
                  <td style="background:linear-gradient(135deg,#1a3a6b 0%,#0d9488 100%);padding:28px 40px;">
                    <h1 style="margin:0 0 4px;color:#ffffff;font-size:20px;font-weight:700;">New Contact Form Submission</h1>
                    <p style="margin:0;color:rgba(255,255,255,0.8);font-size:13px;">${timestamp} (ET)</p>
                  </td>
                </tr>

                <tr>
                  <td style="padding:28px 40px 0 40px;">
                    <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background-color:#fefce8;border-radius:10px;border:1px solid #fde68a;">
                      <tr>
                        <td style="padding:14px 20px;">
                          <p style="margin:0;color:#92400e;font-size:14px;font-weight:600;">Source: ${escapeHtml(pageLabel)}</p>
                          <p style="margin:4px 0 0;color:#a16207;font-size:12px;">faithfulcaremedical.com${escapeHtml(data.sourcePage)}</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <tr>
                  <td style="padding:24px 40px 0 40px;">
                    <p style="margin:0 0 12px;color:#94a3b8;font-size:11px;text-transform:uppercase;letter-spacing:1px;font-weight:700;">Patient Details</p>
                    <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;">
                      <tr>
                        <td style="padding:14px 20px;color:#64748b;font-size:13px;width:100px;border-bottom:1px solid #f1f5f9;vertical-align:top;background-color:#f8fafc;">Name</td>
                        <td style="padding:14px 20px;color:#0f172a;font-size:14px;font-weight:600;border-bottom:1px solid #f1f5f9;">${escapeHtml(data.name)}</td>
                      </tr>
                      <tr>
                        <td style="padding:14px 20px;color:#64748b;font-size:13px;border-bottom:1px solid #f1f5f9;vertical-align:top;background-color:#f8fafc;">Email</td>
                        <td style="padding:14px 20px;border-bottom:1px solid #f1f5f9;">
                          <a href="mailto:${sanitizeForAttr(data.email)}" style="color:#1a3a6b;font-size:14px;font-weight:500;text-decoration:none;">${escapeHtml(data.email)}</a>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:14px 20px;color:#64748b;font-size:13px;border-bottom:1px solid #f1f5f9;vertical-align:top;background-color:#f8fafc;">Phone</td>
                        <td style="padding:14px 20px;border-bottom:1px solid #f1f5f9;">
                          ${data.phone
                            ? `<a href="tel:${sanitizeForAttr(data.phone)}" style="color:#1a3a6b;font-size:14px;font-weight:500;text-decoration:none;">${escapeHtml(data.phone)}</a>`
                            : `<span style="color:#cbd5e1;font-size:14px;">Not provided</span>`
                          }
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:14px 20px;color:#64748b;font-size:13px;border-bottom:1px solid #f1f5f9;vertical-align:top;background-color:#f8fafc;">Service</td>
                        <td style="padding:14px 20px;color:#0f172a;font-size:14px;font-weight:500;border-bottom:1px solid #f1f5f9;">
                          ${data.service ? escapeHtml(data.service) : `<span style="color:#cbd5e1;">Not selected</span>`}
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:14px 20px;color:#64748b;font-size:13px;vertical-align:top;background-color:#f8fafc;">Message</td>
                        <td style="padding:14px 20px;color:#0f172a;font-size:14px;line-height:1.6;">
                          ${data.message ? classifyMessageRisk(data.message).safeMessageHtml : `<span style="color:#cbd5e1;">No message</span>`}
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <tr>
                  <td style="padding:28px 40px 32px 40px;">
                    <table cellpadding="0" cellspacing="0" role="presentation">
                      <tr>
                        <td style="padding-right:12px;">
                          <table cellpadding="0" cellspacing="0" role="presentation">
                            <tr>
                              <td style="background-color:#1a3a6b;border-radius:8px;padding:12px 24px;">
                                <a href="mailto:${sanitizeForAttr(data.email)}" style="color:#ffffff;font-size:13px;font-weight:600;text-decoration:none;display:inline-block;">Reply to Patient</a>
                              </td>
                            </tr>
                          </table>
                        </td>
                        ${data.phone ? `<td>
                          <table cellpadding="0" cellspacing="0" role="presentation">
                            <tr>
                              <td style="border:2px solid #1a3a6b;border-radius:8px;padding:10px 24px;">
                                <a href="tel:${sanitizeForAttr(data.phone)}" style="color:#1a3a6b;font-size:13px;font-weight:600;text-decoration:none;display:inline-block;">Call Patient</a>
                              </td>
                            </tr>
                          </table>
                        </td>` : ""}
                      </tr>
                    </table>
                  </td>
                </tr>

              </table>
            </td>
          </tr>

          <tr>
            <td style="padding:24px 16px;text-align:center;">
              <p style="margin:0;color:#94a3b8;font-size:11px;">
                Automated notification from faithfulcaremedical.com
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function prepareClinicNotification(data: ContactFormData): {
  data: ContactFormData;
  pageLabel: string;
  subject: string;
  html: string;
} {
  const safeData = {
    ...data,
    sourcePage: normalizeExternalContactSourcePage(data.sourcePage),
  };
  const pageLabel = getPageLabel(safeData.sourcePage);
  return {
    data: safeData,
    pageLabel,
    subject: `New Contact: ${safeData.name} - ${pageLabel}`,
    html: buildClinicNotificationHtml(safeData),
  };
}

function classifyEmailError(message: string): string {
  if (/auth|api[_-]?key|unauthor/i.test(message)) return "auth";
  if (/rate|limit|throttle/i.test(message)) return "rate_limited";
  if (/timeout|timed out/i.test(message)) return "timeout";
  if (/network|fetch|connect/i.test(message)) return "network";
  if (/invalid|address|recipient/i.test(message)) return "invalid_recipient";
  return "unknown";
}

export async function sendContactFormEmails(
  data: ContactFormData,
  requestId: string = "no-id"
): Promise<{ success: boolean; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY ?? process.env.FCMS_RESEND_API;
  if (!apiKey) {
    console.error(`[email] request=${requestId} configuration=missing_api_key`);
    return { success: false, error: "missing_api_key" };
  }
  const resend = new Resend(apiKey);
  const notification = prepareClinicNotification(data);
  const { data: safeData, pageLabel } = notification;
  const risk = classifyMessageRisk(safeData.message);
  if (risk.risky) {
    console.log(
      `[email] request=${requestId} message_redacted reason=${risk.reason} source=${pageLabel}`
    );
  }
  try {
    const clinicResult = await resend.emails.send({
      from: FROM_EMAIL,
      to: [CLINIC_EMAIL],
      subject: notification.subject,
      replyTo: safeData.email,
      html: notification.html,
    });

    if (clinicResult.error) {
      console.error(
        `[email] request=${requestId} clinic_send=failed source=${pageLabel} cause=${classifyEmailError(clinicResult.error.message)}`
      );
      return { success: false, error: "clinic_send_failed" };
    }

    const clientResult = await resend.emails.send({
      from: FROM_EMAIL,
      to: [safeData.email],
      subject: "We received your message - Faithful Care Medical Services",
      html: buildClientConfirmationHtml(safeData),
    });

    if (clientResult.error) {
      console.warn(
        `[email] request=${requestId} client_confirm=failed cause=${classifyEmailError(clientResult.error.message)} (clinic notified)`
      );
    }

    console.log(
      `[email] request=${requestId} sent clinic_id=${clinicResult.data?.id ?? "?"} client_id=${clientResult.data?.id ?? "skipped"} source=${pageLabel}`
    );
    return { success: true };
  } catch (err) {
    const errorMsg = err instanceof Error ? err.message : "unknown";
    console.error(
      `[email] request=${requestId} exception cause=${classifyEmailError(errorMsg)}`
    );
    return { success: false, error: "send_exception" };
  }
}
