import { Card } from "@/components/ui/card";

import { Skeleton } from "@/components/ui/skeleton";
const TaskSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      <Card>
        <Skeleton className="h-[125px] w-full rounded-xl" />
      </Card>
      <Card>
        <Skeleton className="h-[125px] w-full rounded-xl" />
      </Card>
      <Card>
        <Skeleton className="h-[125px] w-full rounded-xl" />
      </Card>
    </div>
  );
};

export default TaskSkeleton;
