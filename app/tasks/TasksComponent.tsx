"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { createTask, deleteTask } from "../actions";
import { toast } from "sonner";
import TasksList from "./TasksList";
import { TaskModel } from "@/db/schema";
import { useRouter } from "next/navigation";

const TasksComponent = ({ tasks }: { tasks: TaskModel[] }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const submitForm = async (formData: FormData) => {
    const formValues = Object.fromEntries(formData);
    const result = await createTask(formValues);
    if (result.id) {
      toast.success(result.message, {
        action: {
          label: "Undo",
          onClick: async () => await deleteTask(result.id),
        },
      });
    } else {
      toast(result.message);
    }
    setOpen(false);
    router.refresh();
  };
  return (
    <div className="m-5">
      <div className="flex justify-between items-center">
        <Input
          type="text"
          id="text"
          placeholder="Search..."
          className="w-1/2"
        />

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus />
              Add Task
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add new task</DialogTitle>
            </DialogHeader>
            <form action={submitForm}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    id="name"
                    name="name"
                    className="col-span-3"
                    placeholder="Name"
                    required
                  />
                  <Textarea
                    id="description"
                    name="description"
                    className="col-span-3"
                    placeholder="Description"
                    required
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Save</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <TasksList tasks={tasks} />
    </div>
  );
};

export default TasksComponent;
