import {createHash} from "node:crypto";
import {query} from "./db";
import {consumeLimit} from "./auth";
import {BlogError} from "./types";

const digest=(value:string)=>createHash("sha256").update(value).digest("hex");
const budgetKey=digest("image-generation-global");
const reservationKey=(key:string)=>digest("image-reservation:"+key);

// Reserve the complete run before spending on its text. Manual images share this
// same bucket. Reservations are conservative: cancellation never refunds spend.
export async function reserveImageBudget(keys:string[]){
 if(keys.length!==3||new Set(keys).size!==3)throw new BlogError(400,"A complete unique image plan is required.");
 const rows=await query(`WITH admitted AS (
  INSERT INTO fc_blog_limits(key,attempts,expires_at) VALUES($1,3,now()+interval '1 hour')
  ON CONFLICT(key) DO UPDATE SET
   attempts=CASE WHEN fc_blog_limits.expires_at<=now() THEN 3 ELSE fc_blog_limits.attempts+3 END,
   expires_at=CASE WHEN fc_blog_limits.expires_at<=now() THEN now()+interval '1 hour' ELSE fc_blog_limits.expires_at END
  WHERE fc_blog_limits.expires_at<=now() OR fc_blog_limits.attempts+3<=3
  RETURNING key
 ), reserved AS (
  INSERT INTO fc_blog_limits(key,attempts,expires_at)
  SELECT reservation,0,now()+interval '24 hours' FROM unnest($2::text[]) AS reservation
  WHERE EXISTS(SELECT 1 FROM admitted) RETURNING key
 ) SELECT key FROM reserved`,[budgetKey,keys.map(reservationKey)]);
 if(rows.length!==3)throw new BlogError(429,"Auto Generate needs three available image credits. The hourly image limit is already in use. Try again after it resets; no AI requests were sent.");
}

export async function consumeImageBudget(key:string){
 const reservation=reservationKey(key);
 const claimed=await query("UPDATE fc_blog_limits SET attempts=1 WHERE key=$1 AND attempts=0 AND expires_at>now() RETURNING key",[reservation]);
 if(claimed.length)return;
 const existing=await query("SELECT key FROM fc_blog_limits WHERE key=$1",[reservation]);
 if(existing.length)throw new BlogError(409,"The image reservation was already used or expired. Inspect the operation history before starting again.");
 await consumeLimit("image-generation-global",3,3600);
}
