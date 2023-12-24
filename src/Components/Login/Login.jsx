import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

const Login = () => {
  const [emailOrMobile, setEmailOrMobile] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Perform login logic here
    // You can use emailOrMobile and password for authentication
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form className="form">
        <label>Email or Mobile:</label>
        <input
          type="text"
          value={emailOrMobile}
          onChange={(e) => setEmailOrMobile(e.target.value)}
        />

        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

        <button type="button" onClick={handleLogin}>
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
