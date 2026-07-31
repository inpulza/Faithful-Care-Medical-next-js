export function JsonLd({ data }: { data: Record<string, unknown> | null }) {
  if (!data) return null;
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
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
