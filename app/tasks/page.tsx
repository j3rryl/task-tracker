import { db } from "@/db";
import { tasks } from "@/db/schema";
import React from "react";
import TasksComponent from "./TasksComponent";
export const dynamic = "force-dynamic";

const Page = async () => {
  const allTasks = await db.select().from(tasks);
  return <TasksComponent tasks={allTasks} />;
};

export default Page;
