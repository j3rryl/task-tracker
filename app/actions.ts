"use server";

import { db } from "@/db";
import { tasks } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const taskSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
});
export async function createTask(formData: unknown) {
  const parse = taskSchema.safeParse(formData);
  if (!parse.success) {
    let errorMessage = "";
    parse.error?.issues.forEach((issue) => {
      errorMessage = errorMessage + issue.message + "\n";
    });
    return { success: false, message: errorMessage };
  }
  const taskId = await db.insert(tasks).values(parse.data).returning();
  return {
    success: true,
    message: "Task created successfully!",
    id: taskId[0].id,
  };
}

export async function deleteTask(taskId: number) {
  await db.delete(tasks).where(eq(tasks.id, taskId));
  revalidatePath("/tasks");
  return { success: true, message: "Task successfully deleted." };
}
export async function updateTask(
  taskId: number,
  status: "pending" | "completed" | "cancelled"
) {
  await db.update(tasks).set({ status: status }).where(eq(tasks.id, taskId));
  revalidatePath("/tasks");
  return { success: true, message: "Task successfully updated." };
}
