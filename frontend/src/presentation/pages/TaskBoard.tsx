import { useState } from "react";
import { useTasks } from "../../application/hooks/useTasks";

import type {
  Task,
  TaskStatus,
  CreateTaskInput,
} from "../../domain/types/task.types";

import TaskForm from "../components/TaskForm";
import TaskColumn from "../components/TaskColumn";

const TaskBoard = () => {
  const { tasks, loading, error, addTask, editTask, removeTask } = useTasks();

  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const handleFormSubmit = async (data: CreateTaskInput): Promise<boolean> => {
    if (editingTask) {
      return await editTask(editingTask.id, data);
    }

    return await addTask(data);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingTask(null);
  };

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?",
    );

    if (confirmed) {
      await removeTask(id);
    }
  };

  const handleStatusChange = (id: string, status: TaskStatus) => {
    void editTask(id, { status });
  };

  if (loading) {
    return <p className="page-message">Loading tasks...</p>;
  }

  return (
    <main className="board-container">
      <header className="board-header">
        <div>
          <h1>Task Board</h1>
          <p>Organize your work and track progress.</p>
        </div>

        <button onClick={() => setShowForm(true)}>+ Add task</button>
      </header>

      {error && <div className="error-message">{error}</div>}

      {showForm && (
        <TaskForm
          initialTask={editingTask}
          onSubmit={handleFormSubmit}
          onCancel={handleCancel}
        />
      )}

      <div className="board-columns">
        <TaskColumn
          title="To Do"
          status="to-do"
          tasks={tasks}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onStatusChange={handleStatusChange}
        />

        <TaskColumn
          title="In Progress"
          status="in-progress"
          tasks={tasks}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onStatusChange={handleStatusChange}
        />

        <TaskColumn
          title="Done"
          status="done"
          tasks={tasks}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onStatusChange={handleStatusChange}
        />
      </div>
    </main>
  );
};

export default TaskBoard;
