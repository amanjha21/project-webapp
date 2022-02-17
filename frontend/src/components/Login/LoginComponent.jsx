import { useState, useEffect } from "react";
import FormInput from "./FormInput";
import "./Login.css";
const Login = () => {
  const [showLogin, setShowLogin] = useState("fadeIn");
  const [showSignup, setShowSignup] = useState("fadeOut");
  const [showResetPassword, setShowResetPassword] = useState("fadeOut");
  const [showResetNotification, setShowResetNotification] = useState("fadeOut");

  const loginHandler = () => {
    console.log("login");
  };
  const signupHandler = () => {
    console.log("signup");
  };
  const forgotPasswordHandler = () => {
    console.log("forgot password");
    setShowResetNotification("fadeIn");
  };
  const logInFormInputs = [
    { name: "email", type: "text", placeholder: "Email Address" },
    { name: "password", type: "password", placeholder: "Password" },
  ];
  const signUpFormInputs = [
    { name: "username", type: "text", placeholder: "Username" },
    { name: "email", type: "text", placeholder: "Email Address" },
    { name: "password", type: "password", placeholder: "Password" },
    {
      name: "repeatPassword",
      type: "password",
      placeholder: "Repeat Password",
    },
  ];
  const forgotPasswordFormInputs = [
    { name: "email", type: "text", placeholder: "Email Address" },
  ];
  return (
    <>
      <div className="sign-panels">
        <div className={`login ${showLogin}`}>
          <div className="title">
            <span>Login</span>
            <p>Welcome back, please login to your account. </p>
          </div>
          <form action="">
            {logInFormInputs.map((input, i) => (
              <FormInput key={i} {...input} />
            ))}
            <a href="#" className="btn-signin" onClick={loginHandler}>
              Login
            </a>

            <a
              href="#"
              className="btn-reset btn-fade"
              onClick={() => {
                setShowLogin("fadeOut");
                setShowResetPassword("fadeIn");
              }}
            >
              Forgot password?
            </a>
            <a
              href="#"
              className="btn-member btn-fade"
              onClick={() => {
                setShowLogin("fadeOut");
                setShowSignup("fadeIn");
              }}
            >
              Not a member yet? Sign Up
            </a>
          </form>
        </div>
        <div className={`signup ${showSignup}`}>
          <div className="title">
            <span>Sign Up</span>
            <p>Create a new account.</p>
          </div>

          <form action="">
            {signUpFormInputs.map((input, i) => (
              <FormInput key={i} {...input} />
            ))}

            <a href="#" className="btn-signin" onClick={signupHandler}>
              Sign Up
            </a>
            <a
              href="#"
              className="btn-login btn-fade"
              onClick={() => {
                setShowLogin("fadeIn");
                setShowSignup("fadeOut");
              }}
            >
              Already have an account, Login
            </a>
          </form>
        </div>

        <div className={`recover-password ${showResetPassword}`}>
          <div className="title">
            <span>Recover Password</span>
            <p>Enter in the email associated with your account</p>
          </div>

          <form action="">
            {forgotPasswordFormInputs.map((input, i) => (
              <FormInput key={i} {...input} />
            ))}

            <a
              href="#"
              className="btn-signin btn-password"
              onClick={forgotPasswordHandler}
            >
              Submit Reset
            </a>
            <a
              href="#"
              className="btn-login btn-fade"
              onClick={() => {
                setShowLogin("fadeIn");
                setShowResetPassword("fadeOut");
                setShowResetNotification("fadeOut");
              }}
            >
              Cancel and go back to Login page
            </a>
          </form>
          <div className={`notification ${showResetNotification}`}>
            <p>
              An email containing information on how to reset your passworld was
              sent to your email. Please follow the instruction in that email to
              reset your password. Thanks!
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
