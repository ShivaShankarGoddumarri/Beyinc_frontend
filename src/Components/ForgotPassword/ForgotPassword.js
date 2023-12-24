import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';

const ResetPassword = () => {
  const [loginType, setLoginType] = useState('email');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isMobileValid, setIsMobileValid] = useState(false);
  const [otpVisible, setOtpVisible] = useState(false);
  const [isMobileOtpSent, setIsMobileOtpSent] = useState(false);
  const [emailOtpSent, setEmailOtpSent] = useState(false);
  const [mobileOtpMessage, setMobileOtpMessage] = useState('');
  const [emailOtpMessage, setEmailOtpMessage] = useState('');

  const isEmailValid = /^[a-z]+@gmail\.com$/.test(email);
  const isMobileOtpValid = !isNaN(otp) && otp.length === 4;
  const isEmailOtpValid = !isNaN(otp) && otp.length === 4;

  const isFormValid =
    (loginType === 'email' && isEmailValid) ||
    (loginType === 'mobile' && isMobileValid);

  const handleResetPassword = () => {
    // Implement your password reset logic here
    alert('Password reset successfully!');
  };

  const handleLoginTypeChange = (type) => {
    setLoginType(type);
    setEmail('');
    setMobile('');
    setOtp('');
    setNewPassword('');
    setConfirmPassword('');
    setOtpVisible(false);
    setIsMobileValid(false);
  };

  const handleGetOtp = () => {
    // Implement logic to send OTP (similar to login component)
    setOtpVisible(true);
    if (loginType === 'email') {
      // Implement logic to send email OTP
      setEmailOtpSent(true);
      setEmailOtpMessage('Email OTP sent successfully.');
      setTimeout(() => setEmailOtpMessage(''), 5000);
    } else {
      // Implement logic to send mobile OTP
      setIsMobileOtpSent(true);
      setMobileOtpMessage('Mobile OTP sent successfully.');
      setTimeout(() => setMobileOtpMessage(''), 5000);
    }
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
            className={loginType === 'email' ? 'active' : ''}
            onClick={() => handleLoginTypeChange('email')}
          >
            Email
          </span>
          <span
            className={loginType === 'mobile' ? 'active' : ''}
            onClick={() => handleLoginTypeChange('mobile')}
          >
            Mobile
          </span>
        </div>
        {loginType === 'email' ? (
          <>
            <input
              type="text"
              value={email}
              placeholder="Email Address"
              onChange={(e) => setEmail(e.target.value)}
            />
            {isEmailValid && !otpVisible && (
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
                <button type="button" className="otp_button" onClick={handleGetOtp}>
                  Resend OTP
                </button>
                {emailOtpMessage && <p>{emailOtpMessage}</p>}
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
                <button type="button" className="otp_button" onClick={handleGetOtp}>
                  Resend OTP
                </button>
                {mobileOtpMessage && <p>{mobileOtpMessage}</p>}
              </>
            )}
          </>
        )}
        <input
          type="password"
          value={newPassword}
          placeholder="New Password"
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <input
          type="password"
          value={confirmPassword}
          placeholder="Confirm Password"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button type="button" onClick={handleResetPassword} disabled={!isFormValid || !isMobileOtpValid || !isEmailOtpValid}>
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
