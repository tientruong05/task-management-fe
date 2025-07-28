import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../stores/auth.store";

/**
 * @file ProtectedRoute.tsx
 * @description Component "cổng soát vé" cho các route cần xác thực người dùng.
 */

/**
 * Component `ProtectedRoute` hoạt động như một "người gác cổng" (gatekeeper) cho các route cần xác thực.
 * Nó kiểm tra xem người dùng đã đăng nhập hay chưa dựa vào trạng thái trong `useAuthStore`.
 * @returns {JSX.Element} Trả về component `Navigate` để chuyển hướng nếu chưa đăng nhập, 
 * hoặc `Outlet` để render các route con (nested routes) nếu đã đăng nhập.
 */
const ProtectedRoute = () => {
  // Lấy trạng thái `isAuthenticated` từ Zustand store. Đây là nguồn chân lý (single source of truth)
  // để biết người dùng đã đăng nhập hay chưa.
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  // --- Logic kiểm tra xác thực ---
  if (!isAuthenticated) {
    // **Mentor's Note: Chuyển hướng để bảo vệ Route**
    // Nếu người dùng chưa đăng nhập, chúng ta sử dụng component `<Navigate>` của React Router
    // để thực hiện chuyển hướng phía client.
    // - `to="/authentication"`: Đích đến là trang đăng nhập.
    // - `replace={true}`: Đây là một lựa chọn rất quan trọng về UX. Nó thay thế trang hiện tại
    //   (trang đang được bảo vệ) trong lịch sử trình duyệt, thay vì đẩy một trang mới vào.
    //   => Điều này ngăn người dùng nhấn nút "Back" và quay lại trang được bảo vệ một cách vô nghĩa.
    return <Navigate to="/authentication" replace />;
  }

  // **Mentor's Note: Cửa ngõ cho các Route con**
  // Nếu người dùng đã đăng nhập, chúng ta render component `<Outlet />`.
  // `<Outlet />` chính là "cửa ngõ" hay "điểm hẹn" (rendezvous point).
  // Nó báo cho React Router biết: "Hãy render bất kỳ route con nào được định nghĩa bên trong tôi
  // trong file App.tsx tại đây".
  return <Outlet />;
};

export default ProtectedRoute;
