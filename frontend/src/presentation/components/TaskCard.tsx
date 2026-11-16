import type { Task, TaskStatus } from "../../domain/types/task.types";

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onDragStart: (id: string) => void;
  onDragEnd: () => void;
  onStatusChange: (id: string, status: TaskStatus) => void;
}

const TaskCard = ({
  task,
  onEdit,
  onDelete,
  onStatusChange,
  onDragStart,
  onDragEnd,
}: TaskCardProps) => {
  return (
    <div
      className="task-card"
      draggable={true}
      onDragStart={() => onDragStart(task.id)}
      onDragEnd={onDragEnd}
    >
      <h3>{task.title}</h3>

      <p>{task.description || "No description"}</p>

      <div className="task-actions">
        <select
          value={task.status}
          onChange={(e) =>
            onStatusChange(task.id, e.target.value as TaskStatus)
          }
        >
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>

        <button onClick={() => onEdit(task)}>Edit</button>

        <button onClick={() => onDelete(task.id)}>Delete</button>
      </div>
    </div>
  );
};

export default TaskCard;
