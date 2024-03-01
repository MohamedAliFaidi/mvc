import { Auth } from "../layouts/routing/User";
import { lazy, Suspense } from "react";
const LoadingFallback = lazy(() => import("../layouts/Loading"));
const Profile = lazy(() => import("./Profile"));
function ProfileIndex() {
  return (
    <Auth>
      <Suspense fallback={<LoadingFallback />}>
        <Profile />
      </Suspense>
    </Auth>
  );
}

export default ProfileIndex;
