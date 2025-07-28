import { create } from "zustand";
import type { TaskPayload } from "../types/task";
import { getTasks } from "../services/taskService";

/**
 * @file task.store.ts
 * @description Store quản lý trạng thái liên quan đến công việc (tasks).
 * Bao gồm danh sách công việc, trạng thái tải dữ liệu (loading), và lỗi.
 */

/**
 * Định nghĩa cấu trúc của state và các actions trong store công việc.
 */
interface TaskState {
  /** Mảng chứa danh sách các công việc. */
  tasks: TaskPayload[];
  /** Cờ boolean cho biết có đang trong quá trình tải dữ liệu hay không. */
  isLoading: boolean;
  /** Chứa thông báo lỗi nếu quá trình tải dữ liệu thất bại, ngược lại là `null`. */
  error: string | null;
  /** Action bất đồng bộ để lấy danh sách công việc từ API. */
  fetchTasks: () => Promise<void>;
}

/**
 * Tạo store `useTaskStore` để quản lý trạng thái của các công việc.
 * Không sử dụng `persist` ở đây vì danh sách công việc thường được lấy mới mỗi khi người dùng truy cập
 * để đảm bảo dữ liệu luôn cập nhật.
 */
export const useTaskStore = create<TaskState>((set) => ({
  // State ban đầu
  tasks: [],
  isLoading: false,
  error: null,

  // **Mentor's Note: Action bất đồng bộ để xử lý vòng đời của một yêu cầu API**
  fetchTasks: async () => {
    // 1. Bắt đầu yêu cầu: Đặt `isLoading` thành `true` và xóa lỗi cũ (nếu có).
    // Giao diện sẽ dựa vào `isLoading` để hiển thị spinner hoặc skeleton loader.
    set({ isLoading: true, error: null });

    try {
      // 2. Gọi API: Dùng `await` để đợi hàm `getTasks` từ service hoàn thành.
      const tasks = await getTasks();

      // 3. Yêu cầu thành công: Cập nhật state với dữ liệu mới và đặt `isLoading` về `false`.
      set({ tasks, isLoading: false });
    } catch (error) {
      // 4. Yêu cầu thất bại: Bắt lỗi, cập nhật state với thông báo lỗi và đặt `isLoading` về `false`.
      // Giao diện sẽ hiển thị thông báo lỗi này cho người dùng.
      set({ error: "Không thể tải danh sách công việc", isLoading: false });
    }
  },
}));
