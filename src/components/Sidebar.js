import React from 'react';

const Sidebar = () => {
  return (
    <div class="sidenav">
      <a href="#">Personal </a>
      <a href="#">Work </a>

      <br></br>
      <div className="list-create">
        <button className="btn btn-success" >Create new list</button>
      </div>
    </div>

  );
};

export default Sidebar;