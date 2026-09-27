const AMBIGUOUS_SSL_MODES = new Set(["prefer", "require", "verify-ca"]);

function decodeQueryComponent(value) {
  try {
    return decodeURIComponent(value.replace(/\+/g, " "));
  } catch {
    return value;
  }
}

/**
 * Preserve node-postgres' current certificate-verifying behavior explicitly.
 *
 * pg currently treats prefer, require, and verify-ca as verify-full, but its
 * next major release will adopt the weaker libpq meanings for those values.
 */
export function hardenPostgresSslMode(connectionString) {
  const fragmentIndex = connectionString.indexOf("#");
  const fragment = fragmentIndex === -1 ? "" : connectionString.slice(fragmentIndex);
  const withoutFragment = fragmentIndex === -1 ? connectionString : connectionString.slice(0, fragmentIndex);
  const queryIndex = withoutFragment.indexOf("?");
  if (queryIndex === -1) return connectionString;

  const prefix = withoutFragment.slice(0, queryIndex + 1);
  const query = withoutFragment.slice(queryIndex + 1);
  const hardenedQuery = query.split("&").map((parameter) => {
    const equalsIndex = parameter.indexOf("=");
    if (equalsIndex === -1) return parameter;
    const key = parameter.slice(0, equalsIndex);
    const value = parameter.slice(equalsIndex + 1);
    if (decodeQueryComponent(key).toLowerCase() !== "sslmode") return parameter;
    if (!AMBIGUOUS_SSL_MODES.has(decodeQueryComponent(value).toLowerCase())) return parameter;
    return `${key}=verify-full`;
  }).join("&");

  return `${prefix}${hardenedQuery}${fragment}`;
}
