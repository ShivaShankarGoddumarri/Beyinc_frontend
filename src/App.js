import React, { Suspense, useEffect }from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css'
import AuthHoc from "./AuthHoc";
import Toast from "./Components/Toast/Toast";
import { useDispatch } from "react-redux";
import { apicallloginDetails } from "./redux/AuthReducers/AuthReducer";
import Editprofile from "./Components/Editprofile/Editprofile";

const SignUp = React.lazy(() => import("./Components/Signup/SignUp"));
const Login = React.lazy(() => import("./Components/Login/Login"));
const ForgotPassword = React.lazy(() =>
  import("./Components/ForgotPassword/ForgotPassword"));
const Navbar = React.lazy(() => import("./Components/Navbar/Navbar"));
const Home = React.lazy(() => import("./Components/Home/Home"));
const ENV = process.env;


const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(apicallloginDetails());
  }, [])

  return (
    <div>
      <Suspense fallback={<div>Loading....</div>}>
        <Toast />
        <Navbar/>

        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/" element={<Home />} />
          <Route path="/editProfile" element={<Editprofile />} />

        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
