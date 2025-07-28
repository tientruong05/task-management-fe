import type { TaskPayload } from "../../types/task";
import TaskItem from "./TaskItem";

// Định nghĩa kiểu dữ liệu cho props của component `TaskList`.
// Điều này đảm bảo rằng `TaskList` luôn nhận được một mảng các công việc (`TaskPayload[]`).
interface TaskListProps {
  tasks: TaskPayload[];
}

/**
 * Component `TaskList` chịu trách nhiệm hiển thị một danh sách các công việc.
 * Nó nhận vào một mảng các công việc và render một component `TaskItem` cho mỗi công việc.
 * @param {TaskListProps} props - Props của component, chứa mảng `tasks`.
 * @returns {JSX.Element} Giao diện danh sách các công việc.
 */
export const TaskList = ({ tasks }: TaskListProps) => {
  return (
    // Sử dụng CSS Grid để tạo layout dạng lưới, có thể tự điều chỉnh số cột trên các màn hình khác nhau (responsive).
    // - `grid-cols-1`: 1 cột trên màn hình nhỏ.
    // - `md:grid-cols-2`: 2 cột trên màn hình vừa (medium).
    // - `lg:grid-cols-3`: 3 cột trên màn hình lớn (large).
    // - `gap-4`: Khoảng cách giữa các item trong lưới.
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {/* 
        Sử dụng phương thức `map` để lặp qua mảng `tasks`.
        Với mỗi đối tượng `task` trong mảng, một component `TaskItem` sẽ được tạo ra.
      */}
      {tasks.map((task) => (
        // **Mentor's Note:**
        // 1. `key={task.id}`: Cung cấp một `key` duy nhất là rất quan trọng khi render danh sách trong React.
        //    React sử dụng `key` để xác định các phần tử đã thay đổi, được thêm vào hoặc bị xóa đi, giúp tối ưu hóa hiệu suất.
        // 2. `task={task}`: Truyền toàn bộ đối tượng `task` xuống cho component `TaskItem` qua props.
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
};

export default TaskList;
