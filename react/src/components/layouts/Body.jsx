import LoadingFallback from "./Loading";
import { Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
// import { AuthProvider } from "../../contexts/auth.context";
import { AdminAuth } from "./routing/Admin";
import { Auth } from "./routing/User";

const Login = lazy(() => import("../auth/Login"));

const Register = lazy(() => import("../auth/Register"));

const Profile = lazy(() => import("../user/Profile"));

const Home = lazy(() => import("../home/Home"));

const Admin = lazy(() => import("../admin/Admin"));

function Body() {
  return (
    <div>
      <Routes>
        <Route
          path="/login"
          element={
              <Suspense fallback={<LoadingFallback />}>
                <Login />{" "}
              </Suspense>
          }
        />
        <Route
          path="/register"
          element={
              <Suspense fallback={<LoadingFallback />}>
                <Register />{" "}
              </Suspense>
          }
        />
        <Route
          path="/admin"
          element={
            <AdminAuth>
              <Suspense fallback={<LoadingFallback />}>
                <Admin />
              </Suspense>
            </AdminAuth>
          }
        />
        <Route
          path="/profile"
          element={
            <Auth>
              <Suspense fallback={<LoadingFallback />}>
                <Profile />
              </Suspense>
            </Auth>
          }
        />
        <Route
          path="/"
          element={
            <Suspense fallback={<LoadingFallback />}>
              <Home />
            </Suspense>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default Body;
