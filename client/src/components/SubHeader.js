
import React from "react";
import {  Link } from "react-router-dom";



const SubHeader = ({isAuthenticated}) => {
    const isLoggedIn = isAuthenticated;
    if (isLoggedIn) {
      return (
        <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to={"/logout"}>Logout</Link>
        </li>
        
      </ul>
      );
    }
    return (
        <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to={"/login"}>Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/register"}>Sign up</Link>
              </li>
            </ul>
    );
  }



export default SubHeader;