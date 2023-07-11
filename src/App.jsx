import Calc from "./pages/calc/Calc";

import Home from "./pages/home/Home";
import Code from "./pages/code/Code";
import Swlt from "./pages/swlt/Swlt";
import Lt from "./pages/lt/Lt";
import Nlt from "./pages/nlt/Nlt";
import Login from "./pages/login/Login";

import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext/AuthContext";
import Admin from "./pages/admin/Admin";

const App = () => {
  const { user } = useContext(AuthContext);
  const ProtectedRoute = ({ children }) => {
    if (!user) {
      return <Navigate to="/login" />;
    }

    return children;
  };
  return (
    <div className="app">
      <Routes>
        <Route index element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route
          path="/calc"
          element={
            <ProtectedRoute>
              <Calc />
            </ProtectedRoute>
          }
        />
        <Route
          path="/code"
          element={
            <ProtectedRoute>
              <Code />
            </ProtectedRoute>
          }
        />
        <Route
          path="/lt"
          element={
            <ProtectedRoute>
              <Lt />
            </ProtectedRoute>
          }
        />
        <Route
          path="/swlt"
          element={
            <ProtectedRoute>
              <Swlt />
            </ProtectedRoute>
          }
        />
        <Route
          path="/nlt"
          element={
            <ProtectedRoute>
              <Nlt />
            </ProtectedRoute>
          }
        />

        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default App;
