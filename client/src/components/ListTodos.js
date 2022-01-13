import React , {useState, useEffect , Fragment} from "react";

import EditTodo from './EditTodo'


const ListTodos = ({todos, setTodos, isPast, listHeader}) => {
    console.log(todos);
    

    const deleteTodo = async(id) => {
        try {
            const response = await fetch(`http://localhost:5000/todos/${id}`,{
                method:"DELETE"
            });
            setTodos(todos.filter(todo => todo.todo_id !== id));
            
        } catch (error) {
            console.log(error.message)
            
        }
    }

 

    const updateTodoStatus = async(id,message,status) => {
        
        try {
            const body  = { message , status } ;
            const response = await fetch(`http://localhost:5000/todos/${id}`,{
                method:"PUT",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify(body)
               
            })
            window.location = '/';
            
        } catch (error) {
            console.log(error.message)
            
        }
    }

    const completeTodo = (id,message) => {
        var checkBox = document.getElementById("status"+ id);
        // Get the output text
        var text = document.getElementById("todotext"+id);

        // If the checkbox is checked, display the output text
        if (checkBox.checked == true){
            text.style.color = "grey";
            text.style.textDecoration = "line-through";
            updateTodoStatus(id,message,true);
        } else {
            text.style.color = "black";
            text.style.textDecoration = "initial"
            updateTodoStatus(id,message,false);
        }
    }


    return (
        <Fragment>
            <table className="table table-borderless mt-5 text-left">
                
                <thead>
                    <tr>
                        <th>{listHeader}</th>
                        
                    </tr>
                </thead> 

                <tbody>
                    {

                        
                        todos.filter( item => {
                            return item.status == isPast;
                        }).map((item) => (
                            <tr key={item.todo_id}>
                                
                                <td style={{width:"10%"}}><input type="checkbox" checked={item.status ? 'checked' : ''} id={`status${item.todo_id}`} onChange={()=> completeTodo(item.todo_id,item.message)}/></td>
                                <td style={{width:"60%"}}><div id={`todotext${item.todo_id}`} style={item.status ? {textDecoration:"line-through",color:"lightgrey"} : {textDecoration:"initial"}} >{item.message}{item.status == true &&    
                                <span>{"  -  "}{new Date((item.completed_on * 1000)).toLocaleDateString()} </span> }</div></td>
                                
                                <td style={{width:"10%"}}><EditTodo todo={item}/></td>

                                <td style={{width:"10%"}}><button className="btn btn-lg"  style={{backgroundColor:"transparent"}} onClick={()=> deleteTodo(item.todo_id)} data-toggle="tooltip" data-placement="top" title="Delete"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                    <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                    </svg></button></td>
                                
                            </tr>
                        ))          
                    }
                </tbody>
            </table>

        </Fragment>


    );
}

export default ListTodos;