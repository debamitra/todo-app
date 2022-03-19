import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Home from "./Home"
import Success from '../images/success.svg';
import Sidebar from './Sidebar';

const Dashboard = ({ setAuth }) => {
  const [name, setName] = useState("");
  const [emptytodos, setEmptytodos] = useState(false)

  const getProfile = async () => {
    try {
      const res = await fetch("/todoboard/todos", {
        method: "GET",
        headers: { jwt_token: localStorage.token }
      });

      const parseData = await res.json();
      console.log("user name")
      console.log(parseData.user_name)
      setName(parseData.user_name.user_name);
      if ((parseData.todos).length == 0) {
        setEmptytodos(true)
      }
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
      <h5 className="mt-5"> Welcome {name}, </h5>
      <div class="container px-4">
        <div class="row gx-5">
          <div class="col-md-auto" >
            <div class="p-3"> <Sidebar /></div>

          </div>

          <div class="col-sm" >
            <div class="p-3 rounded bg-light "> <Home emptytodos={emptytodos} /></div>

          </div>
          <div class="col-sm ">
            <div class="p-3  ">  Quote of the day : <i> "To be successful in life, start being disciplined and find balance and everthing else will naturally follow. - Unknown"</i></div>
            <div class="my-5 text-center"><img
              src={Success}
              style={{ height: 250, width: 200 }}
              alt="website logo"
            />

            </div>

          </div>
        </div>
      </div>




    </div>
  );
};

export default Dashboard;