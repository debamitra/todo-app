import React , {useState, useEffect , Fragment} from "react";

import EditTodo from './EditTodo'


const ListTodos = () => {
    const [todos , setTodos] = useState([]);

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

    const getTodos = async() => {
        try {
            const response = await fetch("http://localhost:5000/todos");
            const jsonData = await response.json();
            setTodos(jsonData);

            
        } catch (error) {
            console.log(error.message);
            
        }

    }

    useEffect(()=> { 
        getTodos();
    },[]);



    return (
        <Fragment>
            <table className="table mt-5 text-center">
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        todos.map((item) => (
                            <tr key={item.todo_id}>
                                <td>{item.message}</td>
                                <td><EditTodo todo={item}/></td>
                                <td><button className="btn btn-lg" style={{backgroundColor:"transparent"}} onClick={()=> deleteTodo(item.todo_id)} data-toggle="tooltip" data-placement="top" title="Delete"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
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