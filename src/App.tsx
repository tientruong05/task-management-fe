import { BrowserRouter, Routes, Route } from "react-router-dom";
import TaskManagement from "./pages/TaskManagement";
import Authentication from "./pages/Authentication";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TaskManagement />} />
        <Route path="/Authentication" element={<Authentication />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
