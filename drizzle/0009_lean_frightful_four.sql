CREATE TABLE "region" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	CONSTRAINT "region_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "user_profile_region" (
	"id" text PRIMARY KEY NOT NULL,
	"userProfileId" text NOT NULL,
	"regionId" text NOT NULL,
	"createdAt" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "property" ADD COLUMN "regionId" text;--> statement-breakpoint
ALTER TABLE "user_profile_region" ADD CONSTRAINT "user_profile_region_userProfileId_user_profile_id_fk" FOREIGN KEY ("userProfileId") REFERENCES "public"."user_profile"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_profile_region" ADD CONSTRAINT "user_profile_region_regionId_region_id_fk" FOREIGN KEY ("regionId") REFERENCES "public"."region"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "property" ADD CONSTRAINT "property_regionId_region_id_fk" FOREIGN KEY ("regionId") REFERENCES "public"."region"("id") ON DELETE set null ON UPDATE no action;