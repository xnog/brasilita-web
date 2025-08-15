ALTER TABLE "property" ALTER COLUMN "features" SET DATA TYPE jsonb;--> statement-breakpoint
ALTER TABLE "property" ALTER COLUMN "images" SET DATA TYPE jsonb;--> statement-breakpoint
ALTER TABLE "property" ADD COLUMN "isRented" boolean DEFAULT false;