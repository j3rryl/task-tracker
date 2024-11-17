"use server";

import { getMutableAIState, streamUI } from "ai/rsc";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";
import { ReactNode } from "react";
import { generateId } from "ai";
import TasksList from "../tasks/TasksList";
import { db } from "@/db";
import { tasks } from "@/db/schema";
import { createTask } from "../actions";

export interface ServerMessage {
  role: "user" | "assistant";
  content: string;
}

export interface ClientMessage {
  id: string;
  role: "user" | "assistant";
  display: ReactNode;
}

const LoadingComponent = () => (
  <div className="animate-pulse p-4">Hang on...</div>
);

export async function continueConversation(
  input: string
): Promise<ClientMessage> {
  "use server";

  const history = getMutableAIState();

  const result = await streamUI({
    model: openai("gpt-3.5-turbo"),
    messages: [...history.get(), { role: "user", content: input }],
    text: ({ content, done }) => {
      if (done) {
        history.done((messages: ServerMessage[]) => [
          ...messages,
          { role: "assistant", content },
        ]);
      }

      return <div>{content}</div>;
    },
    tools: {
      getTasks: {
        description: "Get tasks",
        parameters: z.object({}),
        generate: async function* () {
          yield <LoadingComponent />;
          const allTasks = await db.select().from(tasks);
          return <TasksList tasks={allTasks} />;
        },
      },
      addTask: {
        description: "Add task",
        parameters: z.object({
          name: z.string().describe("get name"),
          description: z.string().describe("get description"),
        }),
        generate: async function* ({ name, description }) {
          yield <LoadingComponent />;
          const result = await createTask({ name, description });
          if (result.success) {
            const allTasks = await db.select().from(tasks);
            return <TasksList tasks={allTasks} />;
          }
        },
      },
    },
  });

  return {
    id: generateId(),
    role: "assistant",
    display: result.value,
  };
}
