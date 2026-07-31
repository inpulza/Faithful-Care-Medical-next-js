import assert from "node:assert/strict";
import { test } from "node:test";

const baseUrl = process.env.BASE_URL || "http://127.0.0.1:3100";

test("contact API rejects invalid submissions before sending email", async () => {
  const response = await fetch(`${baseUrl}/api/contact`, {
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
  const response = await fetch(`${baseUrl}/api/contact`, {
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
