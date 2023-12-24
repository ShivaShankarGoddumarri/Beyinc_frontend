import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './Components/Signup/SignUp';
import Login from './Components/Login/Login';
import ForgotPassword from './Components/ForgotPassword/ForgotPassword';
import Home from './Components/Home/Home';


const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path='/forgotpassword' element={<ForgotPassword />} />
          <Route path='/Home' element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
