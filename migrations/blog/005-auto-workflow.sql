BEGIN;
CREATE TABLE IF NOT EXISTS fc_blog_auto_runs (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 request_key uuid NOT NULL UNIQUE,
 actor text NOT NULL,
 language text NOT NULL CHECK(language IN ('en','es')),
 focus text NOT NULL DEFAULT '',
 translate boolean NOT NULL DEFAULT true,
 status text NOT NULL DEFAULT 'running' CHECK(status IN ('running','completed','failed','cancelled')),
 cursor integer NOT NULL DEFAULT 0,
 state jsonb NOT NULL DEFAULT '{}',
 steps jsonb NOT NULL,
 post_id uuid REFERENCES fc_blog_posts(id),
 translation_id uuid REFERENCES fc_blog_posts(id),
 lease_token uuid,
 lease_until timestamptz,
 error text,
 created_at timestamptz NOT NULL DEFAULT now(),
 updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE UNIQUE INDEX IF NOT EXISTS fc_blog_one_auto_run ON fc_blog_auto_runs((1)) WHERE status='running';
COMMIT;
