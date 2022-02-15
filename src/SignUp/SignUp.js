import axios from 'axios';
import React, { useState } from 'react';
import { Offcanvas } from 'react-bootstrap';
import { useForm } from "react-hook-form";


const SignUp = ({ signUpShow, handleClose, setUser, user }) => {
    const [message, setMessage] = useState('');
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => {
        axios.post(`http://127.0.0.1:8000/api/register`, data)
            .then(res => {
                console.log(res)
                if (res.data.success == true) {
                    setMessage(res.data.message);
                } else if (res.data.error) { }
            })
    };
    return (
        <>
            <Offcanvas show={signUpShow} placement={'end'} onHide={handleClose} >
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Sign Up</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    {message ? <>
                        <span>{message}</span>
                    </> : <>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-group mb-2">
                                <label htmlFor="email">Email address</label>
                                <input defaultValue="" {...register("email", { required: true })} type="email" className="form-control" name="email" id="email" aria-describedby="emailHelp" placeholder="Enter email" />
                                {errors.email && <><span>This field is required</span><br /></>}
                                <small id="email" className="form-text text-muted">We'll never share your email with anyone else.</small>
                            </div>
                            <div className="form-group mb-2">
                                <label htmlFor="username">Username</label>
                                <input defaultValue="" {...register("username", { required: true })} type="text" className="form-control" id="username" name="username" aria-describedby="emailHelp" placeholder="Enter username" />
                                {errors.username && <span>This field is required</span>}
                            </div>
                            <div className="form-group mb-2">
                                <label htmlFor="phone">Phone Number</label>
                                <input defaultValue="" {...register("phone", { required: true })} type="number" className="form-control" id="phone" name='phone' aria-describedby="emailHelp" placeholder="Enter phone" />
                                {errors.phone && <span>This field is required</span>}
                            </div>
                            <div className="form-group mb-2">
                                <label htmlFor="password">Password</label>
                                <input defaultValue="" {...register("password", { required: true })} type="password" className="form-control" id="password" name='password' aria-describedby="password" placeholder="Enter password" />
                                {errors.password && <span>This field is required</span>}
                            </div>
                            <button type="submit" className="btn btn-primary">Join Now</button>
                        </form>
                    </>}

                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
};

export default SignUp;