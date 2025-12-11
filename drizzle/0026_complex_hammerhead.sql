CREATE TABLE "purchase_journey_step" (
	"id" text PRIMARY KEY NOT NULL,
	"journeyId" text NOT NULL,
	"stepNumber" integer NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"uploadRequired" boolean DEFAULT false,
	"status" text DEFAULT 'pending' NOT NULL,
	"completedAt" timestamp,
	"notes" text,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	CONSTRAINT "purchase_journey_step_unique" UNIQUE("journeyId","stepNumber")
);
--> statement-breakpoint
CREATE TABLE "purchase_journey_upload" (
	"id" text PRIMARY KEY NOT NULL,
	"journeyId" text NOT NULL,
	"stepId" text NOT NULL,
	"fileName" text NOT NULL,
	"fileUrl" text NOT NULL,
	"fileSize" integer,
	"mimeType" text,
	"uploadedBy" text NOT NULL,
	"createdAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "purchase_journey" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"propertyId" text NOT NULL,
	"status" text DEFAULT 'in_progress' NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	CONSTRAINT "purchase_journey_user_property_unique" UNIQUE("userId","propertyId")
);
--> statement-breakpoint
ALTER TABLE "purchase_journey_step" ADD CONSTRAINT "purchase_journey_step_journeyId_purchase_journey_id_fk" FOREIGN KEY ("journeyId") REFERENCES "public"."purchase_journey"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "purchase_journey_upload" ADD CONSTRAINT "purchase_journey_upload_journeyId_purchase_journey_id_fk" FOREIGN KEY ("journeyId") REFERENCES "public"."purchase_journey"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "purchase_journey_upload" ADD CONSTRAINT "purchase_journey_upload_stepId_purchase_journey_step_id_fk" FOREIGN KEY ("stepId") REFERENCES "public"."purchase_journey_step"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "purchase_journey_upload" ADD CONSTRAINT "purchase_journey_upload_uploadedBy_user_id_fk" FOREIGN KEY ("uploadedBy") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "purchase_journey" ADD CONSTRAINT "purchase_journey_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "purchase_journey" ADD CONSTRAINT "purchase_journey_propertyId_property_id_fk" FOREIGN KEY ("propertyId") REFERENCES "public"."property"("id") ON DELETE cascade ON UPDATE no action;