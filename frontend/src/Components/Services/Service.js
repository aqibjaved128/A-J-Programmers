import React, { Fragment, useEffect } from 'react';
import ServicesCard from './ServicesCard.js';
import './Service.css';
import MetaData from '../Layout/MetaData/MetaData.js';
import {useAlert} from 'react-alert';
import {useDispatch,useSelector} from 'react-redux';
import { allservicesAction,clearErrors } from '../../actions/servicesAction.js';
import Loader from '../Layout/Loader/Loader.js';


const Service = () => {

    const alert = useAlert();
    const dispatch = useDispatch();
    const {loading,error,services} = useSelector((state)=>state.services);

    useEffect(()=>{
        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        };
        dispatch(allservicesAction());
    },[alert,error,dispatch])
  return (
    <Fragment>
        {
            loading ? (<Loader/>):(
                <Fragment>
                <MetaData title={`Our Services - AJ Programmers`} />
                <div className="servicesContainer">
                    <div className='topServicesContainer'>
                        <h1> Digital  Services We Offer </h1>
                        <p>Website Development Services, We strive to create a dialogue with our clients and their customers, by partnering with them to create meaningful interactions or to transform great ideas into successful results through challenging convention and smartly innovating. And we do all of this because we can.</p>
                    </div>
                    <div className='bottomServicesContainer'>
                        {
                            services && services.map((service)=>(
                                <ServicesCard service={service} key={service._id} />
                            ))
                        }
                    
                    </div>
                </div>
            </Fragment>
            )
        }
    </Fragment>
  )
}

export default Service