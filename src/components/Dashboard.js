import React, { useState, useEffect, useRef, Fragment } from 'react';
import '../App.css';
import Popup from "./Popup";
import Header from "./Header";
import NavigationBar from './NavigationBar';
import api from './api';





const Dashboard = ({ setAuth }) => {

  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [userDetail, setUserDetail] = useState({ name: "", user_id: 0, email: "anonymous" })


  const [showPopup, setShowPopup] = React.useState(false);
  const [todoText, setTodoText] = React.useState('');

  const [selectedTab, setSelectedTab] = useState("All");


  async function profileAPI() {
    try {
      console.log("inside profile")


      const response = await api.get('/api/profile');
      console.log(response);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data);
    }
  }


  async function getTodosAPI(user_id) {
    try {
      const response = await api.get('/api/todos', {
        params: {
          user_id: user_id,
        },
      });
      setTodos(response.data)
      return response.data;
    } catch (error) {
      throw new Error(error.response.data);
    }
  }

  async function addTodoAPI(todo) {
    try {
      console.log("inside addtodoAPI")
      console.log(todo)
      const postData = {
        user_id: todo.user_id,
        id: todo.id,
        text: todo.text
      };
      const response = await api.post('/api/todos', postData);
      console.log(response)
      return response.data;
    } catch (error) {
      throw new Error(error.response.data);
    }
  }


  async function updateTodoTextAPI(todo) {
    try {
      console.log("inside updateTodoTextAPI")
      console.log(todo)
      const postData = {
        id: todo.id,
        text: todo.text
      };
      const response = await api.put('/api/todos', postData);
      console.log(response)
      return response.data;
    } catch (error) {
      throw new Error(error.response.data);
    }
  }

  async function updateTodoEstimateAPI(todo) {
    try {
      console.log("inside updateTodoEstimateAPI")
      console.log(todo)
      const postData = {
        id: todo.id,
        estimate: todo.estimate
      };
      const response = await api.put('/api/todos', postData);
      console.log(response)
      return response.data;
    } catch (error) {
      throw new Error(error.response.data);
    }
  }

  async function updateTodoTimespentAPI(todo) {
    try {
      console.log("inside updateTodoTimespentAPI")
      console.log(todo)
      const postData = {
        id: todo.id,
        timespent: todo.timespent
      };
      const response = await api.put('/api/todos', postData);
      console.log(response)
      return response.data;
    } catch (error) {
      throw new Error(error.response.data);
    }
  }

  async function updateTodoCompletedAPI(todo) {
    try {
      console.log("inside updateTodoCompletedAPI")
      console.log(todo)
      const postData = {
        id: todo.id,
        completed: todo.completed
      };
      const response = await api.put('/api/todos', postData);
      console.log(response)
      return response.data;
    } catch (error) {
      throw new Error(error.response.data);
    }
  }

  async function deleteTodoAPI([todo]) {
    try {
      console.log("inside deleteTodoAPI")
      console.log(todo.id)
      const postData = {
        id: todo.id
      }
      const response = await api.delete('/api/todos', { data: postData });
      console.log(response)
      return response.data;
    } catch (error) {
      throw new Error(error.response.data);
    }
  }


  const logout = async e => {
    e.preventDefault();
    try {
      localStorage.removeItem("token");
      setAuth(false);
      console.log("logged out")
    } catch (err) {
      console.error(err.message);
    }
  };



  let filteredTodos =
    selectedTab === "All"
      ? todos
      : selectedTab === "Completed"
        ? todos.filter((todo) => todo.completed)
        : todos.filter((todo) => !todo.completed);


  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };


  const handleStartClick = text => {
    setShowPopup(true);
    setTodoText(text);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setTodoText('');
  };

  const handleStopPopup = (id, seconds) => {
    console.log(`Stopped after ${seconds} seconds`);
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        updateTodoTimespentAPI({ ...todo, timespent: seconds });
        return { ...todo, timespent: seconds };
      } else {
        return todo;
      }
    });
    setTodos(updatedTodos);
  };





  const perc = () => {
    let lengthOfCompletetodos = todos.filter(todo => todo.completed == true).length
    let total = todos.length
    return Math.floor((lengthOfCompletetodos / total) * 100)

  };
  const [completed, setCompleted] = useState(100);

  const handleInputChange = (event) => {
    setNewTodo(event.target.value);
  };

  useEffect(() => {
    console.log("todos updated: ", todos);
    setCompleted(perc())
  }, [todos]);

  useEffect(() => {
    getProfile();
  }, []);





  const handleAddTodo = () => {
    if (newTodo.trim() !== '') {
      const todo = {
        id: Date.now(),
        text: newTodo,
        priority: 'medium',
        due: '',
        completed: false,
        estimate: "1 day",
        timespent: 0,
        user_id: userDetail.user_id
      };
      setTodos((prevTodos) => [...prevTodos, todo]);
      setNewTodo('');
      addTodoAPI(todo);


    }
  };

  const appendArrayAtIndex = (newArray, i) => {
    setTodos(prevState => {
      const updatedArray = [...prevState]; // create a new copy of the array
      updatedArray.splice(i, 0, ...newArray); // insert new array at index i
      return updatedArray; // set the updated array as the new state
    });
  }

  function addSmallerTodos(smallerTodos) {
    console.log("smallertodos")
    console.log(smallerTodos)
    const todos = smallerTodos.map(todo => ({
      id: Date.now() + Math.random() * 10000000,
      text: todo.todo,
      priority: 'medium',
      due: '',
      completed: false,
      estimate: todo.time,
      timespent: 0
    }));
    console.log(todos)
    return todos;
  }




  const handleDeleteTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    deleteTodoAPI(todos.filter((todo) => todo.id == id))
  };

  const handleCompleteTodo = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => {
        if (todo.id === id) {
          updateTodoCompletedAPI({ ...todo, completed: !todo.completed })
          return { ...todo, completed: !todo.completed };
        } else {
          return todo;
        }
      })
    );
    console.log(todos);
    setCompleted(perc())

  };

  const handlePriorityChange = (id, priority) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, priority };
        } else {
          return todo;
        }
      })
    );
  };

  const handleDueChange = (id, due) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, due };
        } else {
          return todo;
        }
      })
    );
  };

  const [showDropdown, setShowDropdown] = useState(false);

  function handleKebabClick() {
    setShowDropdown(!showDropdown);
  }
  //'read this blog and build a business using the ideas in it https://www.ycombinator.com/blog.'

  function handleSmartBreakdownClick(index, text, id) {
    fetch('http://localhost:5000/breakdown', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        todo: text
      })
    })
      .then(response => response.json())
      .then(data => {
        // Handle the response data here
        console.log(data);

        const todosBroken = addSmallerTodos(JSON.parse(data));
        appendArrayAtIndex(todosBroken, index);
        //setTodos((prevTodos) => [...prevTodos, ...todosBroken]);
        setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));


      })
      .catch(error => {
        // Handle the error here
        console.error(error);
      });
  }


  // const handleUpdateTodoText = (event, id) => {
  //   const updatedText = event.target.textContent.trim();
  //   if (updatedText !== '') {
  //     setTodos((prevTodos) =>
  //       prevTodos.map((todo) =>
  //         todo.id === id ? { ...todo, text: updatedText } : todo
  //       )
  //     );
  //   } else {
  //     // Remove the todo if the updated text is empty
  //     handleDeleteTodo(id);
  //   }
  // };
  function handleUpdateTodoText(id, updatedText) {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        updateTodoTextAPI({ ...todo, text: updatedText });
        return { ...todo, text: updatedText };
      } else {
        return todo;
      }
    });
    setTodos(updatedTodos);
  }

  function handleUpdateTodoEstimate(id, updatedEstimate) {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        updateTodoEstimateAPI({ ...todo, estimate: updatedEstimate })
        return { ...todo, estimate: updatedEstimate };
      } else {
        return todo;
      }
    });
    setTodos(updatedTodos);
  }

  const handleStartTodo = (todoId) => {
    // find the todo item with the given id
    const todoIndex = todos.findIndex((todo) => todo.id === todoId);
    const todo = todos[todoIndex];

    // open the popup with the todo details
    console.log(`Starting todo: ${todo.text}`);
  };


  const getProfile = async () => {
     try {
    //   const res = await fetch("/api/profile", {
    //     method: "GET"
    //   });

    //   const parseData = await res.json();
      const parseData = await profileAPI();
      console.log(parseData)
      let userDets = {
        user_id: parseData.user_id,
        email: parseData.email,
        name: parseData.name
      }


      setUserDetail(userDets);
      getTodosAPI(parseData.user_id);

    } catch (err) {
      console.error(err.message);
    }


  };


  return (
    <Fragment>
      <Header />

      <NavigationBar selectedTab={selectedTab} handleTabClick={handleTabClick} />
      <div className="container-todo">

        <div className="todo-form">
          <textarea rows="1"
            type="text"
            className="todo-input"
            placeholder="Enter a new todo"
            value={newTodo}
            onChange={handleInputChange}
          />
          <button className="add-todo" onClick={handleAddTodo}>
            Add Todo
          </button>
        </div>
        <div className="todo-list">
          {/*<div className="container-ss">
            <div className="smart-suggestion">
              <span>Suggested Todo: </span>
              <span className="smart-suggestion-text">Take a 10-minute walk</span>
            </div>
            <div className="button-container">
              <button className="accept-button">Accept</button>
              <button className="reject-button">Reject</button>
            </div>
           </div>*/}
          {filteredTodos.map((todo, index) => (
            <div className="todo-item" key={todo.id}>
              <div className="kebab" onClick={handleKebabClick}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                  <circle cx="12" cy="12" r="2" fill="currentColor" />
                  <circle cx="12" cy="5" r="2" fill="currentColor" />
                  <circle cx="12" cy="19" r="2" fill="currentColor" />
                </svg>

                {showDropdown && (
                  <div className="dropdown">
                    <div className="dropdown-item" onClick={() => handleSmartBreakdownClick(index, todo.text, todo.id)}>
                      Smart breakdown
                    </div>

                  </div>
                )}
              </div>



              <input
                type="checkbox"
                className="complete-todo"
                checked={todo.completed}
                onChange={() => handleCompleteTodo(todo.id)}
              />

              <span
                className={`todo-text ${todo.completed ? 'completed' : ''}`}
                contentEditable
                onBlur={(event) => handleUpdateTodoText(todo.id, event.target.innerText)}
              >
                {todo.text}
              </span>
              <span ><button className="start-todo" onClick={() => handleStartClick(todo.text)}>
                Start Task
              </button></span>
              {showPopup && (
                <Popup
                  todoText={todoText}
                  onClose={handleClosePopup}
                  onStop={handleStopPopup}
                  timeSpent={todo.timespent}
                  id={todo.id}
                />
              )}
              <span
                className={`todo-priority ${todo.priority}`}
                contentEditable
                onBlur={(event) => handleUpdateTodoEstimate(todo.id, event.target.innerText)}
              >
                {todo.estimate}
              </span>
              {/*<span
                  className={`todo-priority ${todo.priority}`}
                  onClick={() => handlePriorityChange(todo.id, todo.priority)}
                >
                  {todo.priority}
                </span>
                <input
                  type="date"
                  className="todo-due"
                  value={todo.due}
                  onChange={(event) => handleDueChange(todo.id, event.target.value)}
                />*/}

              <div className="todo-actions">
                <span
                  className="delete-todo"
                  onClick={() => handleDeleteTodo(todo.id)}
                >
                  ✕
                </span>

              </div>
            </div>
          ))}
        </div>
        <div className="progress-bar-container">
          <div className="progress-bar-fill" style={{ width: `${completed}%` }}>
            <span className="progress-bar-label">
              {completed}% Completed
            </span>
          </div>
        </div>
      </div>

    </Fragment>
  );

};

export default Dashboard;