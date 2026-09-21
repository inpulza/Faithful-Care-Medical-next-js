BEGIN;
CREATE TABLE IF NOT EXISTS fc_blog_media (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), post_id uuid NOT NULL REFERENCES fc_blog_posts(id),
 url text NOT NULL UNIQUE, role text NOT NULL CHECK(role IN ('hero','inline')), alt text NOT NULL,
 placement integer NOT NULL DEFAULT 1 CHECK(placement BETWEEN 1 AND 30),
 source text NOT NULL CHECK(source IN ('upload','ai')), reviewed boolean NOT NULL DEFAULT false,
 model text, prompt text, created_at timestamptz NOT NULL DEFAULT now()
);
COMMIT;
