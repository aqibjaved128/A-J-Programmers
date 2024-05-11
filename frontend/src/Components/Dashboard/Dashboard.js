import React, { Fragment, useEffect } from 'react';
import './Dashboard.css';
import Sidebar from './Sidebar.js';
import {Link} from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import MetaData from '../Layout/MetaData/MetaData.js';
import {useDispatch,useSelector} from 'react-redux';
import { allTeamMembersAction , clearErrors } from '../../actions/aboutUsAction.js';
import { allProjectsAction  } from '../../actions/projectsAction';
import {useAlert} from 'react-alert';
import Loader from '../Layout/Loader/Loader.js';


const Dashboard = () => {

  const dispatch = useDispatch();
  const {loading,cardsCount,error} = useSelector((state)=>state.memberCards)
  const alert = useAlert();
  const { projectsCount } = useSelector((state)=>state.projects);
    const {servicesCount} = useSelector((state)=>state.services);


  useEffect(()=>{
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(allTeamMembersAction());
    dispatch(allProjectsAction());
  },[alert, error,dispatch]);
  return (
    <Fragment>
      {
        loading ? (<Loader/>):(
          <Fragment>
          <MetaData title={"Dashboard - Admin Panel"} />
           <div className="dashboard">
               <Sidebar/>
               <div className='dashboardContainer' >
               <Typography component={"h1"}>Dashboard</Typography>
               <div className="dashboardSummary">
                 <div>
                   <p>
                     Total Team Members <br /> {cardsCount && cardsCount} </p>
                 </div>
                 <div className="dashboardSummaryBox2">
                   <Link>
                   <p>Admins</p>
                   <p>2</p>
                   </Link>
                   <Link  to={"/admin/projects"}>
                     <p>Projects</p>
                     <p>{projectsCount && projectsCount}</p>
                   </Link>
                   <Link to={"/admin/services"}>
                     <p>Services</p>
                     <p>{servicesCount && servicesCount}</p>
                   </Link>
                 </div>
               </div>
            
               </div>
           </div>
          </Fragment>
        )
      }
    </Fragment>
  )
}

export default Dashboard