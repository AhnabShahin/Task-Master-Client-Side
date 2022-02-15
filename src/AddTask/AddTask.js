import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Container, Offcanvas } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { menu } from '../home/menu';
import { activeMenuAction } from '../redux/actions/actions';


const AddTask = ({ user, handleLoginShow }) => {
    const [successMassage, setSuccessMassage] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { register, handleSubmit, watch,reset, formState: { errors } } = useForm();
    const onSubmit = data => {
        let due_date = {
            time: data.due_date.split('T')[1],
            year: data.due_date.split('T')[0].split('-')[0],
            month: data.due_date.split('T')[0].split('-')[1],
            date: data.due_date.split('T')[0].split('-')[2],
        }
        data.due_date = JSON.stringify(due_date);

        axios({
            method: 'post',
            url: 'http://127.0.0.1:8000/api/create',
            data: data,
            headers: {
                'Authorization': `Bearer ${user.token}`,
            }
        }).then(res => {
            console.log(res.data.message)
            setSuccessMassage(res.data.message)
        })
        reset()
    };
    useEffect(() => {
        if (!user.username) {
            handleLoginShow();
            navigate('/');
        }
        dispatch(activeMenuAction({ ...menu, addtask: true }))
    }, [user])
    return (
        <Container>
            {successMassage ?
                <p className="text-primary my-3">Task is Added Successfully</p> :''
            }
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group my-2">
                        <label htmlFor="title">Task title</label>
                        <input defaultValue="" {...register("title", { required: true })} type="text" className="form-control" name="title" id="title" aria-describedby="title" placeholder="Enter task title" />
                        {errors.title && <><span>This field is required</span><br /></>}

                    </div>
                    <div className="form-group mb-2">
                        <label htmlFor="due_date">Due Date</label>
                        <input defaultValue="" {...register("due_date", { required: true })} type="datetime-local" className="form-control" id="due_date" name="due_date" aria-describedby="due_date" placeholder="Enter due date" />
                        {errors.due_date && <span>This field is required</span>}
                    </div>
                    <div className="form-group mb-2">
                        <label htmlFor="duration">Duration in Munites</label>
                        <input defaultValue="" {...register("duration", { required: true })} type="number" className="form-control" id="duration" name='duration' aria-describedby="duration" placeholder="Enter duration time" />
                        {errors.duration && <span>This field is required</span>}
                    </div>
                    <div className="form-group mb-2">
                        <label htmlFor="type">Progress</label>
                        <input defaultValue="0" {...register("progress", { required: true, max: 100, min: 0 })} type="number" className="form-control" id="progress" name='progress' aria-describedby="progress" placeholder="Enter progress" max="100" min="0" />
                        {errors.progress && <span>This field is required</span>}
                    </div>
                    <div className="form-group mb-2">
                        <label htmlFor="type">Type</label>
                        <input defaultValue="" {...register("type", { required: true })} type="type" className="form-control" id="type" name='type' aria-describedby="type" placeholder="Enter type" />
                        {errors.type && <span>This field is required</span>}
                    </div>
                    <button type="submit" className="btn btn-primary">ADD NOW</button>
                </form>
          

        </Container>
    );
};

export default AddTask;