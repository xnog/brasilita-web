CREATE TABLE "checklist_category" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"order" integer NOT NULL,
	"createdAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "checklist_item" (
	"id" text PRIMARY KEY NOT NULL,
	"categoryId" text NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"order" integer NOT NULL,
	"propertyTypes" text,
	"buyerProfiles" text,
	"usageTypes" text,
	"isOptional" boolean DEFAULT false,
	"estimatedDays" integer,
	"resources" text,
	"createdAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "user_checklist_progress" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"checklistItemId" text NOT NULL,
	"isCompleted" boolean DEFAULT false,
	"completedAt" timestamp,
	"notes" text,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "user_profile" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"propertyType" text,
	"location" text,
	"buyerProfile" text,
	"usageType" text,
	"investmentBudget" integer,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "checklist_item" ADD CONSTRAINT "checklist_item_categoryId_checklist_category_id_fk" FOREIGN KEY ("categoryId") REFERENCES "public"."checklist_category"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_checklist_progress" ADD CONSTRAINT "user_checklist_progress_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_checklist_progress" ADD CONSTRAINT "user_checklist_progress_checklistItemId_checklist_item_id_fk" FOREIGN KEY ("checklistItemId") REFERENCES "public"."checklist_item"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_profile" ADD CONSTRAINT "user_profile_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;