import { Suspense } from "react";
import TaskStatistics from "./TaskStatistics";
import TaskSkeleton from "./TaskSkeleton";
export const dynamic = "force-dynamic";
const Page = async () => {
  return (
    <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">
          Dashboard Overview
        </h1>

        {/* Stats Grid */}
        <Suspense fallback={<TaskSkeleton />}>
          <TaskStatistics />
        </Suspense>
      </div>
    </main>
  );
};

export default Page;
