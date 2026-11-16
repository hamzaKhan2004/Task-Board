/* eslint-disable react-hooks/set-state-in-effect */
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import type {
  Task,
  CreateTaskInput,
  UpdateTaskInput,
} from "../../domain/types/task.types";

import * as taskService from "../../data/services/task.service";

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const handleError = (err: unknown): string => {
    if (axios.isAxiosError(err)) {
      return err.response?.data?.message || "Something went wrong";
    }

    return "An unexpected error occurred";
  };

  // Get all tasks
  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await taskService.getTasks();
      setTasks(data);
    } catch (err) {
      setError(handleError(err));
    } finally {
      setLoading(false);
    }
  }, []);

  // Create task
  const addTask = async (data: CreateTaskInput) => {
    try {
      setError(null);

      const newTask = await taskService.createTask(data);
      setTasks((prevTasks) => [...prevTasks, newTask]);

      return true;
    } catch (err) {
      setError(handleError(err));
      return false;
    }
  };

  // Update task
  const editTask = async (id: string, data: UpdateTaskInput) => {
    try {
      setError(null);

      const updatedTask = await taskService.updateTask(id, data);
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === id ? updatedTask : task)),
      );

      return true;
    } catch (err) {
      setError(handleError(err));
      return false;
    }
  };

  // Delete task
  const removeTask = async (id: string) => {
    try {
      setError(null);

      await taskService.deleteTask(id);

      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));

      return true;
    } catch (err) {
      setError(handleError(err));
      return false;
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return {
    tasks,
    loading,
    error,
    addTask,
    editTask,
    removeTask,
    refetch: fetchTasks,
  };
};
