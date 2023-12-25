import React, { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import "./Login.css";
import { ApiServices } from "../../Services/ConfigurationServices";
import { useDispatch } from "react-redux";
import { setToast } from "../../redux/AuthReducers/AuthReducer";
import { ToastColors } from "../Toast/ToastColors";
import axiosInstance from "../axiosInstance";

const Login = () => {
  const [loginType, setLoginType] = useState("email");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [otpVisible, setOtpVisible] = useState(false);
  const [isMobileValid, setIsMobileValid] = useState(false);
  const [mobileVerified, setmobileVerified] = useState(false);



  const isEmailValid = /[a-zA-Z0-9]+@gmail.com/.test(email);
  const isPasswordValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);

  const isFormValid =
    (loginType === "email" && isEmailValid && isPasswordValid) ||
    (loginType === "mobile" && mobileVerified && isPasswordValid);

  const navigate = useNavigate();
  const dispatch = useDispatch();


  const handleLoginTypeChange = (type) => {
    setLoginType(type);
    setEmail("");
    setPassword("");
    setMobile("");
    setOtp("");
    setOtpVisible(false);
    setIsMobileValid(false);
  };

  const handleGetOtp = () => {
    setOtpVisible(true);
  };

  const handleMobileChange = (value) => {
    setMobile(value);
    setIsMobileValid(/^[0-9]{10}$/.test(value));
  };

  const verifyMobileOtp = async (e)=>{
    e.preventDefault();
    e.target.disabled=true;
    setmobileVerified(true)
    document.getElementById('mobileVerify').style.display = 'none'

    // await ApiServices.verifyOtp({
    //   "email": email,
    //   "otp": otp
    // }).then((res)=>{
    //   dispatch(setToast({
    //     message: 'Email verified successfully !',
    //     bgColor: ToastColors.success,
    //     visibile: 'yes'
    //   }))
    // }).catch(err=>{
    //   dispatch(setToast({
    //     message: 'OTP Entered Wrong',
    //     bgColor: ToastColors.failure,
    //     visibile: 'yes'
    //   }))
    // })
    // setTimeout(()=>{
    //   dispatch(setToast({
    //     message: '',
    //     bgColor: '',
    //     visibile: 'no'
    //   }))
    // }, 4000)
  }

  const login = async (e) => {
    e.preventDefault();
    e.target.disabled=true;
    const obj = {
      "email": email,
      "password": password,
    }
    await ApiServices.login(obj).then(async (res)=>{
      dispatch(setToast({
        message: 'User Logged In Successfully !',
        bgColor: ToastColors.success,
        visibile: 'yes'
      }))
      localStorage.setItem('user', JSON.stringify(res.data))
      await axiosInstance.customFnAddTokenInHeader(res.data.accessToken)
      navigate('/')
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
  }

  const mobileLogin = async (e) =>{
    e.preventDefault();
    e.target.disabled=true;
    const obj = {
      "phone": mobile,
      "password": password,
    }
    await ApiServices.mobileLogin(obj).then(async (res)=>{
      dispatch(setToast({
        message: 'User Logged In Successfully !',
        bgColor: ToastColors.success,
        visibile: 'yes'
      }))
      localStorage.setItem('user', JSON.stringify(res.data))
      await axiosInstance.customFnAddTokenInHeader(res.data.accessToken)
      navigate('/')
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
  }
  return (
    <div className="form-container">
      <form className="form">
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
                 {otp.length===6 && (
                  <button type="button" className="otp_button" id='mobileVerify' onClick={verifyMobileOtp} style={{whiteSpace: 'noWrap'}}>
                    Verify OTP
                  </button>
                )}
              </>
            )}
            {mobileVerified && (<input
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />)}
          </>
        )}
        <button type="submit" disabled={!isFormValid} className='submitBtn' onClick={loginType === "email" ? login : mobileLogin}>
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
