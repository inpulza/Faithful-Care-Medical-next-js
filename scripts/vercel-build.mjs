import {spawnSync} from 'node:child_process';
// Explicit launch-only flag; normal production builds do not run migrations.
if(process.env.VERCEL_ENV==='production' && process.env.BLOG_BOOTSTRAP_SCHEMA==='faithful-care-initial-schema-20260922'){
 if(!process.env.DATABASE_URL)throw Error('Production database required for schema initialization.');
 const migration=spawnSync(process.execPath,['scripts/blog-migrate.mjs'],{stdio:'inherit',env:process.env});
 if(migration.status!==0)process.exit(migration.status||1);
}
const build=spawnSync(process.execPath,['node_modules/next/dist/bin/next','build'],{stdio:'inherit',env:process.env});
process.exit(build.status===null?1:build.status);
