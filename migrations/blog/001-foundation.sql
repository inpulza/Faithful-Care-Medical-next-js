BEGIN;
CREATE TABLE IF NOT EXISTS fc_blog_posts (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 language text NOT NULL CHECK(language IN ('en','es')),
 translation_group uuid NOT NULL DEFAULT gen_random_uuid(),
 title text NOT NULL, slug text NOT NULL CHECK(slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
 content text NOT NULL DEFAULT '', status text NOT NULL DEFAULT 'draft'
 CHECK(status IN ('draft','pending_review','published','rejected')),
 data jsonb NOT NULL DEFAULT '{}', version integer NOT NULL DEFAULT 1,
 created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now(),
 published_at timestamptz,
 UNIQUE(language,slug), UNIQUE(translation_group,language),
 CHECK ((status = 'published') = (published_at IS NOT NULL))
);
CREATE INDEX IF NOT EXISTS fc_blog_public ON fc_blog_posts(language,published_at DESC) WHERE status='published';
CREATE TABLE IF NOT EXISTS fc_blog_sessions (
 token_hash text PRIMARY KEY, username text NOT NULL, expires_at timestamptz NOT NULL,
 credential_version text NOT NULL, created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS fc_blog_limits (
 key text PRIMARY KEY, attempts integer NOT NULL, expires_at timestamptz NOT NULL
);
CREATE TABLE IF NOT EXISTS fc_blog_events (
 id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY, post_id uuid REFERENCES fc_blog_posts(id),
 action text NOT NULL, actor text NOT NULL, detail jsonb NOT NULL DEFAULT '{}', created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS fc_blog_links (
 url text PRIMARY KEY, kind text NOT NULL CHECK(kind IN ('internal','external')),
 publisher text NOT NULL, score integer NOT NULL CHECK(score BETWEEN 0 AND 100),
 reason text NOT NULL, approved boolean NOT NULL DEFAULT false,
 health text NOT NULL DEFAULT 'unchecked', http_status integer, checked_at timestamptz
);
CREATE TABLE IF NOT EXISTS fc_blog_jobs (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), post_id uuid REFERENCES fc_blog_posts(id),
 kind text NOT NULL, status text NOT NULL CHECK(status IN ('running','completed','failed')),
 detail jsonb NOT NULL DEFAULT '{}', created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now()
);
COMMIT;
