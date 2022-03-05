
import React , {useState, useEffect , Fragment} from "react";



import ListTodos from "./ListTodos";

const ShowTodos = () => {
    const [todos , setTodos] = useState([]);
    
   

    const getTodos = async() => {
        try {
            const response = await fetch("http://localhost:5000/todoboard/todos",{
                headers: { "Content-Type": "application/json" ,jwt_token: localStorage.token }
            }

            );
            const jsonData = await response.json();
            setTodos(jsonData.todos);
           
            

            
        } catch (error) {
            console.log(error.message);
            
        }

    }

    useEffect(()=> { 
        getTodos();
    },[]);


    
    
    return (
            
           <Fragment>
               
               <ListTodos todos={todos} setTodos={setTodos}  isPast={false} listHeader={"Today"}/>
               <ListTodos todos={todos} setTodos={setTodos}  isPast={true} listHeader={"Previous"}/>
           </Fragment>
            

        
    );
}

export default ShowTodos;