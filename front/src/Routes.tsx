import { BrowserRouter, Navigate, Route, Routes, Outlet } from "react-router-dom";
import Login from "./pages/Login/Login";
import { AuthProvider, useAuth } from "./Auth/AuthContext";
import Register from "./pages/Login/Register";

const AdminRoutes = () => {
  const { authenticated, user } = useAuth();

  return (
    authenticated && user && user.role == 'admin' ? <Outlet /> : <Navigate to="/login" />
  )
};

const AppRoutes = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<><Login /></>} />
          <Route path="/registro" element={<><Register/></>} />
          <Route element={<AdminRoutes />}>
            <Route path="/login" element={<><Login /></>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default AppRoutes;