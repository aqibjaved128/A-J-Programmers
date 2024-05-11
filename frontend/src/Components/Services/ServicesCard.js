import React, { Fragment, useEffect } from 'react';
import {Link} from 'react-router-dom';
import './ServicesCard.css';
import AOS from 'aos';
import 'aos/dist/aos.css';


const ServicesCard = ({service}) => {

  useEffect(()=>{
    AOS.init()
  },[])
 
  return (
    <Fragment>
        <Link to={`/service/${service.nameLink}/${service._id}`} className='serviceCardContainer' data-aos = "fade-down" >
            <div>
            <img src={service.logoImage.url} alt={service.name} />

            </div>
            <div>
              <h3>{service.name}</h3>
              <p>{service.miniDescription}</p>
            </div>
        </Link>
    </Fragment>
  )
}
export default ServicesCard