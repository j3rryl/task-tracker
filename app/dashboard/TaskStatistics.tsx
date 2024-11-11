import { Package, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { db } from "@/db";
import { tasks } from "@/db/schema";
import { eq, sql } from "drizzle-orm";
const TaskStatistics = async () => {
  // await new Promise((resolve) => setTimeout(resolve, 2000));
  let taskCount = 0;
  let completedTasks = 0;
  let pendingTasks = 0;

  try {
    const [taskQuery, completedQuery, pendingQuery] = await Promise.all([
      db.select({ count: sql<number>`cast(count(*) as int)` }).from(tasks),
      db
        .select({ count: sql<number>`cast(count(*) as int)` })
        .from(tasks)
        .where(eq(tasks.status, "completed")),
      db
        .select({ count: sql<number>`cast(count(*) as int)` })
        .from(tasks)
        .where(eq(tasks.status, "pending")),
    ]);

    taskCount = taskQuery[0]?.count ?? 0;
    completedTasks = completedQuery[0]?.count ?? 0;
    pendingTasks = pendingQuery[0]?.count ?? 0;
  } catch (error) {
    console.error("Error fetching task statistics:", error);
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{taskCount}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Completed Tasks</CardTitle>
          <Package className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{completedTasks}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Pending Tasks</CardTitle>
          <Package className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{pendingTasks}</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TaskStatistics;
