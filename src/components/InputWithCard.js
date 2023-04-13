import React, { useState } from "react";
import "./InputWithCard.css";

function InputWithCard() {
  const [showEditCard, setShowEditCard] = useState(false);

  const handleEditButtonClick = () => {
    setShowEditCard(!showEditCard);
  };

  const onClose = () => {
    // Your code to handle closing the edit form goes here
    console.log("yo")
    setShowEditCard(!showEditCard);
  };

  return (
    <div className="todo">
      <input type="text" placeholder="Add a new todo" />
      <button className="edit-button" onClick={handleEditButtonClick}>
        <span className="arrow-icon"></span>
      </button>
      {showEditCard && (
        <div className="edit-card">
            <span className="todo-form-close" onClick={onClose}>
        &times;
      </span>
          <form className="todo-form">
          
  <label htmlFor="estimate" className="todo-form-label">Estimate:</label>
  <input type="text" id="estimate" name="estimate" className="todo-form-input" />

  <label htmlFor="due" className="todo-form-label">Due:</label>
  <input type="text" id="due" name="due" className="todo-form-input" />

  <label htmlFor="completed" className="todo-form-label">Completed:</label>
  <input type="checkbox" id="completed" name="completed" className="todo-form-checkbox" />

  <label htmlFor="priority" className="todo-form-label">Priority:</label>
  <select id="priority" name="priority" className="todo-form-select">

    <option value="low">Low</option>
    <option value="medium">Medium</option>
    <option value="high">High</option>
  </select>
</form>

        </div>
      )}
    </div>
  );
}

export default InputWithCard;
