export function serializeJsonLd(data: Record<string, unknown>): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function JsonLd({ data }: { data: Record<string, unknown> | null }) {
  if (!data) return null;
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
    />
  );
}

export function JsonLdArray({ schemas }: { schemas: (Record<string, unknown> | null)[] }) {
  return (
    <>
      {schemas.map((schema, i) =>
        schema ? <JsonLd key={i} data={schema} /> : null
      )}
    </>
  );
}
