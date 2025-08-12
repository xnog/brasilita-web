CREATE TABLE "property" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"price" integer NOT NULL,
	"location" text NOT NULL,
	"propertyType" text NOT NULL,
	"bedrooms" integer,
	"bathrooms" integer,
	"area" integer,
	"features" text,
	"images" text,
	"isAvailable" boolean DEFAULT true,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "user_property_interest" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"propertyId" text NOT NULL,
	"isInterested" boolean DEFAULT true,
	"notes" text,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "user_property_interest" ADD CONSTRAINT "user_property_interest_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_property_interest" ADD CONSTRAINT "user_property_interest_propertyId_property_id_fk" FOREIGN KEY ("propertyId") REFERENCES "public"."property"("id") ON DELETE cascade ON UPDATE no action;