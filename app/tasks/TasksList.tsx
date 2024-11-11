"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TaskModel } from "@/db/schema";
import React from "react";
import { deleteTask, updateTask } from "../actions";
import { toast } from "sonner";

const TasksList = ({ tasks }: { tasks: TaskModel[] }) => {
  const removeTask = async (id: number) => {
    const result = await deleteTask(id);
    toast.success(result.message);
  };
  const updateStatus = async (
    id: number,
    status: "pending" | "completed" | "cancelled"
  ) => {
    const result = await updateTask(id, status);
    toast.success(result.message);
  };
  return (
    <div className="grid grid-cols-3 gap-4 my-5">
      {tasks?.map((item) => {
        return (
          <Card key={item.id}>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span className="underline">{item.name}</span>
                <Badge
                  variant={item.status == "completed" ? "success" : "warning"}
                  className="capitalize"
                >
                  {item.status}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>{item.description}</p>
              <div className="flex justify-end items-center"></div>
              <div className="flex justify-between items-center mt-5">
                <Button
                  variant="outline"
                  onClick={async () => {
                    const status = item.status;

                    await updateStatus(
                      item.id,
                      status === "completed" ? "pending" : "completed"
                    );
                  }}
                >
                  {item.status === "completed"
                    ? "Mark pending"
                    : "Mark as Completed"}
                </Button>
                <Button
                  variant="outline"
                  onClick={async () => {
                    await removeTask(item.id);
                  }}
                >
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default TasksList;
