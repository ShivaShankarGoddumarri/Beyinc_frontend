import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");

  const isEmailValid = /[a-z]+@gmail.com/.test(email);
  const isMobileValid = /^[0-9]{10}$/.test(mobile);
  const isPasswordValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;

  const handleLogin = () => {
 
    if ((isEmailValid || isMobileValid) && isPasswordValid) {
      alert("Login successful!");
    } else {
      alert("Invalid login credentials");
    }
  };

  return (
    <div className="form-container">
      <form className="form">
        <center>
          <h2>Login</h2>
          <p>Log in now to get full access.</p>
        </center>
        <input
          type="text"
          value={email}
          placeholder="Email Address or Mobile Number"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="Login-Button" type="button" onClick={handleLogin}>
          Login
        </button>
        <p>
          Don't have an account? <RouterLink to="/signup">Sign Up</RouterLink>
        </p>
      </form>
    </div>
  );
};

export default Login;
