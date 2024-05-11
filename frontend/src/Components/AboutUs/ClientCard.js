import React, { Fragment, useEffect } from 'react';
import './ClientCard.css';
import AOS from 'aos';
import 'aos/dist/aos.css';


const ClientCard = ({clientCardDetails}) => {

    useEffect(()=>{
        AOS.init()
      },[])
  return (
    <Fragment>
         <div className='clientCardContainer' data-aos = "fade-down">
               
               <div>
                   <img src={clientCardDetails.image && clientCardDetails.image.url} alt={clientCardDetails.title} />
               </div>

               <div>
                   <h2>{clientCardDetails.title}</h2>
                   <h3>{clientCardDetails.subtitle}</h3>
               </div>
           </div>
    </Fragment>
  )
}

export default ClientCard