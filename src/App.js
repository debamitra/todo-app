
import './App.css';

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


 //components

 import Dashboard from "./components/Dashboard"

import Login from "./components/Login"

import Register from "./components/Register"

toast.configure();


function App() {
  const checkAuthenticated = async () => {
    try {
      const res = await fetch("http://localhost:5000/auth/verify", {
        method: "GET",
        headers: { jwt_token: localStorage.token }
      });

      const parseRes = await res.json();

      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    checkAuthenticated();
  }, []);

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = boolean => {
    setIsAuthenticated(boolean);
  };

  return (
    <Fragment>
      
    <Router>
      
      <Header isAuthenticated={isAuthenticated}/>
      
      <Routes>
      <Route exact path="" element={isAuthenticated ? <Dashboard setAuth={setAuth}/>: <Navigate to="/login" /> }/>
        <Route exact path="login" element={ !isAuthenticated ? <Login setAuth={setAuth}/>: <Navigate to="/dashboard" />}/>
        <Route exact path="register" element={ !isAuthenticated ? <Register setAuth={setAuth}/>:<Navigate to="/dashboard" /> }/>
        <Route exact path="dashboard" element={isAuthenticated ? <Dashboard setAuth={setAuth}/>: <Navigate to="/login" /> }/>
        <Route exact path="logout" element={<Logout setAuth={setAuth}/>}/>
      </Routes>
      
      
    </Router>
    </Fragment>
  );
}

export default App;
