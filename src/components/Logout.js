import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
    
    Navigate
   } from "react-router-dom";

const Logout = ({setAuth}) => {


  const logout = async () => {
  
    try {
      localStorage.removeItem("token");
      setAuth(false);
      toast.success("Logout successfully");
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    logout();
  }, []);

  return (
    <Navigate to="/login" />

  )
    
};

export default Logout;