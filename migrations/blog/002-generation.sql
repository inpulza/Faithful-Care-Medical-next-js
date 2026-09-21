BEGIN;
ALTER TABLE fc_blog_jobs ADD COLUMN IF NOT EXISTS request_key uuid;
ALTER TABLE fc_blog_jobs ADD COLUMN IF NOT EXISTS stage text NOT NULL DEFAULT 'preflight';
CREATE UNIQUE INDEX IF NOT EXISTS fc_blog_jobs_request_key ON fc_blog_jobs(request_key);
COMMIT;
