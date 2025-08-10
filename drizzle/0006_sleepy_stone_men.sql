CREATE TABLE "property_match" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"propertyId" text NOT NULL,
	"matchScore" integer DEFAULT 0,
	"matchReason" text,
	"isActive" boolean DEFAULT true,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "property_match" ADD CONSTRAINT "property_match_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "property_match" ADD CONSTRAINT "property_match_propertyId_property_id_fk" FOREIGN KEY ("propertyId") REFERENCES "public"."property"("id") ON DELETE cascade ON UPDATE no action;