import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Home  from "./Home"

const Dashboard = ({ setAuth }) => {
  const [name, setName] = useState("");

  const getProfile = async () => {
    try {
      const res = await fetch("http://localhost:5000/todoboard/todos", {
        method: "GET",
        headers: { jwt_token: localStorage.token }
      });

      const parseData = await res.json();
      console.log("user name")
      console.log(parseData.user_name)
      setName(parseData.user_name.user_name);
    } catch (err) {
      console.error(err.message);
    }
  };

  const logout = async e => {
    e.preventDefault();
    try {
      localStorage.removeItem("token");
      setAuth(false);
      toast.success("Logout successfully");
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div className="container cont-pad">
      <h1 className="mt-5"> {name}'s TO-DO List</h1>
     
      
      
      <Home />
      {/*
      <button onClick={e => logout(e)} className="btn btn-primary">
        Logout
      </button>*/
      }
    </div>
  );
};

export default Dashboard;