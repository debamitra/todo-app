
import './App.css';
import {Fragment} from 'react';

import InputTodo from './components/InputTodo'

import ListTodos from './components/ListTodos'

import ShowTodos from './components/ShowTodos'

function App() {
  return (
    <Fragment>
      <div className="container">
        <InputTodo />
        
        <ShowTodos /> 
      </div>
    </Fragment>
  );
}

export default App;
