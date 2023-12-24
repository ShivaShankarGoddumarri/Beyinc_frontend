import React, { useState, useEffect } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [loginType, setLoginType] = useState("email");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [otpVisible, setOtpVisible] = useState(false);
  const [isMobileValid, setIsMobileValid] = useState(false);
  const [mobileOtp, setMobileOtp] = useState("");

  const [isMobileOtpSent, setIsMobileOtpSent] = useState(false);
  const [mobileOtpMessage, setMobileOtpMessage] = useState("");

  const isEmailValid = /[a-z]+@gmail.com/.test(email);
  const isPasswordValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
  const isMobileOtpValid = isNaN(mobileOtp) === false && mobileOtp.length === 4;

  const isFormValid =
    (loginType === "email" && isEmailValid && isPasswordValid) ||
    (loginType === "mobile" && isMobileValid && isPasswordValid && isMobileOtpValid);

  const navigate = useNavigate();

  const handleLogin = () => {
    if (isFormValid) {
      navigate('/Home');
    } else {
      alert("Invalid login credentials");
    }
  };

  useEffect(() => {
    if (isMobileOtpSent) {
      setMobileOtpMessage("Mobile OTP sent successfully.");
      setTimeout(() => setMobileOtpMessage(""), 5000);
    }
  }, [isMobileOtpSent]);

  const handleLoginTypeChange = (type) => {
    setLoginType(type);
    setEmail("");
    setPassword("");
    setMobile("");
    setOtp("");
    setOtpVisible(false);
    setIsMobileValid(false);
    setMobileOtp(""); // Reset mobile OTP when login type changes
  };

  const handleGetOtp = () => {
    setOtpVisible(true);
  };

  const handleMobileChange = (value) => {
    setMobile(value);
    setIsMobileValid(/^[0-9]{10}$/.test(value));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (
      (loginType === "email" && isEmailValid && isPasswordValid) ||
      (loginType === "mobile" && isMobileValid && isPasswordValid && isMobileOtpValid)
    ) {
      // If using mobile login, setMobileOtp here (assuming you want to store the entered OTP)
      if (loginType === "mobile") {
        setMobileOtp(otp);
      }

      navigate('/Home');
    } else {
      alert("Invalid login credentials");
    }
  };

  return (
    <div className="form-container">
      <form className="form" onSubmit={handleFormSubmit}>
        <center>
          <h2>Login</h2>
          <p>Log in now to get full access.</p>
        </center>
        <div className="login-type-toggle">
          <span
            className={loginType === "email" ? "active" : ""}
            onClick={() => handleLoginTypeChange("email")}
          >
            Email
          </span>
          <span
            className={loginType === "mobile" ? "active" : ""}
            onClick={() => handleLoginTypeChange("mobile")}
          >
            Mobile
          </span>
        </div>
        {loginType === "email" ? (
          <>
            <input
              type="text"
              value={email}
              placeholder="Email Address"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </>
        ) : (
          <>
            <input
              type="text"
              value={mobile}
              placeholder="Mobile Number"
              onChange={(e) => handleMobileChange(e.target.value)}
            />
            {isMobileValid && !otpVisible && (
              <button type="button" className="otp_button" onClick={handleGetOtp}>
                Get OTP
              </button>
            )}
            {otpVisible && (
              <>
                <input
                  type="text"
                  value={otp}
                  placeholder="Enter OTP"
                  onChange={(e) => setOtp(e.target.value)}
                />
              </>
            )}
          </>
        )}
        <button type="submit" disabled={!isFormValid}>
          Login
        </button>
        <p>
          Don't have an account? <RouterLink to="/signup">Sign Up</RouterLink>
        </p>
        <p>
          <RouterLink to="/forgotpassword">Forgot Password?</RouterLink>
        </p>
      </form>
    </div>
  );
};

export default Login;
