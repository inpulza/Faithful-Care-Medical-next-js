import {BLOG_AUTHOR} from "../../shared/blog-author";
export type Language = "en" | "es";
export type Status = "draft" | "pending_review" | "published" | "rejected";
export interface EditorialData {
  excerpt: string; metaTitle: string; metaDescription: string; category: "prevention" | "primary-care" | "chronic-care" | "senior-care" | "palliative-care" | "family-support"; tags: string[];
  author: string; reviewer: string; reviewConfirmed: boolean;
  hero: string; heroAlt: string;
  images: { url: string; alt: string; afterHeading: number }[];
  sources: string[]; topic: string; disclaimer: string;
}
export interface Post {
  id: string; language: Language; translation_group: string; title: string; slug: string;
  content: string; status: Status; data: EditorialData; version: number;
  created_at: string; updated_at: string; published_at: string | null;
}
export class BlogError extends Error {
  constructor(public status: number, message: string) { super(message); }
}
export const blankData: EditorialData = {
  excerpt: "", metaTitle: "", metaDescription: "", category: "prevention", tags: [],
  author: BLOG_AUTHOR.name, reviewer: "", reviewConfirmed: false,
  hero: "", heroAlt: "", images: [], sources: [], topic: "", disclaimer: "",
};
