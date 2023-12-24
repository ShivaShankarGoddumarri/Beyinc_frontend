import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';


const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);

  const handleEmailChange = (value) => {
    setEmail(value);
    setIsEmailValid(/^[a-z]+@gmail\.com$/.test(value));
  };

  const handleResetPassword = () => {
    alert('Password reset link sent successfully!');
  };

  return (
    <div className="form-container">
      <form className="form">
        <div className="center">
          <center><h2>Forgot Password</h2>
          <p>Enter your email to reset your password.</p></center>
        </div>
        <input
          type="text"
          value={email}
          placeholder="Email Address"
          onChange={(e) => handleEmailChange(e.target.value)}
        />
        <button
          className="Login-Button" 
          type="button"
          onClick={handleResetPassword}
          disabled={!isEmailValid}
        >
          Reset Password
        </button>
        <p>
          Remember your password? <RouterLink to="/login">Login</RouterLink>
        </p>
      </form>
    </div>
  );
};

export default ForgotPassword;
