CREATE TABLE "user_progress_history" (
	"id" text PRIMARY KEY NOT NULL,
	"progressId" text NOT NULL,
	"action" text NOT NULL,
	"previousValue" text,
	"newValue" text,
	"timestamp" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "user_checklist_progress" ADD COLUMN "priority" integer DEFAULT 0;--> statement-breakpoint
ALTER TABLE "user_checklist_progress" ADD COLUMN "dueDate" timestamp;--> statement-breakpoint
ALTER TABLE "user_checklist_progress" ADD COLUMN "attachments" text;--> statement-breakpoint
ALTER TABLE "user_progress_history" ADD CONSTRAINT "user_progress_history_progressId_user_checklist_progress_id_fk" FOREIGN KEY ("progressId") REFERENCES "public"."user_checklist_progress"("id") ON DELETE cascade ON UPDATE no action;