import { BrowserRouter, Routes, Route } from "react-router-dom";
import TaskManagement from "./pages/TaskManagement";
import Authentication from "./pages/Authentication";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/authentication" element={<Authentication />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<TaskManagement />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
