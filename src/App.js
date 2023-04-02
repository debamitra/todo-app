
import './App.css';
import jwtDecode from 'jwt-decode';

import Home from './components/Home';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
 } from "react-router-dom";
 import { Fragment , useState, useEffect} from "react";
 import { toast } from "react-toastify";
 import Header from "./components/Header"
 import Logout from "./components/Logout"
 import LandingPage from './components/LandingPage';
 import Sidebar from './components/Sidebar';


 //components

 import Dashboard from "./components/Dashboard"

import Login from "./components/Login"

import Register from "./components/Register"

toast.configure();


function App() {
  const checkAuthenticated = async () => {
    try {
      console.log("in checkauth")
      console.log(localStorage.token)
      const isLoggedIn = localStorage.getItem('token');
      let decodedToken = null
      if (isLoggedIn){
        decodedToken = jwtDecode(isLoggedIn);
      }
      if (isLoggedIn == null || decodedToken.exp - (Date.now() / 1000) <= 0 )
          {
            console.log(window.location.search)
              const query = new URLSearchParams(window.location.search);
              const token=query.get('jwt')
              console.log(token)
              if(token){
                localStorage.setItem('token',token);
                
              }

            }
      const res = await fetch("/auth/verify", {
        method: "GET",
        headers: { jwt_token: localStorage.token }
      });

      const parseRes = await res.json();

      parseRes === true ?  setIsAuthenticated(true) : setIsAuthenticated(false);
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
      
      <Header isAuthenticated={isAuthenticated}/>
      
      
      <Routes>
        <Route exact path="landing" element={<LandingPage/>} />
        <Route exact path="" element={isAuthenticated == null ? <p>..Loading</p> :isAuthenticated ? <Dashboard setAuth={setAuth}/>: <Navigate to="/login" /> }/>
        <Route exact path="login" element={ isAuthenticated == null ? <p>..Loading</p> :!isAuthenticated ? <Login setAuth={setAuth}/>: <Navigate to="/dashboard" />}/>
        <Route exact path="register" element={ !isAuthenticated ? <Register setAuth={setAuth}/>:<Navigate to="/dashboard" /> }/>
        <Route exact path="dashboard" element={isAuthenticated == null ? <p>..Loading</p> :isAuthenticated ? <Dashboard setAuth={setAuth}/>: <Navigate to="/login" /> }/>
        <Route exact path="logout" element={<Logout setAuth={setAuth}/>}/>
      </Routes>
      
      
      
    </Router>
    </Fragment>
  );
}

export default App;
