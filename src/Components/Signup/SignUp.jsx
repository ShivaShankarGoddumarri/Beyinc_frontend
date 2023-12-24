import React, { useState, useEffect } from "react";
import { Link as RouterLink } from 'react-router-dom';
import './SignUp.css';

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [emailOtp, setEmailOtp] = useState("");
  const [mobile, setMobile] = useState("");
  const [mobileOtp, setMobileOtp] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const [isEmailOtpSent, setIsEmailOtpSent] = useState(false);
  const [isMobileOtpSent, setIsMobileOtpSent] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const [emailOtpMessage, setEmailOtpMessage] = useState("");
  const [mobileOtpMessage, setMobileOtpMessage] = useState("");

  // Validation Part
  const isEmailValid = /[a-z]+@gmail.com/.test(email);
  const isMobileValid = /^[0-9]{10}$/.test(mobile);
  const isNameValid = name !== "";
  const isEmailOtpValid = isNaN(emailOtp) === false && emailOtp.length === 4;
  const isMobileOtpValid = isNaN(mobileOtp) === false && mobileOtp.length === 4;
  const isPasswordValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);

  useEffect(() => {
    if (isEmailOtpSent) {
      setEmailOtpMessage("Email OTP sent successfully.");
      setTimeout(() => setEmailOtpMessage(""), 5000);
    }
  }, [isEmailOtpSent]);

  useEffect(() => {
    if (isMobileOtpSent) {
      setMobileOtpMessage("Mobile OTP sent successfully.");
      setTimeout(() => setMobileOtpMessage(""), 5000);
    }
  }, [isMobileOtpSent]);

  useEffect(() => {
    setIsFormSubmitted(false);
  }, [email, emailOtp, mobile, mobileOtp, name, password]);

  const sendEmailOtp = (e) => {
    e.preventDefault();
    setTimeout(() => {
      setIsEmailOtpSent(true);
    }, 1000);
  };

  const sendMobileOtp = (e) => {
    e.preventDefault();
    setTimeout(() => {
      setIsMobileOtpSent(true);
    }, 1000);
  };

  const isFormValid =
    isEmailValid &&
    isMobileValid &&
    isEmailOtpValid &&
    isMobileOtpValid &&
    isNameValid &&
    isPasswordValid;

  return (
    <div className="registration-form-container">
      {!isFormSubmitted && (
        <form>
          <center>
            <h2 style={{ marginTop: '40px', fontWeight: '400' }}>
              Get Started Now
            </h2>
            <p style={{ fontSize: '14px' }}>
              It's free to join and gain full access to thousands of exciting investment opportunities.
            </p>
          </center>

          <div className="input-container">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full Name*"
            />
          </div>

          <div className="input-container">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isEmailOtpSent}
              placeholder="Email Address*"
            />
            {emailOtpMessage && (
              <div className="success-message">{emailOtpMessage}</div>
            )}
            {!isEmailOtpSent && isEmailValid && (
              <button type="button" className="otp_button" onClick={sendEmailOtp}>
                Get OTP
              </button>
            )}
          </div>

          {isEmailOtpSent && (
            <>
              <div className="input-container">
                <input
                  type="text"
                  value={emailOtp}
                  onChange={(e) => setEmailOtp(e.target.value)}
                  placeholder="Enter Email OTP"
                />
              </div>
            </>
          )}

          <div className="input-container">
            <input
              type="text"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              placeholder="Mobile Number*"
            />
            {mobileOtpMessage && (
              <div className="success-message">{mobileOtpMessage}</div>
            )}
            {!isMobileOtpSent && isMobileValid && (
              <button type="button" className="otp_button" onClick={sendMobileOtp}>
                Get OTP
              </button>
            )}
          </div>

          {isMobileOtpSent && (
            <>
              <div className="input-container">
                <input
                  type="text"
                  value={mobileOtp}
                  onChange={(e) => setMobileOtp(e.target.value)}
                  placeholder="Enter Mobile OTP"
                />
              </div>
            </>
          )}

          <div className="input-container">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create Password*"
            />
          </div>

          <button  type="submit" disabled={!isFormValid}>
            Signup
          </button>
          <p>
            Already have an account? <RouterLink to="/login">Login</RouterLink>
          </p>
        </form>
      )}
    </div>
  );
};

export default SignUp;
