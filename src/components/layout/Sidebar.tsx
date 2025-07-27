import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../stores/auth.store";

/**
 * Renders the application's sidebar, which includes navigation links,
 * user information, and a logout button.
 * @returns A React element representing the sidebar.
 */
const Sidebar = () => {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const navigate = useNavigate();

    /**
   * Handles the user logout process.
   * It calls the logout function from the auth store and navigates the user
   * to the authentication page.
   */
  const handleLogout = () => {
    logout();
    navigate("/authentication");
  };

  return (
    <aside className="flex h-screen w-64 flex-col bg-gray-800 text-white ">
      {/* Logo/Heder of Sidebar */}
      <div className="border-b border-y-gray-700 p-4 text-center text-lg font-bold">
        Task Manager
      </div>

      {/* Hello user */}
      <h2 className="text-xl font-semibold p-5">Welcome, {user?.username}</h2>
      {/* Naviagion link */}
      <nav className="flex-1 space-y-2 px-2 py-4">
        <a href="#" className="block rounded-md px-4 py-2 hover:bg-gray-700">
          Tasks
        </a>
        <a href="#" className="block rounded-md px-4 py-2 hover:bg-gray-700">
          Tasks
        </a>
        <a href="#" className="block rounded-md px-4 py-2 hover:bg-gray-700">
          Tasks
        </a>
      </nav>

      <div className="border-t border-b-gray-700 p-4">
        <button onClick={handleLogout} className="bg-red-500 w-full">
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
