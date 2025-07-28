import apiClient from "../lib/axios";
import type { TaskPayload } from "../types/task";

/**
 * @file taskService.ts
 * @description Lớp dịch vụ (Service Layer) để tương tác với các API liên quan đến công việc (Task).
 * **Mentor's Note:** Service layer giúp tách biệt logic gọi API ra khỏi các component và store.
 * Điều này làm cho code dễ bảo trì, dễ đọc và dễ dàng thay thế hoặc giả lập (mock) API khi viết test.
 */

/**
 * Lấy danh sách tất cả công việc từ backend.
 * @returns {Promise<TaskPayload[]>} Một promise sẽ trả về một mảng các công việc.
 */
export const getTasks = async (): Promise<TaskPayload[]> => {
  // Sử dụng `apiClient` đã được cấu hình sẵn (với baseURL và interceptor).
  // `apiClient.get<TaskPayload[]>`:
  // - Thực hiện một HTTP GET request.
  // - Endpoint '/tasks' sẽ được nối vào `baseURL` thành 'http://localhost:8080/api/tasks'.
  // - Generic `<TaskPayload[]>` báo cho TypeScript biết rằng `response.data` sẽ có kiểu là một mảng các TaskPayload.
  const response = await apiClient.get<TaskPayload[]>("/tasks");

  // Axios trả về một đối tượng response lớn, trong đó dữ liệu thực tế từ server nằm trong thuộc tính `data`.
  return response.data;
};
