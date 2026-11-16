import type { Task, TaskStatus } from "../../domain/types/task.types";
import TaskCard from "./TaskCard";

interface TaskColumnProps {
  title: string;
  status: TaskStatus;
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: TaskStatus) => void;
}

const TaskColumn = ({
  title,
  status,
  tasks,
  onEdit,
  onDelete,
  onStatusChange,
}: TaskColumnProps) => {
  const filteredTasks = tasks.filter((task) => task.status === status);

  return (
    <section className="task-column">
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
          />
        ))
      )}
    </section>
  );
};

export default TaskColumn;
