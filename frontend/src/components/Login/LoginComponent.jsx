import { useState } from "react";
import FormInput from "./FormInput";
import "./Login.css";
const Login = () => {
  const [showLogin, setShowLogin] = useState("fadeIn");
  const [showSignup, setShowSignup] = useState("fadeOut");
  const [showResetPassword, setShowResetPassword] = useState("fadeOut");
  const [showResetNotification, setShowResetNotification] = useState("fadeOut");
  const getFormData = (e) => {
    const data = new FormData(e.target);
    return Object.fromEntries(data.entries());
  };
  const loginHandler = (e) => {
    e.preventDefault();
    const data = getFormData(e);
    console.log("login", data);
    e.target.reset();
  };
  const signupHandler = (e) => {
    e.preventDefault();
    const data = getFormData(e);
    console.log("signup", data);
    setShowResetNotification("fadeIn");
  };
  const forgotPasswordHandler = (e) => {
    e.preventDefault();
    const data = getFormData(e);
    console.log("forgot password", data);
    setShowResetNotification("fadeIn");
  };
  const [formInputs, setFormInputs] = useState({
    username: "",
    email: "",
    password: "",
    repeatPassword: "",
  });

  const formInputChangeHandler = (e) => {
    setFormInputs((prevInputs) => ({
      ...prevInputs,
      [e.target.name]: e.target.value,
    }));
  };
  const logInFormInputs = [
    {
      name: "email",
      type: "email",
      placeholder: "Email Address",
      errorMessage: "Email Address must be a valid email",
    },
    {
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage:
        "Password must be 8 to 16 digits and must contain atleast one capital letter, number and special character",
      pattern: "^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$",
    },
  ];
  const signUpFormInputs = [
    {
      name: "username",
      type: "text",
      placeholder: "Username",
      errorMessage: "Username must be atleast 3 characters",
      pattern: "[A-Za-z ]{3,100}",
    },
    {
      name: "email",
      type: "email",
      placeholder: "Email Address",
      errorMessage: "Email Address must be a valid email",
    },
    {
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage:
        "Password must be 8 to 16 digits and must contain atleast one capital letter, number and special character",
      pattern: "^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$",
    },
    {
      name: "repeatPassword",
      type: "password",
      placeholder: "Repeat Password",
      errorMessage: "Both passwords must be same",
      pattern: formInputs.password,
    },
  ];
  const forgotPasswordFormInputs = [
    {
      name: "email",
      type: "email",
      placeholder: "Email Address",
      errorMessage: "Email Address must be a valid email",
    },
  ];
  return (
    <>
      <div className="sign-panels">
        <div className={`login ${showLogin}`}>
          <div className="title">
            <span>Login</span>
            <p>Welcome back, please login to your account. </p>
          </div>
          <form onSubmit={loginHandler}>
            {logInFormInputs.map((input, i) => (
              <FormInput key={i} {...input} onChange={formInputChangeHandler} />
            ))}
            <button className="btn-signin">Login</button>

            <div
              className="btn-reset btn-fade"
              onClick={() => {
                setShowLogin("fadeOut");
                setShowResetNotification("fadeOut");
                setShowResetPassword("fadeIn");
              }}
            >
              Forgot password?
            </div>
            <div
              className="btn-member btn-fade"
              onClick={() => {
                setShowLogin("fadeOut");
                setShowSignup("fadeIn");
              }}
            >
              Not a member yet? Sign Up
            </div>
          </form>
        </div>
        <div className={`signup ${showSignup}`}>
          <div className="title">
            <span>Sign Up</span>
            <p>Create a new account.</p>
          </div>
          <div className={`notification ${showResetNotification}`}>
            <p>
              A confirmation email has been sent to your email address. Please
              follow the instruction in that email to complete sign up process.
              Thanks!
            </p>
          </div>
          <form onSubmit={signupHandler}>
            {signUpFormInputs.map((input, i) => (
              <FormInput key={i} {...input} onChange={formInputChangeHandler} />
            ))}

            <button className="btn-signin">Sign Up</button>
            <div
              className="btn-login btn-fade"
              onClick={() => {
                setShowLogin("fadeIn");
                setShowSignup("fadeOut");
              }}
            >
              Already have an account, Login
            </div>
          </form>
        </div>

        <div className={`recover-password ${showResetPassword}`}>
          <div className="title">
            <span>Recover Password</span>
            <p>Enter in the email associated with your account</p>
          </div>

          <form onSubmit={forgotPasswordHandler}>
            {forgotPasswordFormInputs.map((input, i) => (
              <FormInput key={i} {...input} onChange={formInputChangeHandler} />
            ))}

            <button className="btn-signin btn-password">Submit Reset</button>
            <div
              className="btn-login btn-fade"
              onClick={() => {
                setShowLogin("fadeIn");
                setShowResetPassword("fadeOut");
                setShowResetNotification("fadeOut");
              }}
            >
              Cancel and go back to Login page
            </div>
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
