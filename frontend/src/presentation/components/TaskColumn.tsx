import type { Task, TaskStatus } from "../../domain/types/task.types";
import TaskCard from "./TaskCard";

interface TaskColumnProps {
  title: string;
  status: TaskStatus;
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onDrop: (status: TaskStatus) => void;
  onDragOver: (status: TaskStatus) => void;
  isDragOver: boolean;
  onDragStart: (id: string) => void;
  onDragEnd: () => void;
  onStatusChange: (id: string, status: TaskStatus) => void;
}

const TaskColumn = ({
  title,
  status,
  tasks,
  onEdit,
  onDelete,
  onDrop,
  onDragOver,
  isDragOver,
  onDragStart,
  onDragEnd,
  onStatusChange,
}: TaskColumnProps) => {
  const filteredTasks = tasks.filter((task) => task.status === status);

  return (
    <section
      className={`task-column ${isDragOver ? "drag-over" : ""}`}
      onDragOver={(e) => {
        e.preventDefault();
        onDragOver(status);
      }}
      onDrop={(e) => {
        e.preventDefault();
        onDrop(status);
      }}
    >
      <div className="column-header">
        <h2>{title}</h2>
        <span>{filteredTasks.length}</span>
      </div>

      {filteredTasks.length === 0 ? (
        <p className="empty-message">No tasks yet</p>
      ) : (
        filteredTasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onEdit={onEdit}
            onDelete={onDelete}
            onStatusChange={onStatusChange}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
          />
        ))
      )}
    </section>
  );
};

export default TaskColumn;
