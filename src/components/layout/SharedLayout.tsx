import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

/**
 * A shared layout component that provides a consistent structure with a sidebar.
 * It renders the child routes within the main content area.
 * @returns A React element representing the shared layout.
 */
const SharedLayout = () => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default SharedLayout;
