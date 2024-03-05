import LoadingFallback from "./Loading";
import { Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";

const Login = lazy(() => import("../auth/Login"));
const Register = lazy(() => import("../auth/Register"));
const Profile = lazy(() => import("../user/ProfileIndex"));
const Home = lazy(() => import("../home/Home"));
const Admin = lazy(() => import("../admin/AdminIndex"));
const Intro = lazy(() => import("../policy/Intro"));
const PrivacyPolicy = lazy(() => import("../policy/PrivacyPolicy"));


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
            <Suspense fallback={<LoadingFallback />}>
              <Admin />
            </Suspense>
          }
        />
        <Route
          path="/profile"
          element={
            <Suspense fallback={<LoadingFallback />}>
              <Profile />
            </Suspense>
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
              <Route
          path="/privacy-policy"
          element={
            <Suspense fallback={<LoadingFallback />}>
              <PrivacyPolicy/>
            </Suspense>
          }
        />
              <Route
          path="/intro"
          element={
            <Suspense fallback={<LoadingFallback />}>
              <Intro/>
            </Suspense>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default Body;
