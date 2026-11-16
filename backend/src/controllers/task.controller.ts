import type { Request, Response } from "express";

import {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
} from "../services/task.service.js";

import type { CreateTaskInput, TaskStatus } from "../types/task.types.js";

const validStatuses: TaskStatus[] = ["to-do", "in-progress", "done"];

// Create task
export const createTaskController = (req: Request, res: Response) => {
  const { title, description, status } = req.body;

  if (
    typeof title !== "string" ||
    !title.trim() ||
    typeof description !== "string" ||
    !validStatuses.includes(status)
  ) {
    return res.status(400).json({
      success: false,
      message: "Invalid task data",
    });
  }

  const taskData: CreateTaskInput = {
    title: title.trim(),
    description: description.trim(),
    status,
  };

  const task = createTask(taskData);

  return res.status(201).json({
    success: true,
    message: "Task created successfully",
    data: task,
  });
};

// Get all tasks
export const getAllTasksController = (req: Request, res: Response) => {
  const tasks = getAllTasks();

  return res.status(200).json({
    success: true,
    count: tasks.length,
    data: tasks,
  });
};

// Get single task
export const getTaskByIdController = (
  req: Request<{ id: string }>,
  res: Response,
) => {
  const task = getTaskById(req.params.id);

  if (!task) {
    return res.status(404).json({
      success: false,
      message: "Task not found",
    });
  }

  return res.status(200).json({
    success: true,
    data: task,
  });
};

// Update task
export const updateTaskController = (req: Request, res: Response) => {
  const { title, description, status } = req.body;
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;

  const updates: Partial<CreateTaskInput> = {};

  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({
      success: false,
      message: "At least one field is required",
    });
  }

  if (title !== undefined) {
    if (typeof title !== "string" || !title.trim()) {
      return res.status(400).json({
        success: false,
        message: "Title must be a non-empty string",
      });
    }

    updates.title = title.trim();
  }

  if (description !== undefined) {
    if (typeof description !== "string") {
      return res.status(400).json({
        success: false,
        message: "Description must be a string",
      });
    }

    updates.description = description;
  }

  if (status !== undefined) {
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid task status",
      });
    }

    updates.status = status;
  }

  const task = updateTask(id, updates);

  if (!task) {
    return res.status(404).json({
      success: false,
      message: "Task not found",
    });
  }

  return res.status(200).json({
    success: true,
    message: "Task updated successfully",
    data: task,
  });
};

// Delete task
export const deleteTaskController = (
  req: Request<{ id: string }>,
  res: Response,
) => {
  const deleted = deleteTask(req.params.id);

  if (!deleted) {
    return res.status(404).json({
      success: false,
      message: "Task not found",
    });
  }

  return res.status(200).json({
    success: true,
    message: "Task deleted successfully",
  });
};
