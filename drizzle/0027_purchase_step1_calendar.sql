ALTER TABLE "purchase_journey_step"
    ADD COLUMN "eventId" text,
    ADD COLUMN "meetingLink" text,
    ADD COLUMN "eventStart" timestamp,
    ADD COLUMN "eventEnd" timestamp;

