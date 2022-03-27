
import React, { useState, useEffect, Fragment } from "react";



import ListTodos from "./ListTodos";

const ShowTodos = ({ listnumber, userlisttodos, setUserlisttodos }) => {
    // const [todos , setTodos] = useState(null);



    const getTodos = async () => {
        try {
            const response = await fetch("/todoboard/todos", {
                headers: { "Content-Type": "application/json", jwt_token: localStorage.token }
            }

            );
            const jsonData = await response.json();
            setTodos(jsonData.todos);
            console.log("todos for this user", jsonData.todos)




        } catch (error) {
            console.log(error.message);

        }

    }

    useEffect(() => {
        console.log("inSHowtodos:check if listNumber gets updated here and component called again", listnumber)
        //getTodos();

    }, []);

    if (userlisttodos == null) {
        return (
            <p class="my-5 text-center">..Loading</p>
        )

    }
    if (userlisttodos.length == 0) {
        return (
            <p class="my-5 text-center">No to-dos to show yet.</p>
        )
    }

    return (

        <Fragment>
            <ListTodos userlisttodos={userlisttodos} setUserlisttodos={setUserlisttodos} isPast={false} listHeader={"Today"} listnumber={listnumber} />
            <ListTodos userlisttodos={userlisttodos} setUserlisttodos={setUserlisttodos} isPast={true} listHeader={"Previous"} listnumber={listnumber} />



            {/* <ListTodos todos={todos} setTodos={setTodos}  isPast={false} listHeader={"Today"} listnumber={listnumber}/>
               <ListTodos todos={todos} setTodos={setTodos}  isPast={true} listHeader={"Previous"} listnumber={listnumber}/> */}
        </Fragment>



    );
}

export default ShowTodos;