CREATE TYPE "public"."status" AS ENUM('pending', 'completed', 'cancelled');--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tasks" (
	"id" serial NOT NULL,
	"name" varchar(255),
	"description" text,
	"status" "status" DEFAULT 'pending'
);
