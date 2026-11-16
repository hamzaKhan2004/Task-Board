import { Router } from "express";

import {
  createTaskController,
  getAllTasksController,
  getTaskByIdController,
  updateTaskController,
  deleteTaskController,
} from "../controllers/task.controller.js";

const router = Router();

// POST task
router.post("/", createTaskController);

// GET task
router.get("/", getAllTasksController);

// GET task/:id
router.get("/:id", getTaskByIdController);

// PATCH task/:id
router.patch("/:id", updateTaskController);

// DELETE task/:id
router.delete("/:id", deleteTaskController);

export default router;
