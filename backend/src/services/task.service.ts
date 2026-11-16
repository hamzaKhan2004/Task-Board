import {
  createTask as createTaskInStore,
  getAllTasks as getAllTasksFromStore,
  getTaskById as getTaskByIdFromStore,
  updateTask as updateTaskInStore,
  deleteTask as deleteTaskFromStore,
} from "../store/task.store.js";

import type { Task, CreateTaskInput } from "../types/task.types.js";

// Create task
export const createTask = (data: CreateTaskInput): Task => {
  return createTaskInStore(data);
};

// Get all tasks
export const getAllTasks = (): Task[] => {
  return getAllTasksFromStore();
};

// Get task by ID
export const getTaskById = (id: string): Task | undefined => {
  return getTaskByIdFromStore(id);
};

// Update task
export const updateTask = (
  id: string,
  updates: Partial<CreateTaskInput>,
): Task | undefined => {
  return updateTaskInStore(id, updates);
};

// Delete task
export const deleteTask = (id: string): boolean => {
  return deleteTaskFromStore(id);
};
