import React, { Fragment, useState } from "react";


const InputTodo = ({ listnumber }) => {

    const [message, setMessage] = useState("")
    console.log("inputtodo", listnumber)

    const insertTodo = async (e) => {
        e.preventDefault();
        let resp_obj = {};

        // Get the list ID from list table using user ID and user list ID
        try {
            const response1 = await fetch(`/todoboard/lists/${listnumber}`, {
                method: "GET",
                headers: { "Content-type": "application/json", jwt_token: localStorage.token }
            });

            resp_obj = await response1.json();

            console.log("while inserting todo to a user list", resp_obj)

        } catch (error) {
            console.log(error.message);

        }

        const list_id = resp_obj.list_id;
        const user_list_id = listnumber

        const body = { message, list_id, user_list_id };

        try {
            const response = await fetch("/todoboard/todos", {
                method: "POST",
                headers: { "Content-type": "application/json", jwt_token: localStorage.token },
                body: JSON.stringify(body)
            });

            window.location = "/dashboard";

        } catch (error) {
            console.log(error.message);

        }


    }


    return (
        <Fragment>
            <form className="d-flex mt-5" onSubmit={insertTodo}>
                <input type="text" className="form-control" placeholder="enter a to-do..." onChange={e => setMessage(e.target.value)} value={message} />
                <button className="btn btn-success" >Add</button>
            </form>
        </Fragment>



    );
}

export default InputTodo;