// Thay thế `useNavigate` bằng `Link` và `useNavigate` để có cả chức năng điều hướng và liên kết.
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../stores/auth.store";

/**
 * Component `Sidebar` hiển thị thanh điều hướng bên cạnh của ứng dụng.
 * Bao gồm logo, thông tin người dùng, các liên kết điều hướng và nút đăng xuất.
 * @returns {JSX.Element} Giao diện thanh sidebar.
 */
const Sidebar = () => {
  // Lấy thông tin người dùng và hàm `logout` từ store.
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  /**
   * Xử lý logic đăng xuất.
   * Gọi hàm `logout` từ store để xóa thông tin xác thực (token, user details)
   * và sau đó chuyển hướng người dùng về trang đăng nhập.
   */
  const handleLogout = () => {
    logout();
    navigate("/authentication");
  };

  return (
    <aside className="flex h-screen w-64 flex-col bg-gray-800 text-white ">
      {/* Phần Logo hoặc Tiêu đề của Sidebar */}
      <div className="border-b border-gray-700 p-4 text-center text-lg font-bold">
        Quản Lý Công Việc
      </div>

      {/* Lời chào mừng người dùng */}
      {/* Sử dụng optional chaining `?.` để tránh lỗi nếu `user` chưa kịp tải */}
      <div className="border-b border-gray-700 p-4">
        <h2 className="text-xl font-semibold">Chào, {user?.username}</h2>
      </div>

      {/* Phần các liên kết điều hướng chính */}
      <nav className="flex-1 space-y-2 px-2 py-4">
        {/* 
          **Mentor's Note:**
          Sử dụng component `<Link>` từ `react-router-dom` thay vì thẻ `<a>`.
          - `<Link to="...">` giúp chuyển trang mà không cần tải lại toàn bộ trang (SPA behavior).
          - Thẻ `<a>` sẽ gây ra full-page reload, làm mất trạng thái của ứng dụng.
          - Trong tương lai, có thể nâng cấp lên `<NavLink>` để tự động thêm class 'active' cho link đang được chọn.
        */}
        <Link
          to="/task-management"
          className="block rounded-md px-4 py-2 hover:bg-gray-700"
        >
          Danh sách công việc
        </Link>
        {/* Các link khác có thể thêm vào đây */}
      </nav>

      {/* Phần chân Sidebar, chứa nút Đăng xuất */}
      <div className="border-t border-gray-700 p-4">
        <button
          onClick={handleLogout}
          className="w-full rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-800"
        >
          Đăng xuất
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
