
import React from "react";
import {  Link } from "react-router-dom";
import SubHeader from "./SubHeader"

const Header = ({isAuthenticated}) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
          <Link className="navbar-brand" to={"/dashboard"}>todo.io</Link>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <SubHeader isAuthenticated={isAuthenticated}/>
          </div>
        </div>
      </nav>
    )
}

export default Header;