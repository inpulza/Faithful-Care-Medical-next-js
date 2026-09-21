BEGIN;
CREATE TABLE IF NOT EXISTS fc_blog_source_cache (
 url text PRIMARY KEY REFERENCES fc_blog_links(url),
 excerpt text NOT NULL CHECK(length(excerpt)<=18000),
 fetched_at timestamptz NOT NULL DEFAULT now(),
 expires_at timestamptz NOT NULL DEFAULT now()+interval '24 hours'
);
COMMIT;
