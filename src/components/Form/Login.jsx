import React from "react";
import "./Login.css";
const Login = () => {
  return (
    <div className="login">
      <form className="login-form">

        <h2>Sign in</h2>

        <div className="email-box">
          <label className="label" htmlFor="email">
            Email
          </label>
          <input id="email" className="email" type="email" />
        </div>

        <div className="password-box">
          <label className="label" htmlFor="Password">
            Password
          </label>
          <input id="password" className="password" type="password" />
        </div>

        <button>Log in</button>
        <p>
          Don't have an account?<span>Sign up</span>
        </p>
      </form>
    </div>
  );
};

export default Login;
