import { pgEnum, pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const statusEnum = pgEnum("status", [
  "pending",
  "completed",
  "cancelled",
]);
export const tasks = pgTable("tasks", {
  id: serial("id"),
  name: varchar("name", { length: 255 }),
  description: text("description"),
  status: statusEnum().default("pending"),
});

export type TaskModel = typeof tasks.$inferSelect;
