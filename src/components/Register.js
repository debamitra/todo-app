import React from "react";
import { Fragment, useState } from "react";
import { Link } from "react-router-dom";

import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Register = ({ setAuth }) => {
    const [inputs, setInputs] = useState({
        email: "",
        password: "",
        name: ""
    });

    const { email, password, name } = inputs;

    const onChange = e => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    };
        
    const onSubmitForm = async e => {
        e.preventDefault();
        try {
            const body = { email, password, name };
            console.log(body);
            const response = await fetch(
                "/auth/register",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(body)
                }
            );

            const parseRes = await response.json();

            if (parseRes.token) {
                localStorage.setItem("token", parseRes.token);
                setAuth(true);
                toast.success("Register Successfully");
            } else {
                setAuth(false);
                toast.error(parseRes);
            }
        } catch (err) {
            console.error(err.message);

        }
    }
    return (
        <Fragment>
            <div className="auth-wrapper">
            <div className="auth-inner">
            <h1 className="mt-5 text-center">Sign Up</h1>
            <form onSubmit={onSubmitForm}>
                <input
                    type="text"
                    name="email"
                    value={email}
                    placeholder="email"
                    onChange={e => onChange(e)}
                    className="form-control my-3"
                />
                <input
                    type="password"
                    name="password"
                    value={password}
                    placeholder="password"
                    onChange={e => onChange(e)}
                    className="form-control my-3"
                />
                <input
                    type="text"
                    name="name"
                    value={name}
                    placeholder="name"
                    onChange={e => onChange(e)}
                    className="form-control my-3"
                />
                <button className="btn btn-success btn-block">Submit</button>

            </form>
            <Link to="/login">Login</Link>
            </div>
            </div>
        </Fragment>
    );
};

export default Register;