-- Drop org FK/index and column from Actor, add unique name+type
ALTER TABLE "Actor" DROP CONSTRAINT IF EXISTS "Actor_org_fkey";
DROP INDEX IF EXISTS "Actor_org_idx";
ALTER TABLE "Actor" DROP COLUMN IF EXISTS "org";

-- Ensure name/type uniqueness globally
CREATE UNIQUE INDEX IF NOT EXISTS "Actor_name_type_key" ON "Actor"("name", "type");

