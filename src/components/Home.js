

import { Fragment } from 'react';

import InputTodo from './InputTodo'
import ShowTodos from './ShowTodos'
import Emptytodos from '../images/notebook.svg';


function Home({emptytodos}) {
  return (
    <Fragment>
      <div className="container">
        <InputTodo />
        {
          emptytodos  ? 
          <Fragment>  <div class="my-5 text-center"><img
            src={Emptytodos}
            style={{ height: 250, width: 200 }}
            alt="website logo"
          />
        
          </div>
        <p class="my-5 text-center">No todos to show yet.</p>
         </Fragment>
        
          : <ShowTodos />

        }

        
      </div>
    </Fragment>
  );
}

export default Home;