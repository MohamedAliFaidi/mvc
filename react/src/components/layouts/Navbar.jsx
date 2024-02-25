import { Link } from "react-router-dom";
import { useUser } from "../../stores/userStore";
import { logout } from "../../services/auth.service";
import { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { IoLogIn, IoLogOut } from "react-icons/io5";
import { MdAccountCircle } from "react-icons/md";

export default function StickyNavbar() {
  const [user, setUser] = useUser((state) => [state.user, state.setUser]);
  const [nav, setNav] = useState(false);

  const [openAvatarDropdown, setOpenAvatarDropdown] = useState(false);

  const toggleAvatarDropdown = () => {
    setOpenAvatarDropdown(!openAvatarDropdown);
  };

  // Toggle function to handle the navbar's display
  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <div className="nav-bg flex justify-between items-center h-24 max-w-[1240px] mx-auto px-4 text-black">
      {/* Logo */}
      <Link
        to="/"
        className="w-full text-3xl font-bold text-black cursor-pointer"
      >
        DVLYX
      </Link>
      {/* Desktop Navigation */}
      <ul className="hidden md:flex">
        {user._id && (
          <li
            className="p-4  transform transition duration-500 
            hover:scale-110 rounded-xl m-2 cursor-pointer duration-300 hover:text-black "
          >
            <div
              onClick={toggleAvatarDropdown}
              className="relative transition-all duration-500"
            >
              <img
                className=" w-[80px] rounded-full"
                src={!user?.avatar?.url ? "/vite.svg" : user?.avatar?.url}
                alt="avatar"
              />
              <div
                className={`absolute ${
                  openAvatarDropdown ? "block" : "hidden"
                } bg-purple-900 text-white 0 rounded shadow-md  space-y-2 w-[200px]`}
              >
                <div className="p-4 flex flex-col w-100 ">
                  <Link to="/profile">
                    {" "}
                    <MdAccountCircle name="profile" />
                    Profile
                  </Link>
                  <hr className="h-px  bg-gray-200 border-0 dark:bg-gray-700" />

                  {/* <Link to="/dashboard">Dashboard</Link> */}
                  {/* <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"/> */}

                  <Link
                    name="logout"
                    variant="gradient"
                    size="sm"
                    className="bg-auto"
                    onClick={() => {
                      logout();
                      setUser({});
                    }}
                  >
                    <IoLogOut />
                    Logout
                  </Link>
                </div>
              </div>
            </div>
          </li>
        )}
        {!user._id && (
          <li
            className="p-4   transform transition duration-500 
            hover:scale-150 rounded-xl m-2 cursor-pointer duration-300 hover:text-black "
          >
            <Link
              name="login"
              className="btn"
              style={{ float: "right" }}
              to="/login"
            >
              <span>
                <IoLogIn /> Login
              </span>
            </Link>
          </li>
        )}
      </ul>

      {/* Mobile Navigation Icon */}
      <div onClick={handleNav} className="md:hidden nav-bg">
        {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </div>

      {/* Mobile Navigation Menu */}
      <ul
        className={
          nav
            ? "fixed md:hidden left-0 top-0 w-[60%] h-full bg-gradient-to-r from-purple-100 via-purple-300 to-pink-200 duration-500 z-50"
            : "ease-in-out w-[100%] duration-500 fixed top-0 bottom-0 left-[-100%] nav-bg"
        }
      >
        {/* Mobile Logo */}
        {/* Mobile Navigation Items */}
        {!user._id && (
          <li
            className="ml-4 p-4  rounded-xl  duration-300 transform transition duration-500 
            hover:scale-110 cursor-pointer  w-[100%]"
          >
            {" "}
            <div style={{ display: "flex" }}>
              {" "}
              <Link
                name="login"
                className="btn"
                style={{ float: "left" }}
                to="/login"
              >
                <IoLogIn /> Login
                {}
              </Link>
            </div>
          </li>
        )}
        {user._id && (
          <li
            className="ml-4 p-4   rounded-xl    w-[100%]"
          >
            <div
              onClick={toggleAvatarDropdown}
              className="relative  transition-all duration-500"
            >
              <img
                className=" w-[60px] rounded-full duration-300 transform transition duration-500 
                hover:scale-110 cursor-pointer"
                src={!user?.avatar?.url ? "/vite.svg" : user?.avatar?.url}
                alt="avatar"
              />{" "}
              <div
                className={`absolute ${
                  openAvatarDropdown ? "block" : "hidden"
                } bg-slate-300 rounded shadow-md mt-2 space-y-2`}
              >
                <div className="p-4 flex flex-col bg-purple-900 text-white 0 rounded shadow-md  space-y-2 w-[200px] ">
                  <Link
                      onClick={() => {
                        handleNav();
                        toggleAvatarDropdown();
                      }}
                    to="/profile"
                  >
                    <MdAccountCircle />
                    Profile
                  </Link>
                  <hr className="h-px  bg-gray-200 border-0 dark:bg-gray-700" />

                  {/* <Link to="/dashboard">Dashboard</Link> */}
                  <Link
                    name="logout"
                    variant="gradient"
                    size="sm"
                    className="bg-auto"
                    onClick={() => {
                      logout();
                      setUser({});
                    }}
                  >
                    <IoLogOut /> Logout
                  </Link>
                </div>
              </div>
            </div>
          </li>
        )}
      </ul>
    </div>
  );
}
