import React, { useState } from "react";
import "./Navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ApiServices } from "../../Services/ApiServices";
import axiosInstance from "../axiosInstance";
import { setLoginData, setToast } from "../../redux/AuthReducers/AuthReducer";
import { ToastColors } from "../Toast/ToastColors";
import { jwtDecode } from "jwt-decode";

const Navbar = () => {
  const {email, role, userName, image} = useSelector(store => store.auth.loginDetails)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [changeImage, setchangeImage] = useState('')
  const handleImage = (e) => {
    const file = e.target.files[0]
    setFileBase(file);
  }
  const setFileBase = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setchangeImage(reader.result)
    }
  }
  
  const submit = async (e) => {
    e.target.disabled = true
    await ApiServices.updateuserProfileImage({ email: email, image: changeImage }).then((async (res) => {
      console.log(res.data);
      localStorage.setItem('user', JSON.stringify(res.data));
      dispatch(setLoginData(jwtDecode(res.data.accessToken)))
      await axiosInstance.customFnAddTokenInHeader(res.data.accessToken);
      dispatch(
        setToast({
          message: "Image uploaded successfully",
          bgColor: ToastColors.success,
          visibile: "yes",
        })
      );
      e.target.disabled = false

    })).catch((err) => {
      dispatch(
        setToast({
          message: "Error during image upload",
          bgColor: ToastColors.failure,
          visibile: "yes",
        })
      );
      e.target.disabled = false
    })
    setTimeout(() => {
      dispatch(
        setToast({
          message: "",
          bgColor: "",
          visibile: "no",
        })
      );
    }, 4000);
  }
  return (
    <div
      className="navbar"
      style={{ display: email == undefined ? "none" : "flex" }}
    >
      <div className="logo">BEYINC</div>
      {role}
      <div
        onClick={(e) => {
          document
            .getElementsByClassName("userDetails")[0]
            .classList.toggle("showUserDetails");
        }}
      >
        <img className="Profile-img" src={image === undefined ? "Profile.jpeg" : image} alt="" />
      </div>
      <div className="userDetails">
        <div
          className="closeIcon"
          onClick={() => {
            document
              .getElementsByClassName("userDetails")[0]
              .classList.remove("showUserDetails");
          }}
        >
          <i className="fas fa-times cross"></i>
        </div>
        <div>
          <div className="email">{email}</div>
          <div style={{ position: "relative", display: "inline-block" }}>
            <img
              style={{
                borderRadius: "50%",
                cursor: "pointer",
                maxWidth: "100%",
              }}
              src={image === undefined ? "Profile.jpeg" : image} 
              alt="Profile"
            />
            <i className="fas fa-pencil-alt edit-icon"></i>
          </div>
        </div>
        <input type="file" name="" id="file-input" onChange={handleImage} />
        <button onClick={submit}>send Image</button>
        <div className="username">Hi, {userName}!</div>
        <div className="manage">Manage your Google Account</div>
        <div>
          <div>
            <div>
              <div
                className="Account"
                onClick={() => {
                  document
                    .getElementsByClassName("userDetails")[0]
                    .classList.remove("showUserDetails");
                  navigate(`/editProfile`);
                }}
              >
                <i
                  className="fas fa-user-edit"
                  style={{ marginRight: "5px" }}
                ></i>{" "}
                Edit Profile
              </div>
              <div
                className="logout"
                onClick={() => {
                  localStorage.removeItem("user");
                  window.location.href = "/login";
                }}
              >
                <i
                  className="fas fa-sign-out-alt"
                  style={{ marginRight: "5px" }}
                ></i>{" "}
                Logout
              </div>
              <div className="Privacy">Privacy Policy</div>
              <div className="dot">•</div>
              <div className="Terms">Terms of Service</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
