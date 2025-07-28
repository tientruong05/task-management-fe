import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

/**
 * @file auth.store.ts
 * @description Store quản lý trạng thái xác thực người dùng bằng Zustand.
 * Bao gồm thông tin người dùng, token, và các hành động (actions) như login, logout.
 * Sử dụng middleware `persist` để lưu trạng thái vào localStorage, giúp người dùng không bị đăng xuất khi tải lại trang.
 */

/**
 * Định nghĩa cấu trúc (shape) của đối tượng User.
 * Đây là dữ liệu về người dùng được trả về từ API sau khi đăng nhập thành công.
 */
export interface User {
  id: number;
  username: string;
  email: string;
}

/**
 * Định nghĩa cấu trúc của state và các actions trong store xác thực.
 * Việc có một interface rõ ràng giúp code dễ đọc và đảm bảo type-safety.
 */
interface AuthState {
  /** Thông tin người dùng đang đăng nhập, hoặc `null` nếu chưa đăng nhập. */
  user: User | null;
  /** JSON Web Token (JWT) dùng để xác thực các yêu cầu API, hoặc `null`. */
  token: string | null;
  /** Cờ boolean cho biết người dùng đã đăng nhập hay chưa. */
  isAuthenticated: boolean;

  /**
   * Action: Thực hiện đăng nhập.
   * Cập nhật state với thông tin người dùng và token mới.
   * @param userData - Dữ liệu người dùng từ API.
   * @param token - Token xác thực từ API.
   */
  login: (userData: User, token: string) => void;

  /**
   * Action: Thực hiện đăng xuất.
   * Xóa thông tin người dùng và token khỏi state.
   */
  logout: () => void;
}

/**
 * Tạo store `useAuthStore` bằng `create` của Zustand.
 * Store này sẽ quản lý toàn bộ trạng thái liên quan đến xác thực.
 * 
 * **Mentor's Note:**
 * `create<AuthState>()(...)` là cách khai báo store với TypeScript, đảm bảo store tuân thủ cấu trúc của `AuthState`.
 * 
 * `persist(...)` là một middleware. Middleware trong Zustand cho phép chúng ta "bọc" store lại để thêm các chức năng đặc biệt.
 * Ở đây, `persist` sẽ tự động lưu state của store vào một nơi lưu trữ (storage) và lấy lại khi khởi tạo.
 */
export const useAuthStore = create<AuthState>()(
  persist(
    // Hàm `(set) => ({...})` định nghĩa state ban đầu và các actions của store.
    // `set` là hàm do Zustand cung cấp để cập nhật state. Việc cập nhật là bất biến (immutable).
    (set) => ({
      // State ban đầu khi người dùng chưa đăng nhập.
      user: null,
      token: null,
      isAuthenticated: false,

      // Action `login`: Khi được gọi, nó sẽ dùng `set` để cập nhật state.
      login: (userData, token) =>
        set({ user: userData, token, isAuthenticated: true }),

      // Action `logout`: Reset state về giá trị ban đầu.
      logout: () => set({ user: null, token: null, isAuthenticated: false }),
    }),
    {
      // Cấu hình cho middleware `persist`.
      name: "auth-storage", // Tên của key sẽ được lưu trong localStorage.
      // Chỉ định `localStorage` làm nơi lưu trữ. `createJSONStorage` giúp tự động serialize/deserialize state thành chuỗi JSON.
      storage: createJSONStorage(() => localStorage),
    }
  )
);
