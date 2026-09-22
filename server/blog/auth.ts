import { randomBytes, scryptSync, timingSafeEqual, createHash } from "node:crypto";
import { query } from "./db";
import { BlogError } from "./types";
export const COOKIE = "fc_editorial_session";
export const TTL = 8 * 60 * 60;
const digest = (value: string) => createHash("sha256").update(value).digest("hex");
function equal(a: string, b: string) { const x=Buffer.from(a),y=Buffer.from(b); return x.length===y.length && timingSafeEqual(x,y); }
function authConfig() {
  const username=process.env.BLOG_ADMIN_USERNAME?.trim();
  const hash=process.env.BLOG_ADMIN_PASSWORD_HASH?.trim();
  const secret=process.env.BLOG_ADMIN_SESSION_SECRET;
  if (!username || !hash || !/^scrypt:[a-f0-9]{32}:[a-f0-9]{64}$/.test(hash) || !secret || secret.length<32)
    throw new BlogError(503,"Editorial access is not configured.");
  return {username,hash,version:digest(username+":"+hash+":"+secret)};
}
export function passwordHash(password:string) {
  const salt=randomBytes(16).toString("hex");
  return "scrypt:"+salt+":"+scryptSync(password,salt,32).toString("hex");
}
export function assertOrigin(request:Request) {
  const origin=request.headers.get("origin");
  const target=new URL(request.url);
  const expected=target.protocol+"//"+(request.headers.get("host")||target.host);
  if (!origin || origin!==expected) throw new BlogError(403,"Same-origin request required.");
}
export async function consumeLimit(key:string,maximum:number,seconds:number) {
  const rows=await query<{attempts:number}>(`INSERT INTO fc_blog_limits(key,attempts,expires_at)
    VALUES($1,1,now()+($2 * interval '1 second'))
    ON CONFLICT(key) DO UPDATE SET
    attempts=CASE WHEN fc_blog_limits.expires_at<=now() THEN 1 ELSE fc_blog_limits.attempts+1 END,
    expires_at=CASE WHEN fc_blog_limits.expires_at<=now() THEN now()+($2 * interval '1 second') ELSE fc_blog_limits.expires_at END
    RETURNING attempts`,[digest(key),seconds]);
  if(rows[0].attempts>maximum) throw new BlogError(429,"Too many attempts. Try again later.");
}
export async function login(username:string,password:string,ip:string) {
  const c=authConfig();
  await consumeLimit("login-ip:"+ip,10,900);
  await consumeLimit("login-account:"+c.username,30,900);
  const [,salt,key]=c.hash.split(":");
  const candidate=scryptSync(password,salt,32).toString("hex");
  if(!equal(c.username,username)||!equal(key,candidate)) throw new BlogError(401,"Incorrect username or password.");
  const token=randomBytes(32).toString("base64url");
  await query("INSERT INTO fc_blog_sessions(token_hash,username,expires_at,credential_version) VALUES($1,$2,now()+($3 * interval '1 second'),$4)",[digest(token),c.username,TTL,c.version]);
  return token;
}
export async function session(token:string|undefined) {
  if(!token || !/^[A-Za-z0-9_-]{43}$/.test(token)) return null;
  const c=authConfig();
  const rows=await query<{username:string}>("SELECT username FROM fc_blog_sessions WHERE token_hash=$1 AND expires_at>now() AND credential_version=$2",[digest(token),c.version]);
  return rows[0]||null;
}
export async function logout(token:string|undefined) {
  if(token) await query("DELETE FROM fc_blog_sessions WHERE token_hash=$1",[digest(token)]);
}
export const cookieOptions={httpOnly:true,secure:process.env.NODE_ENV==="production",sameSite:"strict" as const,path:"/",maxAge:TTL};
