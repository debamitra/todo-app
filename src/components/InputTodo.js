import React, {Fragment, useState} from "react";


const InputTodo = () => {

    const [message, setMessage] = useState("")

    const insertTodo = async(e) => {
        e.preventDefault();
        const body = { message };
        try {
            const response = await fetch("/todoboard/todos",{
                method:"POST",
                headers: {"Content-type": "application/json",jwt_token: localStorage.token},
                body: JSON.stringify(body)
            });
            window.location = "/dashboard";
            
        } catch (error) {
            console.log(error.message);
            
        }


    }


    return (
        <Fragment>
            {//<h1 className="text-center mt-5" >Deb's TO-DO List</h1>
            }
            <form className="d-flex mt-5" onSubmit={insertTodo}>
                <input type="text" className="form-control" placeholder="enter a to-do..." onChange={e => setMessage(e.target.value)} value={message}/>
                <button className="btn btn-success" >Add</button>
            </form>
        </Fragment>
        
        

    );
}

export default InputTodo;