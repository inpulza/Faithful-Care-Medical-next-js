const AMBIGUOUS_SSL_MODES = /([?&]sslmode=)(prefer|require|verify-ca)(?=&|#|$)/gi;

/**
 * Preserve node-postgres' current certificate-verifying behavior explicitly.
 *
 * pg currently treats prefer, require, and verify-ca as verify-full, but its
 * next major release will adopt the weaker libpq meanings for those values.
 */
export function hardenPostgresSslMode(connectionString) {
  return connectionString.replace(AMBIGUOUS_SSL_MODES, "$1verify-full");
}
