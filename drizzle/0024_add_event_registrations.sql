CREATE TABLE IF NOT EXISTS "event_registration" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"phone" text,
	"event_name" text NOT NULL,
	"event_date" timestamp NOT NULL,
	"registered_at" timestamp DEFAULT now() NOT NULL,
	"attended" boolean DEFAULT false,
	"source" text
);

