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
    getlogoutAPI();
  }, []);

  return (
    <Navigate to="/login" />

  )
    
};

async function getlogoutAPI() {
  try {
    const response = await api.get('/api/logout');
    setTodos(response.data)
    return response.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
}

export default Logout;