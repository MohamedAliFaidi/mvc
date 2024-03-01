import { AdminAuth } from "../layouts/routing/Admin";
import { lazy, Suspense } from "react";
const LoadingFallback = lazy(() => import("../layouts/Loading"));
const Admin = lazy(() => import("./Admin"));


function AdminIndex() {
  return (
    <AdminAuth>
      <Suspense fallback={<LoadingFallback />}>
        <Admin />
      </Suspense>
    </AdminAuth>
  );
}

export default AdminIndex;
