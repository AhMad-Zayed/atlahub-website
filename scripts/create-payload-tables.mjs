import pg from 'pg';
const { Client } = pg;

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

async function main() {
  await client.connect();
  console.log('Connected to Neon database.');

  // Step 1: Add missing columns to existing users table
  const alterUsers = `
    ALTER TABLE "users" 
      ADD COLUMN IF NOT EXISTS "name" varchar,
      ADD COLUMN IF NOT EXISTS "email" varchar,
      ADD COLUMN IF NOT EXISTS "updated_at" timestamp(3) with time zone DEFAULT now(),
      ADD COLUMN IF NOT EXISTS "created_at" timestamp(3) with time zone DEFAULT now(),
      ADD COLUMN IF NOT EXISTS "reset_password_token" varchar,
      ADD COLUMN IF NOT EXISTS "reset_password_expiration" timestamp(3) with time zone,
      ADD COLUMN IF NOT EXISTS "salt" varchar,
      ADD COLUMN IF NOT EXISTS "hash" varchar,
      ADD COLUMN IF NOT EXISTS "login_attempts" numeric DEFAULT 0,
      ADD COLUMN IF NOT EXISTS "lock_until" timestamp(3) with time zone;
  `;
  await client.query(alterUsers);
  console.log('✅ users table updated with Payload columns');

  // Step 2: Create users_sessions table
  const createSessions = `
    CREATE TABLE IF NOT EXISTS "users_sessions" (
      "id" serial PRIMARY KEY,
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "expires_at" timestamp(3) with time zone
    );
    CREATE INDEX IF NOT EXISTS "users_sessions_order_idx" ON "users_sessions" ("_order");
    CREATE INDEX IF NOT EXISTS "users_sessions_parent_id_idx" ON "users_sessions" ("_parent_id");
  `;
  await client.query(createSessions);
  console.log('✅ users_sessions table created');

  // Step 3: Create _payload_migrations table
  const createMigrations = `
    CREATE TABLE IF NOT EXISTS "_payload_migrations" (
      "id" serial PRIMARY KEY,
      "name" varchar,
      "batch" numeric,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );
  `;
  await client.query(createMigrations);
  console.log('✅ _payload_migrations table created');

  // Step 4: Create _payload_preferences table
  const createPreferences = `
    CREATE TABLE IF NOT EXISTS "_payload_preferences" (
      "id" serial PRIMARY KEY,
      "key" varchar,
      "value" jsonb,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );
    CREATE INDEX IF NOT EXISTS "_payload_preferences_key_idx" ON "_payload_preferences" ("key");
    CREATE INDEX IF NOT EXISTS "_payload_preferences_updated_at_idx" ON "_payload_preferences" ("updated_at");
    CREATE INDEX IF NOT EXISTS "_payload_preferences_created_at_idx" ON "_payload_preferences" ("created_at");
  `;
  await client.query(createPreferences);
  console.log('✅ _payload_preferences table created');

  // Step 5: Create _payload_preferences_rels table
  const createPreferencesRels = `
    CREATE TABLE IF NOT EXISTS "_payload_preferences_rels" (
      "id" serial PRIMARY KEY,
      "order" integer,
      "parent_id" integer NOT NULL REFERENCES "_payload_preferences"("id") ON DELETE CASCADE,
      "path" varchar NOT NULL,
      "users_id" integer
    );
    CREATE INDEX IF NOT EXISTS "_payload_preferences_rels_order_idx" ON "_payload_preferences_rels" ("order");
    CREATE INDEX IF NOT EXISTS "_payload_preferences_rels_parent_fk_idx" ON "_payload_preferences_rels" ("parent_id");
    CREATE INDEX IF NOT EXISTS "_payload_preferences_rels_path_idx" ON "_payload_preferences_rels" ("path");
  `;
  await client.query(createPreferencesRels);
  console.log('✅ _payload_preferences_rels table created');

  // Step 6: Add missing columns to media table (already exists)
  const alterMedia = `
    ALTER TABLE "media"
      ADD COLUMN IF NOT EXISTS "alt" varchar,
      ADD COLUMN IF NOT EXISTS "updated_at" timestamp(3) with time zone DEFAULT now(),
      ADD COLUMN IF NOT EXISTS "created_at" timestamp(3) with time zone DEFAULT now(),
      ADD COLUMN IF NOT EXISTS "url" varchar,
      ADD COLUMN IF NOT EXISTS "thumbnail_u_r_l" varchar,
      ADD COLUMN IF NOT EXISTS "filename" varchar,
      ADD COLUMN IF NOT EXISTS "mime_type" varchar,
      ADD COLUMN IF NOT EXISTS "filesize" numeric,
      ADD COLUMN IF NOT EXISTS "width" numeric,
      ADD COLUMN IF NOT EXISTS "height" numeric,
      ADD COLUMN IF NOT EXISTS "focal_x" numeric,
      ADD COLUMN IF NOT EXISTS "focal_y" numeric;
  `;
  try {
    await client.query(alterMedia);
    console.log('✅ media table updated');
  } catch (e) {
    // media table may not exist, create it
    const createMedia = `
      CREATE TABLE IF NOT EXISTS "media" (
        "id" serial PRIMARY KEY,
        "alt" varchar,
        "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
        "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
        "url" varchar,
        "thumbnail_u_r_l" varchar,
        "filename" varchar,
        "mime_type" varchar,
        "filesize" numeric,
        "width" numeric,
        "height" numeric,
        "focal_x" numeric,
        "focal_y" numeric
      );
    `;
    await client.query(createMedia);
    console.log('✅ media table created');
  }

  // Step 7: Create indexes on users
  try {
    await client.query(`CREATE UNIQUE INDEX IF NOT EXISTS "users_email_idx" ON "users" ("email")`);
  } catch (e) {
    console.log('⚠ users_email_idx skipped (duplicates may exist)');
  }
  await client.query(`CREATE INDEX IF NOT EXISTS "users_updated_at_idx" ON "users" ("updated_at")`);
  await client.query(`CREATE INDEX IF NOT EXISTS "users_created_at_idx" ON "users" ("created_at")`);
  console.log('✅ Indexes created');

  console.log('\n🎉 All Payload CMS tables are ready!');
  await client.end();
}

main().catch((err) => {
  console.error('❌ Failed:', err);
  process.exit(1);
});
