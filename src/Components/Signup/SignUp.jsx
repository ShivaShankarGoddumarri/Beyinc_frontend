import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import "./SignUp.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setToast } from "../../redux/AuthReducers/AuthReducer";
import { ToastColors } from "../Toast/ToastColors";
import axiosInstance from "../axiosInstance";
import { ApiServices } from "../../Services/ConfigurationServices";
import { useNavigate } from "react-router-dom/dist";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [emailOtp, setEmailOtp] = useState("");
  const [mobile, setMobile] = useState("");
  const [mobileOtp, setMobileOtp] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const [isEmailOtpSent, setIsEmailOtpSent] = useState(false);
  const [isMobileOtpSent, setIsMobileOtpSent] = useState(false);

  const [emailVerified, setemailVerified] = useState(false);
  const [mobileVerified, setmobileVerified] = useState(false);

  // Validation Part
  const isEmailValid = /[a-zA-Z0-9]+@gmail.com/.test(email);
  const isMobileValid = /^[0-9]{10}$/.test(mobile);
  const isNameValid = name !== "";
  const isPasswordValid =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
      password
    );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const sendEmailOtp = async (e) => {
    e.preventDefault();
    e.target.disabled = true;
    await ApiServices.sendOtp({
      to: email,
      subject: "Email Verification",
    })
      .then((res) => {
        dispatch(
          setToast({
            message: "OTP sent successfully !",
            bgColor: ToastColors.success,
            visibile: "yes",
          })
        );
        setIsEmailOtpSent(true);
      })
      .catch((err) => {
        dispatch(
          setToast({
            message: "OTP sent failed !",
            bgColor: ToastColors.failure,
            visibile: "yes",
          })
        );
      });
    setTimeout(() => {
      dispatch(
        setToast({
          message: "",
          bgColor: "",
          visibile: "no",
        })
      );
    }, 4000);
  };

  const verifyOtp = async (e) => {
    e.preventDefault();
    await ApiServices.verifyOtp({
      email: email,
      otp: emailOtp,
    })
      .then((res) => {
        dispatch(
          setToast({
            message: "Email verified successfully !",
            bgColor: ToastColors.success,
            visibile: "yes",
          })
        );
        document.getElementById("emailVerify").style.display = "none";
        document.getElementById("emailOtpInput").disabled = true;
        setemailVerified(true);
      })
      .catch((err) => {
        dispatch(
          setToast({
            message: "Incorrect OTP",
            bgColor: ToastColors.failure,
            visibile: "yes",
          })
        );
      });
    setTimeout(() => {
      dispatch(
        setToast({
          message: "",
          bgColor: "",
          visibile: "no",
        })
      );
    }, 4000);
  };

  const verifyMobileOtp = async (e) => {
    e.preventDefault();
    await ApiServices.verifyOtp({
      email: email,
      otp: emailOtp,
    })
      .then((res) => {
        dispatch(
          setToast({
            message: "Mobile verified successfully !",
            bgColor: ToastColors.success,
            visibile: "yes",
          })
        );
        document.getElementById("mobileVerify").style.display = "none";
        document.getElementById("mobileOtpInput").disabled = true;
        setmobileVerified(true);
      })
      .catch((err) => {
        dispatch(
          setToast({
            message: "Incorrect OTP",
            bgColor: ToastColors.failure,
            visibile: "yes",
          })
        );
      });
    setTimeout(() => {
      dispatch(
        setToast({
          message: "",
          bgColor: "",
          visibile: "no",
        })
      );
    }, 4000);
  };

  const signup = async (e) => {
    e.preventDefault();
    e.target.disabled = true;
    await ApiServices.register({
      email: email,
      password: password,
      userName: name,
      phone: mobile,
    })
      .then((res) => {
        dispatch(
          setToast({
            message: "User Registered Successfully !",
            bgColor: ToastColors.success,
            visibile: "yes",
          })
        );
        navigate("/login");
      })
      .catch((err) => {
        e.target.disabled = false;
        dispatch(
          setToast({
            message: err.response.data.message,
            bgColor: ToastColors.failure,
            visibile: "yes",
          })
        );
      });
    setTimeout(() => {
      dispatch(
        setToast({
          message: "",
          bgColor: "",
          visibile: "no",
        })
      );
    }, 4000);
  };

  const sendMobileOtp = (e) => {
    e.preventDefault();
    e.target.disabled = true;
    setTimeout(() => {
      setIsMobileOtpSent(true);
    }, 1000);
  };

  const isFormValid =
    isEmailValid &&
    isMobileValid &&
    emailVerified &&
    mobileVerified &&
    isNameValid &&
    isPasswordValid;

  return (
    <div className="registration-container">
      {/* Image Container */}
      <div className="registration-image-container">
        <center>
          <h2 style={{ marginTop: "40px", fontWeight: "600" }}>
            Get Started Now
          </h2>
          <p style={{ fontSize: "14px" }}>
            It's free to join and gain full access to thousands of exciting
            investment opportunities.
          </p>
          <img src="investment.png" alt="Your Alt Text" />
        </center>
      
      </div>

      {/* Form Container */}
      <div className="registration-form-container">
        <form>
          <center>
          <h1>Signup</h1>
          </center>
          <div className="input-container">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full Name*"
              style={{
                border: `2px solid ${
                  name == "" ? "none" : isNameValid ? "green" : "red"
                }`,
              }}
            />
          </div>

          <div className="input-container">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isEmailOtpSent}
              placeholder="Email Address*"
              style={{
                border: `2px solid ${
                  email == "" ? "none" : isEmailValid ? "green" : "red"
                }`,
              }}
            />
            {!isEmailOtpSent && isEmailValid && (
              <button
                type="button"
                className="otp_button"
                onClick={sendEmailOtp}
              >
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
                  id="emailOtpInput"
                  style={{
                    border: `2px solid ${
                      emailOtp == ""
                        ? "none"
                        : emailOtp.length !== 6
                        ? "red"
                        : "green"
                    }`,
                  }}
                />
                {emailOtp.length === 6 && (
                  <button
                    type="button"
                    className="otp_button"
                    id="emailVerify"
                    onClick={verifyOtp}
                    style={{ whiteSpace: "noWrap" }}
                  >
                    Verify OTP
                  </button>
                )}
              </div>
            </>
          )}

          <div className="input-container">
            <input
              type="text"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              placeholder="Mobile Number*"
              style={{
                border: `2px solid ${
                  mobile == "" ? "none" : isMobileValid ? "green" : "red"
                }`,
              }}
            />
            {!isMobileOtpSent && isMobileValid && (
              <button
                type="button"
                className="otp_button"
                onClick={sendMobileOtp}
              >
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
                  id="mobileOtpInput"
                  style={{
                    border: `2px solid ${
                      mobileOtp == ""
                        ? "none"
                        : mobileOtp.length !== 6
                        ? "red"
                        : "green"
                    }`,
                  }}
                />
                {mobileOtp.length === 6 && (
                  <button
                    type="button"
                    className="otp_button"
                    id="mobileVerify"
                    onClick={verifyMobileOtp}
                    style={{ whiteSpace: "noWrap" }}
                  >
                    Verify OTP
                  </button>
                )}
              </div>
            </>
          )}

          <div className="input-container">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create Password*"
              style={{
                border: `2px solid ${
                  password == "" ? "none" : isPasswordValid ? "green" : "red"
                }`,
              }}
            />
          </div>

          <button type="submit" disabled={!isFormValid} onClick={signup}>
            Signup
          </button>
          <p>
            Already have an account? <RouterLink to="/login">Login</RouterLink>
          </p>
        </form>
      </div>
    </div>
  );
};
export default SignUp;
