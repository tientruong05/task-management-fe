import { useState } from "react";
import { login } from "../../services/authService";
import type { LoginPayload } from "../../types/auth";
import { useAuthStore } from "../../stores/auth.store";
import { useNavigate } from "react-router-dom";

/**
 * Component `LoginForm` hiển thị form đăng nhập và xử lý logic xác thực người dùng.
 * Nó quản lý trạng thái của form (dữ liệu nhập, loading, lỗi) và tương tác với service.
 * @returns {JSX.Element} Giao diện form đăng nhập.
 */
function LoginForm() {
  // `useNavigate` là một hook từ React Router, dùng để chuyển hướng người dùng sang trang khác.
  const navigate = useNavigate();

  // Lấy hàm `login` từ store của Zustand. Hàm này sẽ được gọi để cập nhật trạng thái global
  // sau khi đăng nhập thành công. `(state) => state.login` là một "selector".
  const authLogin = useAuthStore((state) => state.login);

  // --- State Management: Quản lý trạng thái của component ---
  // State để lưu trữ tên đăng nhập người dùng nhập vào.
  const [username, setUsername] = useState("");
  // State để lưu trữ mật khẩu người dùng nhập vào.
  const [password, setPassword] = useState("");
  // State để quản lý trạng thái loading. Khi đang gọi API, `isLoading` sẽ là `true`.
  const [isLoading, setIsLoading] = useState(false);
  // State để lưu trữ thông báo lỗi nếu có. Mặc định là null (không có lỗi).
  const [error, setError] = useState<string | null>(null);

  /**
   * Xử lý sự kiện submit của form đăng nhập.
   * Hàm này sẽ được gọi khi người dùng nhấn nút "Login".
   * @param {React.FormEvent<HTMLFormElement>} event - Sự kiện của form.
   */
  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    // Ngăn chặn hành vi mặc định của form là tải lại trang.
    event.preventDefault();

    // Bắt đầu quá trình đăng nhập: bật loading, xóa lỗi cũ.
    setIsLoading(true);
    setError(null);

    // Chuẩn bị dữ liệu (payload) để gửi đi.
    const payload: LoginPayload = { username, password };

    try {
      // Gọi API để đăng nhập với `payload`.
      const { user, token } = await login(payload);

      // Nếu thành công, cập nhật trạng thái xác thực global với thông tin user và token.
      authLogin(user, token);

      // Chuyển hướng người dùng đến trang chính hoặc trang quản lý công việc.
      navigate("/task-management");
    } catch (err: any) {
      // Nếu có lỗi xảy ra (ví dụ: sai username/password).
      // Lấy thông báo lỗi từ response của API, hoặc hiển thị một lỗi mặc định.
      setError(err.response?.data?.message || "Đã có lỗi xảy ra. Vui lòng thử lại.");
    } finally {
      // Khối `finally` luôn được thực thi dù có lỗi hay không.
      // Tắt trạng thái loading sau khi quá trình hoàn tất.
      setIsLoading(false);
    }
  };

  return (
    // Gán hàm `handleLogin` vào sự kiện `onSubmit` của form.
    <form onSubmit={handleLogin} className="space-y-4">
      {/* Hiển thị thông báo lỗi nếu `error` có giá trị (không phải null) */}
      {error && (
        <div className="rounded-md bg-red-100 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* --- Trường nhập Username --- */}
      <div>
        <label
          htmlFor="username"
          className="block text-sm font-medium text-gray-700"
        >
          Tên đăng nhập
        </label>
        <input
          type="text"
          id="username"
          value={username} // Gắn giá trị của input với state `username`.
          onChange={(e) => setUsername(e.target.value)} // Cập nhật state khi người dùng nhập.
          required // Bắt buộc phải nhập.
          disabled={isLoading} // Vô hiệu hóa input khi đang loading.
          placeholder="Nhập tên đăng nhập"
          className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-black"
        />
      </div>

      {/* --- Trường nhập Password --- */}
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Mật khẩu
        </label>
        <input
          type="password"
          id="password"
          value={password} // Gắn giá trị của input với state `password`.
          onChange={(e) => setPassword(e.target.value)} // Cập nhật state khi người dùng nhập.
          required // Bắt buộc phải nhập.
          disabled={isLoading} // Vô hiệu hóa input khi đang loading.
          placeholder="Nhập mật khẩu"
          className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-black"
        />
      </div>

      {/* --- Nút Submit --- */}
      <div>
        <button
          type="submit"
          disabled={isLoading} // Vô hiệu hóa nút khi đang loading.
          className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {/* Thay đổi text trên nút dựa vào trạng thái loading */}
          {isLoading ? "Đang xử lý..." : "Đăng nhập"}
        </button>
      </div>
    </form>
  );
}

export default LoginForm;
