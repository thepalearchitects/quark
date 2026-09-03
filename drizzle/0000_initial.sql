CREATE TABLE IF NOT EXISTS "users" (
  "id" text PRIMARY KEY,
  "clerk_id" text UNIQUE,
  "email" text NOT NULL UNIQUE,
  "username" text NOT NULL UNIQUE,
  "display_name" text,
  "avatar_url" text,
  "plan" text NOT NULL DEFAULT 'free',
  "published_count" integer NOT NULL DEFAULT 0,
  "max_published" integer NOT NULL DEFAULT 3,
  "email_verified" boolean NOT NULL DEFAULT false,
  "role" text NOT NULL DEFAULT 'user',
  "suspended" boolean NOT NULL DEFAULT false,
  "bio" text,
  "created_at" timestamp with time zone NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "projects" (
  "id" text PRIMARY KEY,
  "name" text NOT NULL,
  "description" text,
  "owner_id" text NOT NULL REFERENCES "users"("id") ON DELETE cascade,
  "files" jsonb NOT NULL DEFAULT '[]',
  "dependencies" jsonb NOT NULL DEFAULT '{}',
  "visibility" text NOT NULL DEFAULT 'private',
  "tags" text[] NOT NULL DEFAULT '{}',
  "forks_count" integer NOT NULL DEFAULT 0,
  "views_count" integer NOT NULL DEFAULT 0,
  "created_at" timestamp with time zone NOT NULL DEFAULT now(),
  "updated_at" timestamp with time zone NOT NULL DEFAULT now(),
  "published_at" timestamp with time zone
);

CREATE TABLE IF NOT EXISTS "comments" (
  "id" text PRIMARY KEY,
  "project_id" text NOT NULL REFERENCES "projects"("id") ON DELETE cascade,
  "user_id" text NOT NULL REFERENCES "users"("id") ON DELETE cascade,
  "content" text NOT NULL,
  "created_at" timestamp with time zone NOT NULL DEFAULT now(),
  "updated_at" timestamp with time zone NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "reports" (
  "id" text PRIMARY KEY,
  "project_id" text NOT NULL REFERENCES "projects"("id") ON DELETE cascade,
  "reporter_id" text NOT NULL REFERENCES "users"("id") ON DELETE cascade,
  "reason" text NOT NULL,
  "status" text NOT NULL DEFAULT 'pending',
  "created_at" timestamp with time zone NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "notifications" (
  "id" text PRIMARY KEY,
  "user_id" text NOT NULL REFERENCES "users"("id") ON DELETE cascade,
  "type" text NOT NULL,
  "message" text NOT NULL,
  "read" boolean NOT NULL DEFAULT false,
  "link" text,
  "created_at" timestamp with time zone NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "admin_settings" (
  "key" text PRIMARY KEY,
  "value" text NOT NULL,
  "updated_at" timestamp with time zone NOT NULL DEFAULT now()
);
