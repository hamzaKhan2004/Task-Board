/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import type {
  Task,
  TaskStatus,
  CreateTaskInput,
} from "../../domain/types/task.types";

interface TaskFormProps {
  initialTask?: Task | null;
  onSubmit: (data: CreateTaskInput) => Promise<boolean>;
  onCancel: () => void;
}

const TaskForm = ({ initialTask, onSubmit, onCancel }: TaskFormProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<TaskStatus>("to-do");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (initialTask) {
      setTitle(initialTask.title);
      setDescription(initialTask.description);
      setStatus(initialTask.status);
    } else {
      setTitle("");
      setDescription("");
      setStatus("to-do");
    }
  }, [initialTask]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title.trim()) return;

    setSubmitting(true);

    try {
      const success = await onSubmit({
        title: title.trim(),
        description: description.trim(),
        status,
      });

      if (success) {
        onCancel();
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <h3>{initialTask ? "Edit task" : "Create task"}</h3>

      <input
        type="text"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={3}
      />

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value as TaskStatus)}
      >
        <option value="to-do">To Do</option>
        <option value="in-progress">In Progress</option>
        <option value="done">Done</option>
      </select>

      <div className="form-actions">
        <button type="submit" disabled={submitting}>
          {submitting
            ? "Saving..."
            : initialTask
              ? "Save changes"
              : "Create task"}
        </button>

        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
