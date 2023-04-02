import React, { useState, useEffect, Fragment } from "react";
import { ReactComponent as DeleteButton } from '../images/delete_button.svg';



import EditTodo from './EditTodo'
import Clip from '../images/clip.png';


const ListTodos = ({  isPast, listHeader, listnumber, userlisttodos,setUserlisttodos }) => {
    //const [todos, setTodos] = useState([]);
    console.log("listtodos",listnumber);
    console.log("listtodos",userlisttodos.filter(todo => (todo.user_list_id == listnumber)));
    console.log("listtodos",listnumber);
    


    const deleteTodo = async (id) => {
        try {
            const response = await fetch(`/todoboard/todos/${id}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json", jwt_token: localStorage.token }

            });
            // setTodos(todos.filter(todo => todo.todo_id !== id));
            setUserlisttodos(userlisttodos.filter(todo => todo.todo_id !== id));


        } catch (error) {
            console.log(error.message)

        }
    }



    const updateTodoStatus = async (id, message, status) => {

        try {
            const body = { message, status };
            const response = await fetch(`/todoboard/todos/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    jwt_token: localStorage.token
                },
                body: JSON.stringify(body)

            })
            window.location = '/';

        } catch (error) {
            console.log(error.message)

        }
    }

    const completeTodo = (id, message) => {
        var checkBox = document.getElementById("status" + id);
        // Get the output text
        var text = document.getElementById("todotext" + id);

        // If the checkbox is checked, display the output text
        if (checkBox.checked == true) {
            text.style.color = "grey";
            text.style.textDecoration = "line-through";
            updateTodoStatus(id, message, true);
        } else {
            text.style.color = "black";
            text.style.textDecoration = "initial"
            updateTodoStatus(id, message, false);
        }
    }

    useEffect(() => {
        //filter(todo => (todo.user_list_id == listnumber)))
    }, [])


    return (
        <Fragment>

            <table className="table table-borderless mt-5 text-left custom-stuff">

                <thead>
                    <tr>

                        <th>{listHeader}</th>

                    </tr>
                </thead>

                <tbody>
                    {
                        
                        userlisttodos.filter(todo => (todo.user_list_id == listnumber)).filter(item => {
                            return item.status == isPast;
                        }).map((item) => (
                            <tr key={item.todo_id}>

                                <td style={{ width: "10%" }}><input type="checkbox" checked={item.status ? 'checked' : ''} id={`status${item.todo_id}`} onChange={() => completeTodo(item.todo_id, item.message)} /></td>
                                {/*<td style={{ width: "60%" }}><div id={`todotext${item.todo_id}`} style={item.status ? { textDecoration: "line-through", color: "lightgrey" } : { textDecoration: "initial" }} >{item.message}</div></td>*/}
                                 <td style={{ width: "60%" }}><div contentEditable="true" maxWidth="20px" wordWrap="break-word" id={`todotext${item.todo_id}`} style={item.status ? { textDecoration: "line-through", color: "lightgrey"} : { textDecoration: "initial" }} >{item.message}</div></td>
                                <td className="todo-container"  style={item.status ? { color: "lightgrey"  , width: "10%" } : { textDecoration: "initial" , width: "10%"}}>{item.completed_on == null ? '' : new Date((item.completed_on * 1000)).toLocaleDateString()} </td>

                                <td style={{ width: "10%" }}><EditTodo todo={item} /></td>

                                <td style={{ width: "10%" }}><button className="btn btn-lg delete-icon-button" style={{ backgroundColor: "transparent" }} onClick={() => deleteTodo(item.todo_id)} data-toggle="tooltip" data-placement="top" title="Delete"><DeleteButton /></button></td>

                            </tr>
                        ))
                    }
                </tbody>
            </table>

        </Fragment>


    );
}

export default ListTodos;