import axios from 'axios';
import React from 'react';
import { Offcanvas } from 'react-bootstrap';
import { useForm } from "react-hook-form";


const Login = ({ loginShow, handleClose, setUser, user }) => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => {
        axios.post(`http://127.0.0.1:8000/api/login`, data)
            .then(res => {
                console.log(res)
                if (res.data.success == true) {
                    let userData = {};
                    userData['token'] = res.data.token;
                    userData['username'] = data.username;
                    localStorage.setItem("userData", JSON.stringify(userData));
                    setUser(userData);
                } else if (res.data.error) { }
            })
    };
    return (
        <>
            <Offcanvas show={loginShow} placement={'end'} onHide={handleClose} >
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Login Now</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group mb-2">
                            <label htmlFor="username">Username</label>
                            <input defaultValue="" {...register("username", { required: true })} type="text" className="form-control" id="username" name="username" aria-describedby="emailHelp" placeholder="Enter username" />
                            {errors.username && <span>This field is required</span>}
                        </div>
          
                        <div className="form-group mb-2">
                            <label htmlFor="password">Password</label>
                            <input defaultValue="" {...register("password", { required: true })} type="password" className="form-control" id="password" name='password' aria-describedby="password" placeholder="Enter password" />
                            {errors.password && <span>This field is required</span>}
                        </div>
                        <button type="submit" className="btn btn-primary">Join Now</button>
                    </form>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
};

export default Login;