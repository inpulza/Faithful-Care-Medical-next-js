import fs from "node:fs/promises";
import { Pool } from "pg";
if(!process.env.DATABASE_URL) throw new Error("Set the isolated Faithful Care DATABASE_URL.");
const pool=new Pool({connectionString:process.env.DATABASE_URL,max:1});
try {await pool.query(await fs.readFile(new URL("../migrations/blog/001-foundation.sql",import.meta.url),"utf8"));console.log("Faithful Care blog schema ready.");}finally{await pool.end();}
