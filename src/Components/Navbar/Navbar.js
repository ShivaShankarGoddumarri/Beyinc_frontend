import React from 'react';
import './Navbar.css';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const {email, role, userName} = useSelector(store => store.auth.loginDetails)
  const navigate = useNavigate()
  return (
    <div>
      <navbar>
      {role}
        <div onClick={(e) => {
          document
            .getElementsByClassName("userDetails")[0]
            .classList.toggle("showUserDetails");
        }}>
          <img
            style={{ borderRadius: '50%', cursor: 'pointer' }}
            src="Profile.jpeg"
          />
        </div>
        <div className="userDetails">
          <div className="closeIcon" onClick={() => {
            document
              .getElementsByClassName("userDetails")[0]
              .classList.remove("showUserDetails");
          }}>
            <i className="fas fa-times cross" ></i>
          </div>
          <div>
            <div className='email'>{email}</div>
            <div style={{ position: 'relative', display: 'inline-block' }}>
              <img
                style={{ borderRadius: '50%', cursor: 'pointer', maxWidth: '100%' }}
                src='Profile.jpeg'
                alt='Profile'
              />
              <i
                className="fas fa-pencil-alt edit-icon"
              ></i>
            </div>
          </div>
          <div className='username'>Hi, {userName}!</div>
          <div className='manage'>Manage your Google Account</div>
          <div>
            <div>
              <div
              >
                <div className="Account" onClick={() => {
navigate(`/editProfile`)
                }}>
                  <i className="fas fa-user-edit" style={{ marginRight: '5px' }}></i> Edit Profile
                </div>
                <div className="logout"  onClick={() => {
                  localStorage.removeItem("user");
                  window.location.href = "/login";
                }}>
                  <i className="fas fa-sign-out-alt" style={{ marginRight: '5px' }}></i> Logout
                </div>
                <div className="Privacy">
                  Privacy Policy
                </div>
                <div className='dot'>•</div>
                <div className="Terms">
                  Terms of Service
                </div>
              </div>
            </div>
          </div>
        </div>
      </navbar>
    </div>
  );
};

export default Navbar;
