import React from "react";
import "./Header.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faBell, faUser } from "@fortawesome/free-solid-svg-icons";
import logo from './icons/logo1.png';

function Header() {

    const currentDate = new Date().toLocaleString();
  return (
    <header className="header">

    <div className="header__container">
    <div className="header__logo">
      <img src={logo} alt="BRAINYDO Logo" />
      <h1 className="header__appname">BrainyDo</h1>
      
      
    </div>
  
    <div className="header__description">
      A mindfulness and productivity app powered by AI
    </div>
  </div>

  
    
    <div className="header__icons-container">
    <div className="header__date-time">{currentDate}</div>
      <div className="header__notification-icon">
        
      </div>
      <div className="header__profile-icon">
        
      </div>
    </div>
    </header>
  )
   
}

export default Header;
