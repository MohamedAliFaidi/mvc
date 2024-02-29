import { createContext, useEffect, useState } from "react";
import * as Yup from "yup";
import { useUser } from "../stores/userStore";
import { login, register, sendEmail ,verifyCode } from "../services/auth.service";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useUser((state) => [state.user, state.setUser]);
  const navigate = useNavigate();
  useEffect(() => {
    user.email && navigate("/");
  }, [user]);
  const [constants] = useState({
    EMAIL_REGEX:
      /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    PASSWORD_REGEX:
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$/,
  });

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .required("Required")
      .matches(constants.EMAIL_REGEX, "Invalid email"),
    password: Yup.string()
      .required("Please enter a password")
      .min(8, "Password must have at least 8 characters")
      .matches(
        constants.PASSWORD_REGEX,
        "Use upper and lower case characters, digits and special character"
      ),
  });
  const handleLogin = (email, password) => {
    login(email, password)
      .then((res) => {
        if (res && res.data?.user) {
          setUser(res.data.user);
          navigate("/");
          toast.success(`Welcome back ${res.data.user.email.split("@")[0]}`);
        }
      })
      .catch((error) => toast.error(error?.response?.data?.message));
  };
  const handleRegister = (email, password) => {
    register(email, password)
      .then((res) => {
        console.log(res);

        toast.success(`Welcome${""}`);
      })
      .catch((error) => toast.error(error?.response?.data?.message));
  };

  const emailHandler = (username, email) => {
    sendEmail(username, email)
      .then((res) => {
        console.log(res)
        toast.success("verification code sent to : "+email)
      })
      .catch((err) => console.log(err));
  };

  const RegisterSchema = LoginSchema;

  const userEmailSchema = Yup.object().shape({
    email: Yup.string()
      .required("Required")
      .matches(constants.EMAIL_REGEX, "Invalid email"),
    username: Yup.string()
      .required("Please enter a username")
      .min(6, "username must have at least 6 characters")
    
  });

  const passwordSchema = Yup.object().shape({
    password: Yup.string()
    .required("Please enter a password")
    .min(8, "Password must have at least 8 characters")
    .matches(
      constants.PASSWORD_REGEX,
      "Use upper and lower case characters, digits and special character"
    ),
    confirmPassword: Yup.string()
    .required("Please confirm your password")
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    
    
  });

  return (
    <AuthContext.Provider
      value={{
        LoginSchema,
        handleLogin,
        RegisterSchema,
        handleRegister,
        passwordSchema,
        userEmailSchema,
        emailHandler,
        verifyCode
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
