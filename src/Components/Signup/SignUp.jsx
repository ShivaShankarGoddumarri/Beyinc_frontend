import React, { useState, useEffect, useRef } from "react";
import {  Link as RouterLink } from 'react-router-dom';
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
 

  const emailInputRef = useRef(null);

  // Validation Part
  const isEmailValid = /[a-z]+@gmail.com/.test(email);
  const isMobileValid = /^[0-9]{10}$/.test(mobile);
  const isNameValid = name !== "";
  const isEmailOtpValid = isNaN(emailOtp) === false && emailOtp.length === 4;
  const isMobileOtpValid = isNaN(mobileOtp) === false && mobileOtp.length === 4;
  const isPasswordValid = password.length >= 6;

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

  useEffect(() => {
    emailInputRef.current.focus();
  }, []);

  const sendEmailOtp = () => {
    // Simulate OTP sending logic for email
    setTimeout(() => {
      setIsEmailOtpSent(true);
    }, 1000);
  };

  const sendMobileOtp = () => {
    // Simulate OTP sending logic for mobile
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
        <form >
       <center>
       <h2 style={{marginTop: '40px', fontWeight: '400'}}>
        Get Started Now
        </h2>
        <p>
        It's free to join and gain full access to thousands of exciting investment opportunities.
        </p>
       </center>
          <label>Name:</label>
          <div
            className={`input-container ${isNameValid ? "valid" : "invalid"}`}
          >
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
            />
            {isNameValid && <div className="validation-icon">&#10004;</div>}
          </div>

          <label>Email</label>
          <div
            className={`input-container ${isEmailValid ? "valid" : "invalid"}`}
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isEmailOtpSent}
              placeholder="example@gmail.com"
              ref={emailInputRef}
            />
            {isEmailValid && <div className="validation-icon">&#10004;</div>}
          </div>

          {emailOtpMessage && (
            <div className="success-message">{emailOtpMessage}</div>
          )}
          {!isEmailOtpSent && (
            <button onClick={sendEmailOtp} disabled={!isEmailValid}>
              Send Email OTP
            </button>
          )}

          {isEmailOtpSent && (
            <>
              <label>Email OTP:</label>
              <div
                className={`input-container ${
                  isEmailOtpValid ? "valid" : "invalid"
                }`}
              >
                <input
                  type="text"
                  value={emailOtp}
                  onChange={(e) => setEmailOtp(e.target.value)}
                  placeholder="Enter Email OTP"
                />
                {isEmailOtpValid && (
                  <div className="validation-icon">&#10004;</div>
                )}
              </div>
            </>
          )}

          <label>Mobile Number:</label>
          <div
            className={`input-container ${
              isMobileValid ? "valid" : "invalid"
            }`}
          >
            <input
              type="text"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              placeholder="Enter your mobile number"
            />
            {isMobileValid && <div className="validation-icon">&#10004;</div>}
          </div>

          {mobileOtpMessage && (
            <div className="success-message">{mobileOtpMessage}</div>
          )}
          {!isMobileOtpSent && (
            <button onClick={sendMobileOtp} disabled={!isMobileValid}>
              Send Mobile OTP
            </button>
          )}

          {isMobileOtpSent && (
            <>
              <label>Mobile OTP:</label>
              <div
                className={`input-container ${
                  isMobileOtpValid ? "valid" : "invalid"
                }`}
              >
                <input
                  type="text"
                  value={mobileOtp}
                  onChange={(e) => setMobileOtp(e.target.value)}
                  placeholder="Enter Mobile OTP"
                />
                {isMobileOtpValid && (
                  <div className="validation-icon">&#10004;</div>
                )}
              </div>
            </>
          )}

          <label>Password:</label>
          <div
            className={`input-container ${
              isPasswordValid ? "valid" : "invalid"
            }`}
          >
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
            {isPasswordValid && <div className="validation-icon">&#10004;</div>}
          </div>

          <button type="submit" disabled={!isFormValid}>
            Submit
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


