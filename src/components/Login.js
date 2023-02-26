import React, { Fragment, useState, useEffect } from "react";
import { Link , Navigate} from "react-router-dom";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Login = ({setAuth}) => {
    const [inputs, setInputs] = useState({
        email: "",
        password: ""
      });



    const { email, password } = inputs;

    const onChange = e =>
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    
        const onSubmitForm = async e => {
            e.preventDefault();
            try {
              const body = { email, password };
              const response = await fetch(
                "/auth/login",
                {
                  method: "POST",
                  headers: {
                    "Content-type": "application/json"
                  },
                  body: JSON.stringify(body)
                }
              );
        
              const parseRes = await response.json();
        
              if (parseRes.token) {
                localStorage.setItem("token", parseRes.token);
                setAuth(true);
                toast.success("Logged in Successfully");
              } else {
                setAuth(false);
                toast.error(parseRes);
              }
            } catch (err) {
              console.error(err.message);
            }
          };

          const handleLogin = () => {
            window.location.href = 'http://localhost:4000/auth/google/login';
          };

          // useEffect(() => {
          //   const isLoggedIn = localStorage.getItem('token');
          //   if (isLoggedIn == null){
          //     const query = new URLSearchParams(window.location.search);
          //     const token=query.get('jwt')
          //     console.log(token)
          //     if(token){
          //       localStorage.setItem('token',token);
          //       console.log("here");
          //       <Navigate to="/dashboard" />;
                
          //     }

          //   }
            
          // }, []);


    
    return (
        <Fragment>
        <div className="auth-wrapper">
        <div className="auth-inner">
           <h1 className="my-5 text-center">Login</h1>
           <button onClick={handleLogin}>Log In With Google</button>
      <form onSubmit={onSubmitForm}>
        <input
          type="text"
          name="email"
          value={email}
          onChange={e => onChange(e)}
          className="form-control my-3"
        />
        <input
          type="password"
          name="password"
          value={password}
          onChange={e => onChange(e)}
          className="form-control my-3"
        />
        <button class="btn btn-success btn-block">Submit</button>
      </form>
      <Link to="/register">Sign Up</Link>
      </div>
      </div>
        </Fragment>
    );
};

export default Login;