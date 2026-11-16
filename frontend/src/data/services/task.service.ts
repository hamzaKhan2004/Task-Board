import api from "../api/axios";
import type {
  Task,
  CreateTaskInput,
  UpdateTaskInput,
} from "../../domain/types/task.types";

// Get all tasks
export const getTasks = async (): Promise<Task[]> => {
  const response = await api.get("/api/tasks");

  return response.data.data;
};

// Get task by ID
export const getTaskById = async (id: string): Promise<Task> => {
  const response = await api.get(`/api/tasks/${id}`);

  return response.data.data;
};

// Create task
export const createTask = async (taskData: CreateTaskInput): Promise<Task> => {
  const response = await api.post("/api/tasks", taskData);

  return response.data.data;
};

// Update task
export const updateTask = async (
  id: string,
  updates: UpdateTaskInput,
): Promise<Task> => {
  const response = await api.patch(`/api/tasks/${id}`, updates);

  return response.data.data;
};

// Delete task
export const deleteTask = async (id: string): Promise<void> => {
  await api.delete(`/api/tasks/${id}`);
};
