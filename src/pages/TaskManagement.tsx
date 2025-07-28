import { useEffect } from "react";
import { useTaskStore } from "../stores/task.store";
import TaskList from "../components/tasks/TaskList";

/**
 * Trang chính để quản lý công việc.
 * Component này là giao diện chính để người dùng tương tác với các công việc của họ.
 * Nó chịu trách nhiệm lấy dữ liệu công việc và hiển thị chúng.
 * @returns {JSX.Element} Giao diện trang quản lý công việc.
 */
function TaskManagement() {
  // Sử dụng hook `useTaskStore` của Zustand để lấy state và actions từ store.
  // - `tasks`: Mảng chứa danh sách các công việc.
  // - `isLoading`: Trạng thái cho biết có đang tải dữ liệu hay không.
  // - `error`: Chứa thông báo lỗi nếu có.
  // - `fetchTasks`: Hàm để gọi API lấy danh sách công việc.
  const { tasks, isLoading, error, fetchTasks } = useTaskStore();

  // `useEffect` được dùng để thực hiện các side effect, trong trường hợp này là lấy dữ liệu từ server.
  useEffect(() => {
    // Gọi hàm `fetchTasks` để bắt đầu quá trình lấy dữ liệu khi component được render lần đầu.
    fetchTasks();
  }, [fetchTasks]); // `fetchTasks` được đưa vào mảng phụ thuộc để đảm bảo hàm này chỉ được gọi lại khi chính nó thay đổi (thường là không đổi).

  // Hàm này quyết định nội dung sẽ được render dựa trên trạng thái hiện tại (loading, error, có dữ liệu).
  const renderContent = () => {
    // Nếu đang tải dữ liệu, hiển thị thông báo loading.
    if (isLoading) {
      return <p className="text-center">Đang tải danh sách công việc...</p>;
    }

    // Nếu có lỗi, hiển thị thông báo lỗi.
    if (error) {
      return <p className="text-center text-red-500">Lỗi: {error}</p>;
    }

    // Nếu không có công việc nào, hiển thị thông báo cho người dùng.
    if (tasks.length === 0) {
      return <p className="text-center">Không có công việc nào. Hãy tạo một công việc mới!</p>;
    }

    // Nếu có dữ liệu, render component `TaskList` và truyền danh sách công việc vào qua props.
    return <TaskList tasks={tasks} />;
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-6 text-3xl font-bold">Công việc của tôi</h1>
      {/* Gọi hàm `renderContent` để hiển thị nội dung phù hợp */}
      {renderContent()}
    </div>
  );
}

export default TaskManagement;
