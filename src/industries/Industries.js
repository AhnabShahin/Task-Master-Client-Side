import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BusinessTransformation from './../../src/assets/images/BusinessTransformation.jpg'
import { activeMenuAction } from './../redux/actions/actions';
import { menu } from './../home/menu';

const Industries = () => {
    const activeMenu = useSelector(state => state.activeMenuReducer)
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(activeMenuAction({...menu,industry:true }))
    },[])
    return (
        <div className='industries-dropdown'>
            <div className="industries-grid-container">
                <div className="grid-item">
                    <div className="img">
                        <img src={BusinessTransformation} alt="" />
                    </div>
                    <h5>Business transformation</h5>
                    <p>Develop the strategic value of your people, processes, and technology.</p>
                </div>
                <div className="grid-item">
                    <div className="img">
                        <img src={BusinessTransformation} alt="" />
                    </div>
                    <h5>Business transformation</h5>
                    <p>Develop the strategic value of your people, processes, and technology.</p>
                </div>
                <div className="grid-item">
                    <div className="img">
                        <img src={BusinessTransformation} alt="" />
                    </div>
                    <h5>Business transformation</h5>
                    <p>Develop the strategic value of your people, processes, and technology.</p>
                </div>
                <div className="grid-item">
                    <div className="img">
                        <img src={BusinessTransformation} alt="" />
                    </div>
                    <h5>Business transformation</h5>
                    <p>Develop the strategic value of your people, processes, and technology.</p>
                </div>
                <div className="grid-item">
                    <div className="img">
                        <img src={BusinessTransformation} alt="" />
                    </div>
                    <h5>Business transformation</h5>
                    <p>Develop the strategic value of your people, processes, and technology.</p>
                </div>
                <div className="grid-item">
                    <div className="img">
                        <img src={BusinessTransformation} alt="" />
                    </div>
                    <h5>Business transformation</h5>
                    <p>Develop the strategic value of your people, processes, and technology.</p>
                </div>
                <div className="grid-item">
                    <div className="img">
                        <img src={BusinessTransformation} alt="" />
                    </div>
                    <h5>Business transformation</h5>
                    <p>Develop the strategic value of your people, processes, and technology.</p>
                </div>
            </div>
        </div>
    );
};

export default Industries;