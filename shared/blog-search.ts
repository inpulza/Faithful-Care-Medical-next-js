/** Compare editorial search text consistently across languages and pasted queries. */
export function normalizeSearch(value: string): string {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim().replace(/\s+/g, " ").toLowerCase();
}

export function matchesSearch(values: unknown[], search: string): boolean {
  return normalizeSearch(values.filter((value): value is string => typeof value === "string").join(" ")).includes(normalizeSearch(search));
}
