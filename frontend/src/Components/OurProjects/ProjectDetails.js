import React, { Fragment, useEffect } from 'react';
import './ProjectDetails.css';
import Carousel from 'react-material-ui-carousel';
import MetaData from '../Layout/MetaData/MetaData';
import { getProjectDetailsActions , clearErrors } from '../../actions/projectsAction';
import {useDispatch , useSelector} from 'react-redux';
import {useAlert} from 'react-alert';
import Loader from '../Layout/Loader/Loader';
import {useParams} from 'react-router-dom';


const ProjectDetails = () => {
    const dispatch = useDispatch();
    const {error,loading , project} = useSelector((state)=>state.projectDetails);
    const alert = useAlert();

    const {id} = useParams();

    useEffect(()=>{
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        dispatch(getProjectDetailsActions(id))
    },[error,dispatch,alert,id]);
  return (
   <Fragment>
    {
        loading ? (<Loader/>):(
            <Fragment>
            <MetaData title={`Our Project Details - AJ Programmers`} />
            <div className="projectDetailsContainer">
                <div>
                    <Carousel
                          indicators={false} 
                    >
                        {project.images && project.images.map((pro)=>(
                            <img src={pro.url} alt={project.name} key={project._id} className='carouselImage' />
                        ))}
                    </Carousel>
                </div>
                <div>
                    <div>
                        <h3>  {project && project.name}</h3>
                        <p>Project Id # {project._id}</p>
                    </div>
                    <div>
                        <h3>TechStack : </h3>
                        <p>{project && project.techStack}</p>
                    </div>
                    <div>
                        <h3>Description :</h3>
                        <p>{project && project.description}</p>
                    </div>
                
                </div>
    
            </div>
        </Fragment>
        )
    }
   </Fragment>
  )
}

export default ProjectDetails