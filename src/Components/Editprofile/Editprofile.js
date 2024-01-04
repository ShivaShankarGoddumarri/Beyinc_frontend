import { useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setToast } from "../../redux/AuthReducers/AuthReducer";
import { ToastColors } from "../Toast/ToastColors";
import axiosInstance from "../axiosInstance";
import { ApiServices } from "../../Services/ApiServices";
import { useNavigate } from "react-router-dom/dist";
import "./Editprofile.css";
import { AdminServices } from "../../Services/AdminServices";

const Editprofile = () => {
  const { email, role, userName } = useSelector(
    (store) => store.auth.loginDetails
  );

  const [inputs, setInputs] = useState({
    email: null,
    emailOtp: null,
    mobile: null,
    mobileOtp: null,
    name: null,
    role: null,
    isMobileOtpSent: null,
    isEmailOtpSent: null,
    emailVerified: null,
    mobileVerified: null,
    isEmailValid: null,
    isMobileValid: null,
    isNameValid: null,
  });

  const {
    // email,
    // emailOtp,
    mobile,
    mobileOtp,
    name,
    //  role,
    // isEmailOtpSent,
    isMobileOtpSent,
    // emailVerified,
    mobileVerified,
    isEmailValid,
    isMobileValid,
    isNameValid,
  } = inputs;

  useEffect(() => {
    ApiServices.getProfile({ email: email })
      .then((res) => {
        console.log(res.data);
        setInputs((prev) => ({
          ...prev,
          name: res.data.userName,
          mobile: res.data.phone,
          role: res.data.role,
          mobileVerified: true,
        }));
      })
      .catch((error) => {
        console.log(error);
      });
  }, [email]);

  const handleChanges = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (e.target.name === "name") {
      setInputs((prev) => ({ ...prev, isNameValid: e.target.value !== "" }));
    }
    if (e.target.name === "email") {
      setInputs((prev) => ({
        ...prev,
        isEmailValid: /[a-zA-Z0-9]+@gmail.com/.test(e.target.value),
      }));
    }
    if (e.target.name === "mobile") {
      setInputs((prev) => ({
        ...prev,
        isMobileValid: /^[0-9]{10}$/.test(e.target.value),
      }));
      setInputs((prev) => ({ ...prev, mobileVerified: false, isMobileOtpSent: false}));
    }
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const sendMobileOtp = async (e) => {
    e.preventDefault();
    e.target.disabled = true;
    await ApiServices.sendOtp({
      to: email,
      subject: "Mobile Verification",
    })
      .then((res) => {
        dispatch(
          setToast({
            message: "OTP sent successfully !",
            bgColor: ToastColors.success,
            visibile: "yes",
          })
        );
        // setIsEmailOtpSent(true);
        setInputs((prev) => ({ ...prev, isMobileOtpSent: true }));
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

  // const verifyOtp = async (e) => {
  //   e.preventDefault();
  //   await ApiServices.verifyOtp({
  //     email: email,
  //     otp: emailOtp,
  //   })
  //     .then((res) => {
  //       dispatch(
  //         setToast({
  //           message: "Email verified successfully !",
  //           bgColor: ToastColors.success,
  //           visibile: "yes",
  //         })
  //       );
  //       document.getElementById("emailVerify").style.display = "none";
  //       document.getElementById("emailOtpInput").disabled = true;
  //       // setemailVerified(true);
  //       setInputs((prev) => ({ ...prev, emailVerified: true }));
  //     })
  //     .catch((err) => {
  //       dispatch(
  //         setToast({
  //           message: "Incorrect OTP",
  //           bgColor: ToastColors.failure,
  //           visibile: "yes",
  //         })
  //       );
  //     });
  //   setTimeout(() => {
  //     dispatch(
  //       setToast({
  //         message: "",
  //         bgColor: "",
  //         visibile: "no",
  //       })
  //     );
  //   }, 4000);
  // };

  const verifyMobileOtp = async (e) => {
    e.preventDefault();
    await ApiServices.verifyOtp({
      email: email,
      otp: mobileOtp,
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
        // setmobileVerified(true);
        setInputs((prev) => ({ ...prev, mobileVerified: true }));
        document.getElementById('mobile').disabled = true;
        if (name != "") {
          setInputs((prev) => ({ ...prev, isNameValid: true }));
        }
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

  const update = async (e) => {
    e.preventDefault();
    e.target.disabled = true;
    await ApiServices.sendForApproval({
      email: email,
      userName: name,
      phone: mobile,
      role: role,
    })
      .then((res) => {
        dispatch(
          setToast({
            message: "Profile Sent for approval!",
            bgColor: ToastColors.success,
            visibile: "yes",
          })
        );
        setInputs({
          email: null,
          emailOtp: null,
          mobile: null,
          mobileOtp: null,
          name: null,
          role: null,
          isMobileOtpSent: null,
          isEmailOtpSent: null,
          emailVerified: null,
          mobileVerified: null,
          isEmailValid: null,
          isMobileValid: null,
          isNameValid: null,
        })
        navigate('/')
      })
      .catch((err) => {
        e.target.disabled = false;
        dispatch(
          setToast({
            message: 'Error occured when sending profile to approval',
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

  // const sendMobileOtp = (e) => {
  //   e.preventDefault();
  //   e.target.disabled = true;
  //   setTimeout(() => {
  //     // setIsMobileOtpSent(true);
  //     setInputs((prev) => ({ ...prev, isMobileOtpSent: true }));
  //   }, 1000);
  // };

  const isFormValid = mobileVerified && isNameValid;

  const handleChangeRadio = (e) => {
    setInputs((prev) => ({ ...prev, role: e.target.value }));
  };
  return (
    <div className="update-container">
      <div className="update-form-container">
        <form className="update-form">
          <center>
            <h1 className="update-heading">Profile Update</h1>
          </center>
          <div className="input-container">
            <input
              type="email"
              className={
                isEmailValid !== null && (isEmailValid ? "valid" : "invalid")
              }
              value={email}
              name="email"
              disabled
              onChange={handleChanges}
              // disabled={emailVerified}
              placeholder="Email Address*"
            />

            {/* {!isEmailOtpSent && isEmailValid && (
                <button
                  type="button"
                  className="otp_button"
                  onClick={sendEmailOtp}
                >
                  Get OTP
                </button>
              )} */}
          </div>

          {/* {isEmailOtpSent && emailVerified !== true && (
              <>
                <div className="input-container">
                  <input
                    type="text"
                    className={
                      emailOtp !== null &&
                      (emailOtp.length === 6 ? "valid" : "invalid")
                    }
                    value={emailOtp}
                    name="emailOtp"
                    onChange={handleChanges}
                    placeholder="Enter Email OTP"
                    id="emailOtpInput"
                  />
                  {emailOtp !== null && emailOtp.length === 6 && (
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
            )} */}

          <div className="input-container">
            <input
              type="text"
              className={
                isNameValid !== null && (isNameValid ? "valid" : "invalid")
              }
              value={name}
              name="name"
              onChange={handleChanges}
              placeholder="Full Name*"
            />
          </div>

          <div
            className="input-container"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <input
                type="radio"
                name="role"
                disabled
                checked={role === "Entrepreneur"}
                value="Entrepreneur"
                id="Entrepreneur"
                onClick={handleChangeRadio}
              />
              <label for="Entrepreneur">Entrepreneur</label>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <input
                type="radio"
                name="role"
                disabled
                checked={role === "Mentor"}
                value="Mentor"
                id="Mentor"
                onClick={handleChangeRadio}
              />
              <label for="Mentor">Mentor</label>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <input
                type="radio"
                name="role"
                disabled
                checked={role === "Investor"}
                value="Investor"
                id="Investor"
                onClick={handleChangeRadio}
              />
              <label for="Investor">Investor</label>
            </div>
          </div>

          <div className="input-container">
            <input
              type="text"
              className={
                mobile !== null && (mobile.length === 10 ? "valid" : "invalid")
              }
              name="mobile"
              id='mobile'
              value={mobile}
              onChange={handleChanges}
              placeholder="Mobile Number*"
            />
            {mobileVerified === true && (
              <img
                src="checked.png"
                height={20}
                alt="Your Alt Text"
                className="successIcons"
              />
            )}

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

          {isMobileOtpSent && mobileVerified !== true && (
            <>
              <div className="input-container">
                <input
                  type="text"
                  className={
                    mobileOtp !== null &&
                    (mobileOtp.length === 6 ? "valid" : "invalid")
                  }
                  name="mobileOtp"
                  value={mobileOtp}
                  onChange={handleChanges}
                  placeholder="Enter Mobile OTP"
                  id="mobileOtpInput"
                />
                {mobileOtp !== null && mobileOtp.length === 6 && (
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

          <button type="submit" disabled={!isFormValid} onClick={update}>
            Update
          </button>
          <p>
            <RouterLink
              to="/"
              style={{
                textDecoration: "none",
                fontWeight: "600",
                color: "#1e4bb8",
              }}
              onMouseOver={(e) => (e.target.style.textDecoration = "underline")}
              onMouseOut={(e) => (e.target.style.textDecoration = "none")}
            >
              Back to Home
            </RouterLink>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Editprofile;
