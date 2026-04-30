-- Add locale column to SeoPage with default 'es'
ALTER TABLE "SeoPage" ADD COLUMN "locale" TEXT NOT NULL DEFAULT 'es';

-- Drop old unique constraint on slug alone
ALTER TABLE "SeoPage" DROP CONSTRAINT IF EXISTS "SeoPage_slug_key";

-- Create compound unique constraint on (slug, locale)
ALTER TABLE "SeoPage" ADD CONSTRAINT "SeoPage_slug_locale_key" UNIQUE ("slug", "locale");
