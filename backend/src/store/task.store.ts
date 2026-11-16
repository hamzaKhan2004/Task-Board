import { v4 as uuidv4 } from "uuid";
import type { Task, CreateTaskInput } from "../types/task.types.js";

const tasks: Task[] = [];

// Creating task
export const createTask = (data: CreateTaskInput): Task => {
  const newTask: Task = {
    id: uuidv4(),
    title: data.title,
    description: data.description,
    status: data.status,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  tasks.push(newTask);

  return newTask;
};

// Getting all tasks
export const getAllTasks = (): Task[] => {
  return tasks;
};

// Getting single task
export const getTaskById = (id: string): Task | undefined => {
  return tasks.find((task) => task.id === id);
};

// Updating task
export const updateTask = (
  id: string,
  updates: Partial<CreateTaskInput>,
): Task | undefined => {
  const task = tasks.find((task) => task.id === id);

  if (!task) {
    return undefined;
  }

  Object.assign(task, updates, { updatedAt: new Date() });

  return task;
};

// Deleting task
export const deleteTask = (id: string): boolean => {
  const index = tasks.findIndex((task) => task.id === id);

  if (index === -1) {
    return false;
  }

  tasks.splice(index, 1);

  return true;
};
