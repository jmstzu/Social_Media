-- 1. Create the database and user (corrected password to match your app properties)
CREATE DATABASE social_media;
CREATE USER jmstzu WITH PASSWORD 'ThePassword';  -- Matches your application.properties

-- 2. Grant database-level access
GRANT CONNECT ON DATABASE social_media TO jmstzu;

-- 3. Switch to the new database
\c social_media

-- 4. Grant schema privileges (fixed typo in "SEQUENCES")
GRANT USAGE, CREATE ON SCHEMA public TO jmstzu;

-- 5. Grant full access to existing objects
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO jmstzu;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO jmstzu;  -- Fixed spelling
GRANT ALL PRIVILEGES ON ALL FUNCTIONS IN SCHEMA public TO jmstzu;

-- 6. Set default privileges for future objects
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO jmstzu;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO jmstzu;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON FUNCTIONS TO jmstzu;
