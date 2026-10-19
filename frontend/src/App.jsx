import { Routes, Route } from "react-router-dom";
import Login from "./pages/Authentication/Login";
import AdminDashboard from "./pages/AdminDashboard";
import Users from "./pages/Users/Users"
import Create from "./pages/Users/Create";
import Edit from "./pages/Users/Edit";

function App() {
  return (
    <Routes>
      {/* Login */}
      <Route path="/" element={<Login />} />
      {/* Register */}
      <Route
        path="/register"
        element={<Login />}
      />
      {/* Dashboard */}
      <Route
        path="/AdminDashboard"
        element={<AdminDashboard />}
      />
      {/* Users List */}
      <Route
        path="/Users"
        element={<Users />}
      />
      {/* Create User */}
      <Route
        path="/Users/Create"
        element={<Create />}
      />
      {/* Edit User */}
      <Route
        path="/Users/Edit/:id"
        element={<Edit />}
      />
    </Routes>
  );
}

export default App;