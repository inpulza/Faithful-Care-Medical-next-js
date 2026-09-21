BEGIN;
CREATE UNIQUE INDEX IF NOT EXISTS fc_blog_unique_topic_language
ON fc_blog_posts(language,(data->>'topic')) WHERE COALESCE(data->>'topic','')<>'';
CREATE UNIQUE INDEX IF NOT EXISTS fc_blog_one_running_topic
ON fc_blog_jobs((detail->>'topicId'),(detail->>'language')) WHERE kind='generate' AND status='running';
COMMIT;
