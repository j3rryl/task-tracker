import React from "react";
import { Skeleton } from "./ui/skeleton";
import { Card, CardContent } from "./ui/card";

const CardSkeleton = () => {
  return (
    <Card>
      <CardContent className="py-5">
        <div className="flex flex-col space-y-3">
          <Skeleton className="h-[125px] w-full rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CardSkeleton;
