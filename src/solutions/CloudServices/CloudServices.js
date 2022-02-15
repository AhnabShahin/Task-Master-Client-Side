import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { solutionMenu } from '../../home/menu';
import { solutionActiveMenuAction } from '../../redux/actions/actions';
import BusinessTransformation from './../../assets/images/BusinessTransformation.jpg'

const CloudServices = () => {
    const dispatch = useDispatch();
    const solutionActiveMenu = useSelector(state => state.solutionActiveMenuReducer)
    useEffect(() => {
        dispatch(solutionActiveMenuAction({ ...solutionMenu, cloudServicess: true }))
    }, [])
    return (
        <div className="grid-container">
            <div className="grid-item">
                <div className="img">
                    <img src={BusinessTransformation} alt="" />
                </div>
                <h5>Cloud Consulting</h5>
                <p>Develop the strategic value of your people, processes, and technology.</p>
            </div>
            <div className="grid-item">
                <div className="img">
                    <img src={BusinessTransformation} alt="" />
                </div>
                <h5>Cloud Consulting</h5>
                <p>Develop the strategic value of your people, processes, and technology.</p>
            </div>
        </div>
    );
};

export default CloudServices;