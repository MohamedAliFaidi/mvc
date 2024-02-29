import { Link, useLocation } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import AuthContext from "../../contexts/auth.context";
import { useContext, useEffect, useState } from "react";
import { lazy, Suspense } from "react";
import LoadingFallback from "../layouts/Loading";
const Password = lazy(() => import("./register-pieces/Password"));
import Email from "./register-pieces/Email";

function Register() {
  const {
    handleRegister,
    RegisterSchema,
    passwordSchema,
    userEmailSchema,
    emailHandler,
  } = useContext(AuthContext);
  const [iscode, setcode] = useState(false);
  const location = useLocation();
  useEffect(() => {
    console.log(location.search.split("=")[1]);
  }, []);

  return (
    <div className="w-full p-6 m-auto  rounded-md shadow-xl lg:max-w-xl bg-gradient-to-r   from-purple-50 via-pink100 to-pink-50 duration-500 ">
      <h1 className="text-3xl font-semibold text-center text-black-700 uppercase">
        Sign up
      </h1>
      <Email schema={userEmailSchema} handler={emailHandler} />*{" "}
      
   
      <p className="mt-8 text-xs font-light text-center text-gray-700">
        {" "}
        Already registred?{" "}
        <Link
          to="/login"
          className="font-medium text-purple-600 hover:underline"
        >
          Login
        </Link>
      </p>
    </div>
  );
}

export default Register;
