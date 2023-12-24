import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css'
// import AuthHoc from "./AuthHoc";
import Toast from "./Components/Toast/Toast";

const SignUp = React.lazy(() => import("./Components/Signup/SignUp"));
const Login = React.lazy(() => import("./Components/Login/Login"));
const ForgotPassword = React.lazy(() =>
  import("./Components/ForgotPassword/ForgotPassword")
);
const Home = React.lazy(() => import("./Components/Home/Home"));

const ENV = process.env;
const App = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading....</div>}>
        <Toast />
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
