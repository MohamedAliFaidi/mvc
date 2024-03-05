import { Link } from "react-router-dom";
import { useUser } from "../../stores/userStore";

export default function StickyNavbar() {
  const [user] = useUser((state) => [state.user]);
 console.log(user)
  return (
    <header className=" py-2 border-b">
      <div className="container max-w-screen-xl mx-auto px-4">
        <div className="flex flex-wrap items-center">
          <div className="flex-shrink-0 mr-5">
            <Link to="/">
              <img
                src="vite.svg"
                style={{ height: "50px", width: "60px" }}
                height="40"
                width="120"
                alt="logo"
              />
            </Link>
          </div>
          {/* <Search /> */}

          <div className="flex items-center space-x-2 ml-auto">
            {!user._id && (
              <Link
                to="/login"
                className="px-3 py-2 inline-block text-center text-gray-700 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 hover:border-gray-300"
              >
                <div
                  style={{
                    display: "flex",
                  }}
                >
                  <span className=" lg:inline ml-1">Sign in </span>
                </div>
              </Link>
            )}
            {user._id && (
              <Link to="/profile">
                <div className="flex items-center mb-4 space-x-3 mt-4 cursor-pointer">
                  <img
                    alt="avatar"
                    className="w-10 h-10 rounded-full"
                    src={
                      user?.avatar?.url ||
                      "/avatar.jpg"
                    }
                  />
                  <div className="space-y-1 font-medium">
                    <p>
                      {user.username}
                      <time className="block text-sm text-gray-500 dark:text-gray-400">
                        {user.email}
                      </time>
                    </p>
                  </div>
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
