import { v4 as uuidv4 } from "uuid";
import db from "../config/database.js";
import type { Task, CreateTaskInput } from "../types/task.types.js";

interface TaskRow {
  id: string;
  title: string;
  description: string;
  status: Task["status"];
  created_at: string;
  updated_at: string;
}

const mapTask = (row: TaskRow): Task => ({
  id: row.id,
  title: row.title,
  description: row.description,
  status: row.status,
  createdAt: new Date(row.created_at),
  updatedAt: new Date(row.updated_at),
});

// Create task
export const createTask = (data: CreateTaskInput): Task => {
  const now = new Date();

  const task: Task = {
    id: uuidv4(),
    title: data.title,
    description: data.description,
    status: data.status,
    createdAt: now,
    updatedAt: now,
  };

  const statement = db.prepare(`
    INSERT INTO tasks (
      id,
      title,
      description,
      status,
      created_at,
      updated_at
    )
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  statement.run(
    task.id,
    task.title,
    task.description,
    task.status,
    task.createdAt.toISOString(),
    task.updatedAt.toISOString(),
  );

  return task;
};

// Get all tasks
export const getAllTasks = (): Task[] => {
  const statement = db.prepare(`
    SELECT * FROM tasks ORDER BY created_at ASC
  `);

  const rows = statement.all() as TaskRow[];

  return rows.map(mapTask);
};

// Get task by ID
export const getTaskById = (id: string): Task | undefined => {
  const statement = db.prepare(`
    SELECT * FROM tasks WHERE id = ?
  `);

  const row = statement.get(id) as TaskRow | undefined;

  return row ? mapTask(row) : undefined;
};

// Update task
export const updateTask = (
  id: string,
  updates: Partial<CreateTaskInput>,
): Task | undefined => {
  const existingTask = getTaskById(id);

  if (!existingTask) {
    return undefined;
  }

  const updatedTask: Task = {
    ...existingTask,
    ...updates,
    updatedAt: new Date(),
  };

  const statement = db.prepare(`
    UPDATE tasks
    SET
      title = ?,
      description = ?,
      status = ?,
      updated_at = ?
    WHERE id = ?
  `);

  statement.run(
    updatedTask.title,
    updatedTask.description,
    updatedTask.status,
    updatedTask.updatedAt.toISOString(),
    id,
  );

  return getTaskById(id);
};

// Delete task
export const deleteTask = (id: string): boolean => {
  const statement = db.prepare(`
    DELETE FROM tasks WHERE id = ?
  `);

  const result = statement.run(id);

  return result.changes > 0;
};
