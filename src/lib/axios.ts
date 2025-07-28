import axios from "axios";
import { useAuthStore } from "../stores/auth.store";

/**
 * @file axios.ts
 * @description Cấu hình một thể hiện (instance) của Axios để giao tiếp với API backend.
 * Việc tạo một instance riêng giúp chúng ta có một cấu hình tập trung cho tất cả các request,
 * thay vì phải lặp lại ở nhiều nơi.
 */

// Tạo một instance của Axios với các cấu hình mặc định.
const apiClient = axios.create({
  // `baseURL` là tiền tố sẽ được gắn vào trước tất cả các URL request.
  // Ví dụ: request tới '/tasks' sẽ tự động trở thành 'http://localhost:8080/api/tasks'.
  baseURL: "http://localhost:8080/api",
  // `headers` định nghĩa các header mặc định sẽ được gửi cùng với mỗi request.
  headers: {
    "Content-Type": "application/json", // Báo cho server biết client đang gửi dữ liệu dạng JSON.
  },
});

// **Mentor's Note: Đây là phần quan trọng nhất - Request Interceptor (Bộ chặn yêu cầu) **
// Interceptor cho phép chúng ta "chặn" và thay đổi một request TRƯỚC KHI nó được gửi đi.
// Điều này cực kỳ hữu ích để tự động hóa các tác vụ như đính kèm token xác thực.
apiClient.interceptors.request.use(
  // Hàm này sẽ được thực thi với mỗi request thành công.
  (config) => {
    // Lấy token từ Zustand store. 
    // Lưu ý: `useAuthStore.getState()` được dùng để truy cập store bên ngoài một React component.
    const token = useAuthStore.getState().token;

    // Nếu có token trong store (nghĩa là người dùng đã đăng nhập)...
    if (token) {
      // ...thì thêm `Authorization` header vào request.
      // Backend sẽ sử dụng header này để xác thực người dùng.
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Trả về đối tượng `config` đã được sửa đổi để Axios tiếp tục gửi request đi.
    return config;
  },
  // Hàm này sẽ được thực thi nếu có lỗi xảy ra trong quá trình thiết lập request.
  (error) => {
    // Chuyển lỗi đi để các hàm gọi API có thể bắt và xử lý bằng `catch`.
    return Promise.reject(error);
  }
);

export default apiClient;
