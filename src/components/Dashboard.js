import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Home from "./Home"
import Success from '../images/success.svg';
import List from './List';


const Dashboard = ({ setAuth }) => {
  const [name, setName] = useState("");
  const [emptytodos, setEmptytodos] = useState(false)
  const [listnumber, setListnumber] = useState(1);
  const [userlisttodos, setUserlisttodos] = useState(null);

  const getProfile = async () => {
    try {
      const res = await fetch("/todoboard/todos", {
        method: "GET",
        headers: { jwt_token: localStorage.token }
      });

      const parseData = await res.json();
      const todos = parseData.todos
      console.log("user name")
      console.log(parseData.user_name)
      setName(parseData.user_name.user_name);
      if ((parseData.todos).length == 0) {
        setEmptytodos(true)
      }
      else{
        setUserlisttodos(todos)
        //setUserlisttodos(todos.filter(todo => (todo.user_list_id == listnumber)))
      }
    } catch (err) {
      console.error(err.message);
    }

    // Set the Default list selected
    try {
      const response1 = await fetch("/todoboard/lists",{
          method:"GET",
          headers: {"Content-type": "application/json",jwt_token: localStorage.token}
      });
     
      const {lists} = await response1.json();
      setListnumber(lists[0].user_list_id);
      
  } catch (error) {
      console.log(error.message);
      
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
      <h5 className="mt-5"> Welcome {name}</h5>
      <div class="container px-4">
        <div class="row gx-5">
          <div class="col" >
            <div class="p-3"> <List userlisttodos={userlisttodos} setUserlisttodos={setUserlisttodos} setListnumber={setListnumber}/></div>

          </div>

          <div class="col-6" >
            <div class="p-3 rounded bg-light "> <Home emptytodos={emptytodos} listnumber={listnumber} setUserlisttodos={setUserlisttodos} userlisttodos={userlisttodos}/></div>

          </div>
          <div class="col">
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