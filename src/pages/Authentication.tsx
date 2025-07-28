import { useState } from "react";
import LoginForm from "../components/auth/LoginForm";
import RegisterForm from "../components/auth/RegisterForm";

// Định nghĩa kiểu (type) `AuthMode` để giới hạn giá trị của state `mode`.
// Biến `mode` chỉ có thể nhận một trong hai giá trị: 'login' hoặc 'register'.
type AuthMode = "login" | "register";

/**
 * Trang Xác thực chính của ứng dụng.
 * Cho phép người dùng chuyển đổi giữa form Đăng nhập và Đăng ký.
 * @returns {JSX.Element} Giao diện trang xác thực.
 */
function Authentication() {
  // Sử dụng `useState` để quản lý trạng thái của form.
  // `mode` là biến chứa trạng thái hiện tại ('login' hoặc 'register').
  // `setMode` là hàm dùng để cập nhật giá trị cho `mode`.
  // Giá trị khởi tạo là 'login'.
  const [mode, setMode] = useState<AuthMode>("login");

  // Biến boolean này giúp code dễ đọc hơn, dùng để kiểm tra có phải đang ở chế độ login không.
  const isLoginMode = mode === "login";

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <h1 className="mb-6 text-center text-3xl font-bold">
          {/* Hiển thị tiêu đề dựa trên giá trị của state `mode` */}
          {isLoginMode ? "Đăng Nhập" : "Tạo Tài Khoản"}
        </h1>

        {/* Dựa vào `isLoginMode` để quyết định hiển thị form nào */}
        {/* Nếu `isLoginMode` là true, hiển thị component LoginForm */}
        {isLoginMode && <LoginForm />}

        {/* Nếu `isLoginMode` là false, hiển thị component RegisterForm */}
        {!isLoginMode && <RegisterForm />}

        <div className="mt-6 text-center">
          <button
            // Khi người dùng click vào nút này, gọi hàm `setMode` để thay đổi trạng thái.
            // Nếu đang là 'login', chuyển thành 'register'.
            // Nếu đang là 'register', chuyển thành 'login'.
            onClick={() => setMode(isLoginMode ? "register" : "login")}
            className="cursor-pointer text-sm text-blue-600 hover:underline"
          >
            {/* Hiển thị văn bản cho nút dựa trên giá trị của state `mode` */}
            {isLoginMode
              ? "Chưa có tài khoản? Đăng ký"
              : "Đã có tài khoản? Đăng nhập"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Authentication;
