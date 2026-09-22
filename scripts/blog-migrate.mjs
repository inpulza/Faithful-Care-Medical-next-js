import fs from "node:fs/promises";
import { Pool } from "pg";
if(!process.env.DATABASE_URL) throw new Error("Set the isolated Faithful Care DATABASE_URL.");
const pool=new Pool({connectionString:process.env.DATABASE_URL,max:1});
try {for(const name of (await fs.readdir(new URL("../migrations/blog/",import.meta.url))).filter(n=>n.endsWith(".sql")).sort()) await pool.query(await fs.readFile(new URL("../migrations/blog/"+name,import.meta.url),"utf8"));console.log("Faithful Care blog schema ready.");}finally{await pool.end();}
