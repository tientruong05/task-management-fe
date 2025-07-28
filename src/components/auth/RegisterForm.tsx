import { useState } from "react";
import { register } from "../../services/authService";
import type { RegisterPayload } from "../../types/auth";

/**
 * Component `RegisterForm` hiển thị form đăng ký và xử lý logic tạo tài khoản mới.
 * Quản lý trạng thái form, loading, lỗi và thông báo thành công.
 * @returns {JSX.Element} Giao diện form đăng ký.
 */
function RegisterForm() {
  // --- State Management: Quản lý trạng thái của component ---
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // State để hiển thị thông báo khi đăng ký thành công.
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  /**
   * Xử lý sự kiện submit của form đăng ký.
   * @param {React.FormEvent<HTMLFormElement>} event - Sự kiện của form.
   */
  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    // Ngăn chặn hành vi mặc định của form là tải lại trang.
    event.preventDefault();

    // Chuẩn bị cho việc gọi API: bật loading, xóa lỗi và thông báo cũ.
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    // Chuẩn bị dữ liệu (payload) để gửi đi.
    const payload: RegisterPayload = { username, password, email };

    try {
      // Gọi API để đăng ký tài khoản với `payload`.
      const data = await register(payload);
      // Nếu thành công, hiển thị thông báo thành công từ API hoặc một thông báo mặc định.
      setSuccessMessage(
        data.message || "Đăng ký thành công! Vui lòng chuyển sang tab đăng nhập."
      );
      // Xóa trống các trường input sau khi đăng ký thành công.
      setUsername("");
      setPassword("");
      setEmail("");
    } catch (err: any) {
      // Nếu có lỗi (ví dụ: username/email đã tồn tại).
      // Lấy thông báo lỗi từ response của API hoặc hiển thị lỗi mặc định.
      setError(err.response?.data?.message || "Đã có lỗi xảy ra. Vui lòng thử lại.");
    } finally {
      // Luôn tắt trạng thái loading sau khi quá trình hoàn tất.
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleRegister} className="space-y-4">
      {/* Hiển thị thông báo lỗi nếu `error` có giá trị */}
      {error && (
        <div className="rounded-md bg-red-100 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Hiển thị thông báo thành công nếu `successMessage` có giá trị */}
      {successMessage && (
        <div className="rounded-md bg-green-100 p-3 text-sm text-green-700">
          {successMessage}
        </div>
      )}

      {/* --- Trường nhập Email --- */}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isLoading}
          placeholder="Nhập địa chỉ email"
          className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-black"
        />
      </div>

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
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          disabled={isLoading}
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
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={isLoading}
          placeholder="Nhập mật khẩu"
          className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-black"
        />
      </div>

      {/* --- Nút Submit --- */}
      <div>
        <button
          type="submit"
          disabled={isLoading}
          className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Đang xử lý..." : "Đăng ký"}
        </button>
      </div>
    </form>
  );
}

export default RegisterForm;
