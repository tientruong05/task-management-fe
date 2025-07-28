import { BrowserRouter, Routes, Route } from "react-router-dom";
import TaskManagement from "./pages/TaskManagement";
import Authentication from "./pages/Authentication";
import ProtectedRoute from "./components/ProtectedRoute";
import SharedLayout from "./components/layout/SharedLayout";

/**
 * @file App.tsx
 * @description Component "đầu não" của ứng dụng, chịu trách nhiệm định nghĩa toàn bộ cấu trúc định tuyến (routing).
 */

/**
 * Component `App` định nghĩa cấu trúc định tuyến cho toàn bộ trang web sử dụng React Router v6.
 * @returns {JSX.Element} Các routes của ứng dụng đã được render.
 */
function App() {
  return (
    // `BrowserRouter` kích hoạt tính năng routing dựa trên URL của trình duyệt.
    <BrowserRouter>
      {/* `Routes` là nơi chứa tất cả các định nghĩa `Route` (tuyến đường). */}
      <Routes>
        {/* --- Route Công Khai (Public Route) --- */}
        {/* Route này có thể được truy cập mà không cần đăng nhập. */}
        <Route path="/authentication" element={<Authentication />} />

        {/* --- Cụm Route Được Bảo Vệ (Protected Routes) --- */}
        {/* 
         * Component `ProtectedRoute` hoạt động như một "cổng soát vé".
         * Nó kiểm tra xem người dùng đã đăng nhập chưa. Nếu chưa, nó sẽ chuyển hướng họ đi.
         * Nếu rồi, nó sẽ render các route con (nested routes) bên trong nó.
         */}
        <Route element={<ProtectedRoute />}>
          {/* 
           * **Mentor's Note: Layout Routes & Nested Routes**
           * Route này sử dụng `SharedLayout` làm layout chung.
           * Bất kỳ route con nào được định nghĩa bên trong nó sẽ được render tại vị trí
           * của component `<Outlet />` trong file `SharedLayout.tsx`.
           * Đây là một pattern cực kỳ mạnh mẽ để tái sử dụng layout (sidebar, navbar, footer...).
           */}
          <Route path="/" element={<SharedLayout />}>
            {/* 
             * **Mentor's Note: Index Route**
             * `index` route là route mặc định cho một layout.
             * Khi người dùng truy cập vào path của layout cha (ở đây là "/"), 
             * component của `index` route (`TaskManagement`) sẽ được render.
             * Điều này giúp trang chủ của ứng dụng (sau khi đăng nhập) có nội dung ngay lập tức.
             */}
            <Route index element={<TaskManagement />} />
            <Route path="task-management" element={<TaskManagement />} />
            {/* Có thể thêm các route được bảo vệ khác ở đây, ví dụ: <Route path="profile" element={<Profile />} /> */}
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
