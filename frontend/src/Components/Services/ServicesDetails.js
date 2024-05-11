import React, { Fragment, useEffect } from 'react';
import './ServicesDetails.css';
import MetaData from '../Layout/MetaData/MetaData.js';
import { servicesDetailsAction , clearErrors } from '../../actions/servicesAction.js';
import { useDispatch , useSelector } from 'react-redux';
import {useAlert} from 'react-alert';
import Loader from '../Layout/Loader/Loader.js';
import {useParams} from 'react-router-dom';
import './ServicesDetailsCard.css';



const ServicesDetails = () => {

  const dispatch = useDispatch();
  const alert = useAlert();
  const {loading,error,service} = useSelector((state)=>state.servicesDetails);
  const {id} = useParams()


  useEffect(()=>{
    if (error) {
      alert.error(error);
      dispatch(clearErrors())
    };
    dispatch(servicesDetailsAction(id));
  },[alert,error,dispatch,id])
  return (
  <Fragment>
    {
      loading ? (<Loader/>):(
        <Fragment>
        <MetaData title={`${service.name && service.name} - AJ Programmers`} />
          <div className="servicesDetailsContainer">
            <div className='topServiceDetailsContainer'>
              <h1>{service && service.title}</h1>
              <p>{ service && service.subtitle}</p>
            </div>
            <div className='bottomServiceDetailsContainer'>
            <div className="servicesDetailsCardContainer" >
        <h1>{ service && service.descriptiontitle}</h1>

            <div>
                <img src={service.descriptionImage && service.descriptionImage.url} alt={service.title} /> 
                <p>{service && service.subDescription}</p>
            </div>
        </div>
            </div> 
          </div>
          <div className='chooseUsContainer'>
            <h1>Why you choose us</h1>
            <ul>
              <li>With a wide range of services including web design & development, SEO, e-commerce development, digital marketing, and graphic designing, we offer a one-stop solution for all your digital needs.</li>
              <li>Our commitment to our clients doesn't end with project delivery. We provide continuous support and maintenance to ensure that their digital assets remain up-to-date and secure.</li>
              <li>Our team of highly skilled professionals is dedicated to delivering exceptional results, ensuring that every project is completed with precision and excellence.</li>
              <li>Over the years, we have built a reputation for delivering high-quality solutions that exceed our clients' expectations, earning us their trust and loyalty.</li>
              <li>We prioritize our clients' needs and requirements, ensuring that we deliver solutions that are tailored to their specific goals and objectives.</li>
              <li>We constantly strive to stay ahead of the curve by adopting the latest technologies and trends, providing our clients with innovative solutions that give them a competitive edge.</li>
            </ul>
          </div>
      </Fragment>
      )
    }
  </Fragment>
  )
}

export default ServicesDetails