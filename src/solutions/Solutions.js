import React, { useEffect } from 'react';
import { IoIosArrowForward } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { menu } from '../home/menu';
import { activeMenuAction } from '../redux/actions/actions';
import AdvisoryAndConsulting from './AdvisoryAndConsulting/AdvisoryAndConsulting';
import CloudServices from './CloudServices/CloudServices';
import ContactCentres from './ContactCentres/ContactCentres';



const Solutions = () => {
    const activeMenu = useSelector(state => state.activeMenuReducer)
    const {advisoryAndConsulting, cloudServicess,contactCentres} = useSelector(state => state.solutionActiveMenuReducer)

    const dispatch = useDispatch();
    const navigate = useNavigate()
    useEffect(() => {
        dispatch(activeMenuAction({ ...menu, solution: true }))
    }, [])
    return (
        <div className='solutions-dropdown'>
            <div className="solutions-menu">
                <div className={advisoryAndConsulting?'active':''} onClick={() => (navigate('advisory-and-consulting'))}>
                    <span>Advisory & consulting</span>
                    <IoIosArrowForward />
                </div>
                <div className={cloudServicess?'active':''} onClick={() => (navigate('cloud-services'))}>
                    <span>Cloud Servicess</span>
                    <IoIosArrowForward />
                </div>
                <div className={contactCentres?'active':''} onClick={() => (navigate('contact-centres'))}>
                    <span>Contact Centres</span>
                    <IoIosArrowForward />
                </div>
                
            </div>
            <Routes>
                <Route path='advisory-and-consulting' element={<AdvisoryAndConsulting />} />
                <Route path='cloud-services' element={<CloudServices />} />
                <Route path='contact-centres' element={<ContactCentres />} />

            </Routes>

        </div>
    );
};

export default Solutions;