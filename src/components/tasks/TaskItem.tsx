import type { TaskPayload } from "../../types/task";

// Định nghĩa kiểu dữ liệu cho props, đảm bảo `task` luôn là một đối tượng `TaskPayload`.
interface TaskItemProps {
  task: TaskPayload;
}

/**
 * Component `TaskItem` hiển thị thông tin chi tiết cho một công việc duy nhất.
 * Đây là một component trình bày (presentational component) điển hình, chỉ nhận dữ liệu và hiển thị nó.
 * @param {TaskItemProps} props - Props chứa đối tượng `task`.
 * @returns {JSX.Element} Giao diện thẻ (card) của một công việc.
 */
export const TaskItem = ({ task }: TaskItemProps) => {
  return (
    // Thẻ `div` bên ngoài tạo thành một "card" với bo viền, đổ bóng và padding.
    <div className="rounded-lg border bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
      {/* Hiển thị tiêu đề của công việc, in đậm. */}
      <h3 className="font-bold text-gray-800">{task.title}</h3>
      {/* Hiển thị trạng thái của công việc với màu chữ xám và cỡ chữ nhỏ hơn. */}
      <p className="text-sm text-gray-500">Trạng thái: {task.status}</p>
      {/* Trong tương lai, có thể thêm các nút hành động (sửa, xóa) tại đây. */}
    </div>
  );
};

export default TaskItem;
