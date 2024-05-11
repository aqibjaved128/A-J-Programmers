import React, { Fragment, useEffect, useState } from 'react'
import './OurProjects.css';
import OurProjectsCard from './OurProjectsCard';
import Pagination from 'react-js-pagination';
import MetaData from '../Layout/MetaData/MetaData';
import {useDispatch , useSelector} from 'react-redux';
import Loader from '../Layout/Loader/Loader';
import { allProjectsAction , clearErrors } from '../../actions/projectsAction';
import {useAlert} from 'react-alert';




const OurProjects = () => {

    const dispatch = useDispatch();
    const [currentPage , setCurrentPage] = useState(1);
    const [category, setCategory] = useState("");
    const {loading,error,projects , projectsCount , resultPerPage} = useSelector((state)=>state.projects);
    const alert = useAlert();


    const removeFilters = () => {
        window.location.reload();
    }
  
    const categories = [
        "Design","Social Media","Software","Web","Corporates","International Projects","Others"
    ]
    
    useEffect(()=>{
        if (error) {
             alert.error(error)
             dispatch(clearErrors());
        } 
      dispatch(allProjectsAction(currentPage,category))
    },[dispatch,alert,error,currentPage,category]);
  return (
    <Fragment>
        {
            loading ? (<Loader/>):(
                <Fragment>
                <MetaData title={`Our Projects - AJ Programmers`} />
                <div className="ourProjectsContainer">
                    <div className='topProjectContainer'>
                        <h1>Our Projects & Portfolio.</h1>
                        <p>Putting a plan into action, to assure your satisfaction!</p>
                    </div>
                    <div className='midProjectContainer'>
                    <button className='categoryFilter removeFilter' onClick={removeFilters}>All</button>

                        {
                            categories && categories.map((category)=>(
                                <ul key={category} onClick={()=>setCategory(category)} className='categoryFilter'>
                                    <li>{category} </li>
                                </ul>
                            ))
                        }
                    </div>
                    <div className='bottomProjectContainer' >
                        {
                            projects && projects.map((project)=>(<OurProjectsCard 
                                project={project} 
                                key={project._id} 
                                />))
                        }
                        </div>
        
                        <div className="paginationContainer">
                        <Pagination
                        activePage={currentPage}
                        itemsCountPerPage={resultPerPage}
                        totalItemsCount={projectsCount}
                        onChange={(e)=>setCurrentPage(e)}
                        nextPageText={"Next"}
                        firstPageText={"1st"}
                        lastPageText={"Last"}
                        prevPageText={"Prev"}
                        itemClass='item-class'
                        linkClass='item-link'
                        activeClass='active-item'
                        activeLinkClass='active-link'
                         />
                    </div>    
                </div>
               
            </Fragment>
            )
        }
    </Fragment>
  )
}

export default OurProjects