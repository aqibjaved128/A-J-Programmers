import React, { Fragment, useEffect } from 'react';
import {Link} from 'react-router-dom';
import './OurProjectCard.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

const OurProjectsCard = ({project}) => {

  useEffect(()=>{
    AOS.init()
  },[])
 
  return (
    <Fragment>
        <Link to={`/project/${project._id}`} className='ourProjectCardContainer' data-aos = "fade-down" >
            <div>
                <img src={project.images[0].url} alt={project.name} />
            </div>
            <div>
              <p>{project.name}</p>
            </div>
        </Link>
    </Fragment>
  )
}

export default OurProjectsCard