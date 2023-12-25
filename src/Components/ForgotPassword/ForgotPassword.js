import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import { ApiServices } from "../../Services/ConfigurationServices";
import { useDispatch } from "react-redux";
import { setToast } from "../../redux/AuthReducers/AuthReducer";
import { ToastColors } from "../Toast/ToastColors";
import axiosInstance from "../axiosInstance";
import { useNavigate } from "react-router-dom/dist";

const ResetPassword = () => {
  const [loginType, setLoginType] = useState("email");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isMobileValid, setIsMobileValid] = useState(false);
  const [otpVisible, setOtpVisible] = useState(false);
  const [emailVerified, setemailVerified] = useState(false);
  const [mobileVerified, setmobileVerified] = useState(false);

  const isEmailValid = /^[A-Z0-9a-z]+@gmail\.com$/.test(email);
  const isPasswordValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(newPassword);


  const navigate = useNavigate()

  const dispatch = useDispatch();

  const handleLoginTypeChange = (type) => {
    setLoginType(type);
    setEmail("");
    setMobile("");
    setOtp("");
    setNewPassword("");
    setConfirmPassword("");
    setOtpVisible(false);
    setIsMobileValid(false);
  };

  const handleResetPassword = async(e) => {
    e.preventDefault();
    const obj = {
      "email": email,
      "password": newPassword,
    }
    await ApiServices.resetPassword(obj).then(async (res)=>{
      dispatch(setToast({
        message: 'Password changed Successfully !',
        bgColor: ToastColors.success,
        visibile: 'yes'
      }))
      localStorage.setItem('user', JSON.stringify(res.data))
      await axiosInstance.customFnAddTokenInHeader(res.data.accessToken)
      navigate('/login')
    }).catch(err=>{
      dispatch(setToast({
        message: err.response.data.message,
        bgColor: ToastColors.failure,
        visibile: 'yes'
      }))
    })
    setTimeout(()=>{
      dispatch(setToast({
        message: '',
        bgColor: '',
        visibile: 'no'
      }))
    }, 4000)
  };

  const handleGetOtp = async () => {
    // Implement logic to send OTP (similar to login component)
    if (loginType === "email") {
      // Implement logic to send email OTP
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
          setOtpVisible(true);
        })
        .catch((err) => {
          dispatch(
            setToast({
              message: "OTP sent successfully !",
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
    } else {
      // Implement logic to send mobile OTP
    }
  };

  const verifyOtp = async (e) => {
    e.preventDefault();
    await ApiServices.verifyOtp({
      email: email,
      otp: otp,
    })
      .then((res) => {
        dispatch(
          setToast({
            message: "Email verified successfully !",
            bgColor: ToastColors.success,
            visibile: "yes",
          })
        );
        document.getElementById('emailVerify').style.display = 'none'
        setemailVerified(true);
      })
      .catch((err) => {
        dispatch(
          setToast({
            message: "OTP Entered Wrong",
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

  const handleMobileChange = (value) => {
    setMobile(value);
    setIsMobileValid(/^[0-9]{10}$/.test(value));
  };

  return (
    <div className="form-container">
      <form className="form">
        <center>
          <h2>Reset Password</h2>
          <p>Reset your password using either email or mobile number.</p>
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
              placeholder="Email Address"  disabled={otpVisible}
              style={{border: `2px solid ${email==''? 'none' : isEmailValid? 'green': 'red'}`}}
              onChange={(e) => setEmail(e.target.value)}
            />
            {isEmailValid && !otpVisible && (
              <button
                type="button"
                className="otp_button"
                onClick={handleGetOtp}
              >
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
                {otp.length === 6 && (
                  <button
                    type="button"
                    className="otp_button"
                    onClick={verifyOtp}
                    id='emailVerify'
                  >
                    Verify otp
                  </button>
                )}
              </>
            )}
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
              <button
                type="button"
                className="otp_button"
                onClick={handleGetOtp}
              >
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
                <button
                  type="button"
                  className="otp_button"
                  onClick={handleGetOtp}
                  style={{ whiteSpace: "noWrap" }}
                >
                  Resend OTP
                </button>
              </>
            )}
          </>
        )}
        {(emailVerified || mobileVerified) && (
          <>
            <input
              type="password"
              value={newPassword}
              placeholder="New Password"
              style={{border: `2px solid ${isPasswordValid? 'green': 'red'}`}}
              onChange={(e) => setNewPassword(e.target.value)}
            />
           {isPasswordValid &&  <input
              type="password"
              value={confirmPassword}
              placeholder="Confirm Password"
              style={{border: `2px solid ${(newPassword!=='' && newPassword===confirmPassword)? 'green': 'red'}`}}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />}
          </>
        )}
        <button
          type="button"
          onClick={handleResetPassword}
          disabled={!emailVerified || newPassword=='' || newPassword!==confirmPassword}
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

export default ResetPassword;
