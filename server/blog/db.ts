import { Pool } from "pg";
import { BlogError } from "./types";
type Result<T> = { rows: T[]; rowCount?: number | null; affectedRows?: number };
export interface Database { query<T = Record<string, unknown>>(sql: string, params?: unknown[]): Promise<Result<T>>; }
const globalDb = globalThis as unknown as { fcBlogPool?: Pool; fcBlogTest?: Database; fcBlogLocal?: Promise<Database> };
export function setTestDatabase(db?: Database) {
  if (process.env.NODE_ENV !== "test") throw new Error("Test database only");
  globalDb.fcBlogTest = db;
}
export function configured() { return Boolean(process.env.DATABASE_URL || globalDb.fcBlogTest || (process.env.NODE_ENV==="development" && !process.env.VERCEL && process.env.BLOG_LOCAL_TEST_DB)); }
export function database(): Database {
  if (process.env.NODE_ENV === "test" && globalDb.fcBlogTest) return globalDb.fcBlogTest;
  if (process.env.NODE_ENV==="development" && !process.env.VERCEL && process.env.BLOG_LOCAL_TEST_DB) { return { async query<T>(sql:string,params?:unknown[]) { globalDb.fcBlogLocal ??= import("@electric-sql/pglite").then(({PGlite})=>new PGlite(process.env.BLOG_LOCAL_TEST_DB!) as unknown as Database); return (await globalDb.fcBlogLocal).query<T>(sql,params); } }; }
  if (!process.env.DATABASE_URL) throw new BlogError(503, "The blog database is not configured.");
  globalDb.fcBlogPool ??= new Pool({ connectionString: process.env.DATABASE_URL, max: 3, connectionTimeoutMillis: 10000, idleTimeoutMillis: 10000 });
  return globalDb.fcBlogPool as Database;
}
export async function query<T = Record<string, unknown>>(sql: string, params: unknown[] = []) {
  return (await database().query<T>(sql, params)).rows;
}
