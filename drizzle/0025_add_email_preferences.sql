ALTER TABLE "user_profile" ADD COLUMN "emailPreferences" jsonb DEFAULT '{"weeklySuggestions":true}'::jsonb;
