import React, { useState, useEffect, Fragment } from "react";

const List = ({ setListnumber, userlisttodos, setUserlisttodos }) => {

    const [lists, setLists] = useState([])
    const [newlistname, setNewlistname] = useState("")


    const getLists = async () => {
        try {
            const response = await fetch("/todoboard/lists", {
                headers: { "Content-Type": "application/json", jwt_token: localStorage.token }
            }

            );
            const jsonData = await response.json();
            console.log("jsonData in List", jsonData)
            setLists(jsonData.lists);

        } catch (error) {
            console.log(error.message);

        }

    }

    const getListNumber = (listNo) => {
        console.log(listNo);
        const asInt = parseInt(listNo.substring(1))
        setListnumber(parseInt(listNo.substring(1)));
        if (userlisttodos != null)
            //setUserlisttodos(userlisttodos.filter(todo => (todo.user_list_id == asInt)))
            console.log("no")
        console.log(parseInt(listNo.substring(1)));

    }

    useEffect(() => {
        getLists();
    }, []);

    const newList = async e => {
        e.preventDefault();


        // New list object
        const body = { user_list_id: lists.length + 1, list_name: newlistname };
        // Add to the list above in serial order
        setLists(existingItems => {
            return [...existingItems, body]

        })
        // Send to database 
        try {
            const response = await fetch("/todoboard/lists", {
                method: "POST",
                headers: { "Content-type": "application/json", jwt_token: localStorage.token },
                body: JSON.stringify(body)
            });

            //window.location = "/dashboard";

        } catch (error) {
            console.log(error.message);

        }



    }

    return (
        <div class="sidenav">
            <ul>
                {
                    lists.map(list =>
                        list.user_list_id == 1 ? <li style={{ listStyleType: "none" }}><a href={`#${list.user_list_id}`} onClick={(e) => getListNumber(e.target.getAttribute('href'))}>{list.list_name}</a></li>
                            : <li style={{ listStyleType: "none" }}><a href={`#${list.user_list_id}`} onClick={(e) => getListNumber(e.target.getAttribute('href'))}>{list.list_name}</a></li>
                    )
                }
            </ul>

            {
                /*
                onclick-> setListnumber(to the key  )
                <a href="#">Personal </a>
                <a href="#">Work </a> */
            }


            <br></br>

            <form className="d-flex flex-column col-xs-2" onSubmit={newList}>

                <input type="text" className="form-control" placeholder="create new list..." onChange={e => setNewlistname(e.target.value)} value={newlistname} />

                <div className="list-create">
                    <button className="btn btn-success" onClick={e => newList(e)}>Create new list</button>
                </div>
            </form>


        </div>

    );
};

export default List;