import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

/**
 * Component `SharedLayout` định nghĩa cấu trúc bố cục chung cho các trang cần xác thực.
 * Nó bao gồm các thành phần giao diện được chia sẻ như `Sidebar` và khu vực hiển thị nội dung chính.
 * Việc này giúp tái sử dụng code và đảm bảo giao diện nhất quán trên nhiều trang.
 * @returns {JSX.Element} Giao diện layout chung.
 */
const SharedLayout = () => {
  return (
    // Sử dụng Flexbox để tạo layout. `flex` sẽ sắp xếp các phần tử con (Sidebar và main) nằm cạnh nhau.
    <div className="flex h-screen bg-gray-50">
      {/* `Sidebar` là component thanh điều hướng bên cạnh, chứa các liên kết chính của ứng dụng. */}
      <Sidebar />

      {/* `main` là khu vực chứa nội dung chính của từng trang. */}
      {/* `flex-1` giúp nó tự động chiếm toàn bộ không gian còn lại trong thẻ div cha. */}
      {/* `p-8` là padding, tạo khoảng trống xung quanh nội dung. */}
      <main className="flex-1 p-8 overflow-y-auto">
        {/* 
          `Outlet` một lần nữa đóng vai trò là "cửa ra" cho các route con.
          Nội dung của các trang như `TaskManagement` sẽ được render tại đây.
        */}
        <Outlet />
      </main>
    </div>
  );
};

export default SharedLayout;
