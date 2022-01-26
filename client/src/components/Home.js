

import { Fragment } from 'react';

import InputTodo from './InputTodo'
import ShowTodos from './ShowTodos'

function Home() {
  return (
    <Fragment>
      <div className="container">
        <InputTodo />
        <ShowTodos />
      </div>
    </Fragment>
  );
}

export default Home;