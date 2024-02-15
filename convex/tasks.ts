import { v } from "convex/values";
import { getManyFrom } from "convex-helpers/server/relationships";

import type { Id } from "./_generated/dataModel";
import { mutation, query } from "./_generated/server";


// display all the tasks for a specific event UI - it will return an array of tasks with their headers/categories
export const getTasksByEventId = query({
  args: {
    eventId: v.id("events"),
  },
  handler: async (ctx, { eventId }) => {
    const tasks = await getManyFrom(ctx.db, "tasks", "eventId", eventId);

    const groupedTasksArray = Object.entries(groupTasksByHeader(tasks)).map(([header, tasks]) => ({
      header,
      tasks,
    }));

    return groupedTasksArray;
  },
});

// populateEvent button maybe? - just puts our initial checklist all at one in the database
export const createTasksByEventId = mutation({
  args: {
    tasksArray: v.array(v.object({
      eventId: v.id("events"),
      header: v.string(),
      description: v.string(),
      done: v.boolean(),
    })),
  },
  handler: async (ctx, { tasksArray }) => {
    const tasks = await Promise.all(tasksArray.map(async task => {
      const newTask = await ctx.db.insert("tasks", task);

      return newTask;
    }));

    return tasks;
  },
});

// create tasks one at a time - so one add tasks button somewhere at the top
// the button opens up a modal - user selects a header/category to put under and writes a description?
export const createTaskByEventId = mutation({
  args: {
    eventId: v.id("events"),
    header: v.string(),
    description: v.string(),
  },
  handler: async (ctx, { eventId, header, description }) => {
    const newTask = await ctx.db.insert("tasks", {
      eventId,
      header,
      description,
      done: false,
    });

    return newTask;
  },
});

// update tasks one at a time - so every task/checkbox with a edit button?
export const updateTaskById = mutation({
  args: {
    taskId: v.id("tasks"),
    description: v.optional(v.string()),
    done: v.optional(v.boolean()),
  },
  handler: async (ctx, { taskId, description, done }) => {
    const task = await ctx.db.get(taskId);

    if (!task) {
      throw new Error("Task not found");
    }

    const updatedTask = await ctx.db.patch(taskId, {
      description,
      done,
    });

    return updatedTask;
  },
});

// delete tasks one at a time - so every task/checkbox with a delete button?
export const deleteTaskById = mutation({
  args: {
    taskId: v.id("tasks"),
  },
  handler: async (ctx, { taskId }) => {
    const task = await ctx.db.get(taskId);

    if (!task) {
      throw new Error("Task not found");
    }

    await ctx.db.delete(taskId);

    return taskId;
  },
});

export const getTaskById = query({
  args: {
    taskId: v.id("tasks"),
  },
  handler: async (ctx, { taskId }) => {
    const task = await ctx.db.get(taskId);

    return task;
  },
});

// Use reduce to group tasks by header
function groupTasksByHeader(tasks:
{
  _id: Id<"tasks">;
  _creationTime: number;
  description: string;
  eventId: Id<"events">;
  header: string;
}[]
): Record<string, typeof tasks> {
  return tasks.reduce((groups, task) => {
    const header = task.header;

    if (!groups[header]) {
      groups[header] = [];
    }

    groups[header].push(task);

    return groups;
  }, {} as Record<string, typeof tasks>);
}

