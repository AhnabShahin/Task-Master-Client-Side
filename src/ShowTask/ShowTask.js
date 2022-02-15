import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Container, Offcanvas } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import './ShowTask.css';

const ShowTask = ({ user,tasks,setTasks }) => {

    const [selectTask, setSelectTask] = useState({});
    const [recentChange, setRecentChange] = useState(null);
    
    const [editTask, setEditTask] = useState(false);
    const { register, handleSubmit, watch,reset, formState: { errors } } = useForm();
    const handleClose = () => (setEditTask(false));

    useEffect(() => {
        if (user.token) {
            axios.get(`http://127.0.0.1:8000/api/tasks`, { headers: { "Authorization": `Bearer ${user.token}` } })
                .then(res => {
                    setTasks(res.data)
                })
        }
        else {
            setTasks([])
        }
    }, [user, recentChange,selectTask]);

    const handleDelete = (id) => {
        axios.delete(`http://127.0.0.1:8000/api/delete/${id}`, { headers: { "Authorization": `Bearer ${user.token}` } })
            .then(res => {
                setRecentChange(id)
            })
    }
    const HandleSelectTask = (task) => {
        
        setSelectTask(task);
        setEditTask(true);
    }
    const onSubmit = data => {
        let due_date = {
            time: data.due_date.split('T')[1],
            year: data.due_date.split('T')[0].split('-')[0],
            month: data.due_date.split('T')[0].split('-')[1],
            date: data.due_date.split('T')[0].split('-')[2],
        }
        data.due_date = JSON.stringify(due_date);
        console.log(data)
        axios({
            method: 'post',
            url: `http://127.0.0.1:8000/api/update/${selectTask.id}`,
            data: data,
            headers: {
                'Authorization': `Bearer ${user.token}`,
            }
        }).then(res => {
            console.log(res)
            setRecentChange(selectTask);
            setEditTask(false)
            reset();
        })
    }
    return (
        <>
            <Offcanvas show={editTask} placement={'start'} onHide={handleClose} >
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Edit Task</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group my-2">
                            <label htmlFor="title">Task title</label>
                            <input defaultValue={selectTask.title}  type="text" className="form-control" name="title" id="title" aria-describedby="title" disabled  placeholder="Enter task title" />
                            {errors.title && <><span>This field is required</span><br /></>}
                        </div>
                        <div className="form-group mb-2">
                            <label htmlFor="due_date">Due Date</label>
                            <input defaultValue={selectTask.due_date}  {...register("due_date", { required: true })} type="datetime-local" className="form-control" id="due_date" name="due_date" aria-describedby="due_date" placeholder="Enter due date" />
                            {errors.due_date && <span>This field is required</span>}
                        </div>
                        <div className="form-group mb-2">
                            <label htmlFor="duration">Duration in Munites</label>
                            <input defaultValue={selectTask.duration} {...register("duration", { required: true })} type="number" className="form-control" id="duration" name='duration' aria-describedby="duration" placeholder="Enter duration time" />
                            {errors.duration && <span>This field is required</span>}
                        </div>
                        <div className="form-group mb-2">
                            <label htmlFor="type">Progress</label>
                            <input defaultValue={selectTask.progress} {...register("progress", { required: true, max: 100, min: 0 })} type="number" className="form-control" id="progress" name='progress' aria-describedby="progress" placeholder="Enter progress" max="100" min="0" />
                            {errors.progress && <span>This field is required</span>}
                        </div>
                        <div className="form-group mb-2">
                            <label htmlFor="type">Type</label>
                            <input defaultValue={selectTask.type} {...register("type", { required: true })} type="type" className="form-control" id="type" name='type' aria-describedby="type" placeholder="Enter type" />
                            {errors.type && <span>This field is required</span>}
                        </div>
                        <button type="submit" className="btn btn-primary">Edit NOW</button>
                    </form>
                </Offcanvas.Body>
            </Offcanvas>
            <Container>
                {tasks.length > 0 ?
                    <table className="table">
                        <thead>
                            <tr>
                                <th>NO</th>
                                <th>Title</th>
                                <th>Due Date</th>
                                <th>Duration</th>
                                <th>Type</th>
                                <th>Progress</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                tasks.map((task, index) => (
                                    <tr key={task.id} className="table-info">
                                        <td>{index + 1}</td>
                                        <td>{task.title}</td>
                                        <td>{Object.keys(JSON.parse(task.due_date)).map(key => (`${key}-${JSON.parse(task.due_date)[key]} `))}</td>
                                        <td>{task.duration}</td>
                                        <td>{task.type}</td>
                                        <td className={task.progress<100?'text-danger':''} >{task.progress}%</td>
                                        <td onClick={() => (HandleSelectTask(task))} className='cursor-pointer'><AiFillEdit /></td>
                                        <td onClick={() => (handleDelete(task.id))} className='cursor-pointer'><AiFillDelete /></td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                    : ''}
            </Container>
        </>
    );
};

export default ShowTask;