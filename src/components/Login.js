import React, { Fragment, useState, useEffect } from "react";
import { Link , Navigate} from "react-router-dom";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "./Login.css";

import logo from './icons/logo1.png';
import InputWithCard from "./InputWithCard";

const Login = ({setAuth}) => {
    

          const handleLogin = () => {
            window.location.href = 'http://localhost:5000/api/signin';
          };

          // useEffect(() => {
          //   const isLoggedIn = localStorage.getItem('token');
          //   if (isLoggedIn == null){
          //     const query = new URLSearchParams(window.location.search);
          //     const token=query.get('jwt')
          //     console.log(token)
          //     if(token){
          //       localStorage.setItem('token',token);
          //       console.log("here");
          //       <Navigate to="/dashboard" />;
                
          //     }

          //   }
            
          // }, []);


    
    return (
        <Fragment>
        <div className="login-container">
      <div className="login-header">
        <img src={logo} alt="BRAINYDO Logo" className="login-img" />
        <h1>BrainyDo</h1>
        <p className="login-description">A mindfulness and productivity app powered by AI</p>
      </div>
      
      <div type='button' className='login-with-google-btn' onClick={handleLogin}>Sign in with Google</div>
          

    </div>
        </Fragment>
    );
};

export default Login;