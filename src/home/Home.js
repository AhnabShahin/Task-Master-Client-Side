import React, { useEffect, useState } from 'react';
import logo from '../../src/logo.png';
import { BiSearch } from 'react-icons/bi';
import Solutions from './../solutions/Solutions';
import Industries from './../industries/Industries';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { activeMenuAction } from '../redux/actions/actions';
import { menu } from './menu';
import { Container, Offcanvas, Spinner } from 'react-bootstrap';
import SignUp from './../SignUp/SignUp';
import Login from '../Login/Login';
import axios from 'axios';
import AddTask from '../AddTask/AddTask';
import ShowTask from './../ShowTask/ShowTask';
import { useForm } from 'react-hook-form';



const Home = () => {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);

    const [tasks, setTasks] = useState([]);

    const [loginShow, setLoginShow] = useState(false);
    const [signUpShow, setSignUpShow] = useState(false);
    const [searchShow, setSearchShow] = useState(false);

    const handleClose = () => (setLoginShow(false), setSignUpShow(false), setSearchShow(false));
    const handleLoginShow = () => setLoginShow(true);
    const handleSignUpShow = () => setSignUpShow(true);
    const handleSearchShow = () => setSearchShow(true);

    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();

    const activeMenu = useSelector(state => state.activeMenuReducer)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        let userDataString = localStorage.getItem("userData");
        let userData = JSON.parse(userDataString);
        setUser(userData ? userData : {});
        setLoading(false);
    }, []);
    const handleLogOut = () => {
        axios.get(`http://127.0.0.1:8000/api/logout`, { headers: { "Authorization": `Bearer ${user.token}` } })
            .then(res => {
                localStorage.removeItem('userData');
                setUser({})
            })
    }
    const onSubmit = data => {
        var result=tasks;
        if(data.year){
            result = tasks.filter(task=>(parseInt(JSON.parse(task.due_date).year)==parseInt(data.year)));
        }
        if(data.month){
            result = tasks.filter(task=>(parseInt(JSON.parse(task.due_date).month)==parseInt(data.month)));
        }
        if(data.date){
            result = tasks.filter(task=>(parseInt(JSON.parse(task.due_date).date)==parseInt(data.date)));
        }
        setTasks(result);
        reset()
    };
    if (loading) {
        return <Spinner animation="grow" variant="info" />
    }
    return (
        <>
            <div className="nav-section">
                <header className='c-navbar'>
                    <a onClick={() => (
                        navigate(''),
                        dispatch(activeMenuAction({ ...menu, home: true }))
                    )} className='logo'><img src={logo} alt="" /></a>
                    <nav className='c-nav'>
                        <div onClick={() => (navigate('add-task'))}>
                            <a>Add Task</a>
                            {activeMenu.addtask ?
                                <span style={{ display: 'block' }}></span>
                                : ''}
                        </div>
                        <div onClick={() => (navigate('solutions'))}>
                            <a>Solution</a>
                            {activeMenu.solution ?
                                <span style={{ display: 'block' }}></span>
                                : ''}
                        </div>
                        <div onClick={() => (navigate('industries'))}>
                            <a >Industry</a>
                            {activeMenu.industry ?
                                <span style={{ display: 'block' }}></span>
                                : ''}
                        </div>

                        <div><a href="">About Us</a></div>
                        <div><a href="">Careers</a></div>
                    </nav>
                    <div className='sign-in-search'>
                        {user['username'] ?
                            <>
                                <div onClick={handleSearchShow} className='search me-2'><BiSearch /></div>
                                <Offcanvas show={searchShow} placement={'end'} onHide={handleClose} >
                                    <Offcanvas.Header closeButton>
                                        <Offcanvas.Title>Search</Offcanvas.Title>
                                    </Offcanvas.Header>
                                    <Offcanvas.Body>
                                        <p>Filter By</p>
                                        <ul>
                                            <li>Due Year</li>
                                            <li>Due Month</li>
                                            <li>Due Date</li>
                                        </ul>
                                        <form onSubmit={handleSubmit(onSubmit)}>
                                            <div className="form-group my-3">
                                                <label htmlFor="date">Task Year</label>
                                                <input defaultValue="" {...register("year", { })} type="number" className="form-control" name="year" id="year" aria-describedby="date" placeholder="Enter task year" />
                                                {errors.year && <><span>This field is required</span><br /></>}
                                            </div>
                                            <div className="form-group my-3">
                                                <label htmlFor="date">Task Month</label>
                                                <input defaultValue="" {...register("month", { })} type="number" className="form-control" name="month" id="month" aria-describedby="date" placeholder="Enter task month" />
                                                {errors.month && <><span>This field is required</span><br /></>}
                                            </div>
                                            <div className="form-group my-3">
                                                <label htmlFor="date">Task Date</label>
                                                <input defaultValue="" {...register("date", { })} type="number" className="form-control" name="date" id="date" aria-describedby="date" placeholder="Enter task date" />
                                                {errors.date && <><span>This field is required</span><br /></>}
                                            </div>
                                            <button type="submit" className="btn btn-primary">Search</button>
                                        </form>
                                    </Offcanvas.Body>
                                </Offcanvas>
                                <a ><span>{user.username}</span></a>
                                <a onClick={handleLogOut}><span>Logout</span></a>
                            </> : <>
                                <a onClick={handleLoginShow}><span>Login</span></a>
                                <Login loginShow={loginShow} user={user} setUser={setUser} handleClose={handleClose} />
                                <a onClick={handleSignUpShow}><span>Sign up </span></a>
                                <SignUp signUpShow={signUpShow} user={user} setUser={setUser} handleClose={handleClose} />
                            </>
                        }
                    </div>

                    <Routes>
                        <Route path='solutions/*' element={<Solutions />} />
                        <Route path='industries' element={<Industries />} />
                    </Routes>
                </header>

                <Routes>
                    <Route path='/' element={<ShowTask user={user} setTasks={setTasks} tasks={tasks} />} />
                    <Route path='add-task' element={<AddTask handleLoginShow={handleLoginShow} user={user} />} />
                </Routes>

            </div>
        </>
    );
};


export default Home;