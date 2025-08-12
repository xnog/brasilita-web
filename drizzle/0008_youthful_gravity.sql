DROP TABLE "user_property_interest" CASCADE;--> statement-breakpoint
ALTER TABLE "property_match" ADD COLUMN "isInterested" boolean DEFAULT false;