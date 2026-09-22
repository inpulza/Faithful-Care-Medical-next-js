/** Identity and portrait verified against client/src/pages/about.tsx. */
export const BLOG_AUTHOR = {
  name: "Dr. Addys Reve, MD",
  image: "/images/dr-addys-reve.webp",
  biography: "/about",
} as const;

export function verifiedBlogAuthor(name: string) {
  return name.trim() === BLOG_AUTHOR.name ? BLOG_AUTHOR : null;
}

export function blogAuthorSchema(name: string, domain: string) {
  const author = verifiedBlogAuthor(name);
  if (author) return {"@type": "Person", name: author.name, url: domain + author.biography, image: domain + author.image};
  if (name.trim() === "Faithful Care Medical Services") return {"@type": "Organization", name: name.trim(), url: domain};
  return undefined;
}
