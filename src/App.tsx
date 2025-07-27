import { BrowserRouter, Routes, Route } from "react-router-dom";
import TaskManagement from "./pages/TaskManagement";
import Authentication from "./pages/Authentication";
import ProtectedRoute from "./components/ProtectedRoute";
import SharedLayout from "./components/layout/SharedLayout";

/**
 * The main application component.
 * It sets up the application's routing using React Router.
 * @returns The rendered application routes.
 */
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Route */}
        <Route path="/authentication" element={<Authentication />} />

        {/* Protected Routes with Shared Layout */}
        <Route element={<ProtectedRoute />}>
          <Route element={<SharedLayout />}>
            <Route path="/" element={<TaskManagement />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
