
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import { Fragment, useState, useEffect } from "react";
import { toast } from "react-toastify";

import Logout from "./components/Logout"
import LandingPage from './components/LandingPage';

import InputWithCard from './components/InputWithCard';
import jwtDecode from 'jwt-decode';




//components

import Dashboard from "./components/Dashboard"

import Login from "./components/Login"



toast.configure();


function App() {

  const checkAuthenticated = async () => {
    try {
      console.log(localStorage.token)
      let isLoggedIn = localStorage.getItem('token');
      let decodedToken = null
      if (isLoggedIn){
        decodedToken = jwtDecode(isLoggedIn);
      }
      if (isLoggedIn == null || decodedToken.exp - (Date.now() / 1000) <= 0 ) {
        console.log(window.location.search)
        const query = new URLSearchParams(window.location.search);
        const token = query.get('token')
        console.log(token)
        if (token) {
          localStorage.setItem('token', token);

        }
        isLoggedIn = token

      }

      isLoggedIn ? setIsAuthenticated(true) : setIsAuthenticated(false);
      console.log(isAuthenticated)
    } catch (err) {
      console.log(err);
    }
  };
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      const timeUntilExpiration = decodedToken.exp - (Date.now() / 1000);
      setTimeout(() => {
        localStorage.removeItem('token');
        
      }, timeUntilExpiration * 1000);
    }
  }, []);
  useEffect(() => {
    checkAuthenticated();
  }, []);


  const [isAuthenticated, setIsAuthenticated] = useState(null);

  const setAuth = boolean => {
    setIsAuthenticated(boolean);
  };

  return (
    <Fragment>

      <Router>

        <Routes>
          <Route exact path="landing" element={<InputWithCard />} />
          <Route exact path="" element={isAuthenticated == null ? <p>..Loading</p> : isAuthenticated ? <Dashboard setAuth={setAuth} /> : <Navigate to="/login" />} />
          <Route exact path="login" element={isAuthenticated == null ? <p>..Loading</p> : !isAuthenticated ? <Login setAuth={setAuth} /> : <Navigate to="/dashboard" />} />
          <Route exact path="dashboard" element={isAuthenticated == null ? <p>..Loading</p> : isAuthenticated ? <Dashboard setAuth={setAuth} /> : <Navigate to="/login" />} />
          <Route exact path="logout" element={<Logout setAuth={setAuth} />} />
        </Routes>

      </Router>
    </Fragment>
  );
}

export default App;
