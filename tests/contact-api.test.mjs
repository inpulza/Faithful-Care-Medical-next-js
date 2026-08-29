import assert from "node:assert/strict";
import { test } from "node:test";
import { previewFetch } from "./preview-access.mjs";

const { prepareClinicNotification } = await import(
  new URL("../app/lib/contact-email.ts", import.meta.url).href
);
const { CONDITION_ROUTE_PATHS } = await import(
  new URL("../shared/condition-route-paths.ts", import.meta.url).href
);
const { CONDITION_TRACKING_PATH_ALIASES } = await import(
  new URL("../shared/tracking-route-privacy.ts", import.meta.url).href
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

test("external contact email removes details from exactly the sixteen condition guides", () => {
  for (const sourcePage of CONDITION_ROUTE_PATHS) {
    const notification = prepareClinicNotification({
      name: "Privacy Test",
      email: "privacy@example.com",
      phone: "",
      service: "Schedule a visit",
      message: "",
      sourcePage,
    });
    const externalPayload = `${notification.subject}\n${notification.html}\n${notification.pageLabel}`;
    const escapedSource = sourcePage.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    assert.equal(notification.data.sourcePage, CONDITION_TRACKING_PATH_ALIASES[sourcePage]);
    assert.doesNotMatch(externalPayload, new RegExp(escapedSource, "i"));
  }
});

test("external contact email preserves established service and Spanish source pages", () => {
  const establishedSources = [
    ["/primary-care/checkups-prevention", "Primary Care - Checkups & Prevention"],
    ["/primary-care/chronic-disease", "Primary Care - Chronic Disease"],
    ["/primary-care/same-day-visits", "Primary Care - Same-Day Visits"],
    ["/primary-care/womens-health", "Primary Care - Women's Health"],
    ["/primary-care/senior-care", "Primary Care - Senior Care"],
    ["/primary-care/procedures-diagnostics", "Primary Care - Procedures & Diagnostics"],
    ["/palliative-care/about-palliative-care", "Palliative Care - About"],
    ["/palliative-care/symptom-relief", "Palliative Care - Symptom Relief"],
    ["/palliative-care/patient-family-support", "Palliative Care - Patient & Family Support"],
    ["/palliative-care/planning-transitions", "Palliative Care - Planning & Transitions"],
    ["/es/medico-de-familia-naples", "Spanish - Family Medicine"],
    ["/es/cuidados-paliativos-naples", "Spanish - Palliative Care"],
  ];

  for (const [sourcePage, expectedLabel] of establishedSources) {
    const notification = prepareClinicNotification({
      name: "Source Test",
      email: "source@example.com",
      phone: "",
      service: "Schedule a visit",
      message: "",
      sourcePage,
    });

    assert.equal(notification.data.sourcePage, sourcePage);
    assert.equal(notification.pageLabel, expectedLabel);
    assert.match(notification.html, new RegExp(`faithfulcaremedical\\.com${sourcePage}`));
  }
});
