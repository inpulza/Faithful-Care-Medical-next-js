import assert from "node:assert/strict";
import test from "node:test";
import { hardenPostgresSslMode } from "../shared/postgres-url.mjs";

test("makes Neon-style sslmode=require explicit and certificate-verifying", () => {
  assert.equal(
    hardenPostgresSslMode("postgresql://user:pass@example.neon.tech/db?sslmode=require&channel_binding=require"),
    "postgresql://user:pass@example.neon.tech/db?sslmode=verify-full&channel_binding=require",
  );
});

test("hardens every pg mode whose meaning changes in the next major release", () => {
  for (const mode of ["prefer", "require", "verify-ca"]) {
    assert.equal(
      hardenPostgresSslMode(`postgresql://example/db?application_name=fc&sslmode=${mode}`),
      "postgresql://example/db?application_name=fc&sslmode=verify-full",
    );
  }
});

test("preserves explicit secure and local connection strings", () => {
  assert.equal(
    hardenPostgresSslMode("postgresql://example/db?sslmode=verify-full"),
    "postgresql://example/db?sslmode=verify-full",
  );
  assert.equal(hardenPostgresSslMode("postgresql://localhost/db"), "postgresql://localhost/db");
});

test("hardens duplicate parameters and values followed by a URL fragment", () => {
  assert.equal(
    hardenPostgresSslMode("postgresql://example/db?sslmode=require&sslmode=prefer#client"),
    "postgresql://example/db?sslmode=verify-full&sslmode=verify-full#client",
  );
});

test("decodes SSL mode keys and values before hardening without rewriting the URL", () => {
  assert.equal(
    hardenPostgresSslMode("postgresql://user:p%40ss@example/db?%73slmode=%72equire&application_name=Faithful+Care#client"),
    "postgresql://user:p%40ss@example/db?%73slmode=verify-full&application_name=Faithful+Care#client",
  );
});
