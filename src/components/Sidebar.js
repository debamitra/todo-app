import React from 'react';

const Sidebar = () => {

  const [listname, setListname] = useState("")

  const newList = async e => {
    e.preventDefault();
    const body = { list_name };
    try {
      const response = await fetch("/todoboard/lists", {
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
    <div class="sidenav">
      <a href="#">Personal </a>
      <a href="#">Work </a>

      <br></br>
      <div className="list-create">
        <button className="btn btn-success" onClick={e => newList(e)}>Create new list</button>
      </div>
    </div>

  );
};

export default Sidebar;