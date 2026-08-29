import assert from "node:assert/strict";
import { test } from "node:test";
import { previewFetch } from "./preview-access.mjs";

const { prepareClinicNotification } = await import(
  new URL("../app/lib/contact-email.ts", import.meta.url).href
);

test("contact API rejects invalid submissions before sending email", async () => {
  const response = await previewFetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: "Test Patient",
      email: "not-an-email",
      phone: "",
      service: "Schedule a visit",
      message: "",
      sourcePage: "/contact",
    }),
  });
  const payload = await response.json();

  assert.equal(response.status, 400);
  assert.equal(payload.success, false);
  assert.match(payload.error, /email/i);
});

test("contact API rejects unrecognized source pages", async () => {
  const response = await previewFetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: "Test Patient",
      email: "test@example.com",
      sourcePage: "/untrusted-page",
    }),
  });
  const payload = await response.json();

  assert.equal(response.status, 400);
  assert.equal(payload.success, false);
  assert.match(payload.error, /source page/i);
});

test("external contact email removes condition-level source details", () => {
  const notification = prepareClinicNotification({
    name: "Privacy Test",
    email: "privacy@example.com",
    phone: "",
    service: "Schedule a visit",
    message: "",
    sourcePage: "/palliative-care/for-cancer",
  });
  const externalPayload = `${notification.subject}\n${notification.html}\n${notification.pageLabel}`;

  assert.equal(notification.data.sourcePage, "/palliative-care");
  assert.doesNotMatch(externalPayload, /for-cancer/i);
  assert.doesNotMatch(externalPayload, /faithfulcaremedical\.com\/palliative-care\/for-cancer/i);

  const primaryNotification = prepareClinicNotification({
    ...notification.data,
    sourcePage: "/primary-care/memory-screening",
  });
  const primaryPayload = `${primaryNotification.subject}\n${primaryNotification.html}\n${primaryNotification.pageLabel}`;
  assert.equal(primaryNotification.data.sourcePage, "/primary-care");
  assert.doesNotMatch(primaryPayload, /memory-screening/i);
});
