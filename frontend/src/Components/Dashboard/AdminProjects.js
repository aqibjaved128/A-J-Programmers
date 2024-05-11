import React, { Fragment, useEffect } from 'react'
import Loader from '../Layout/Loader/Loader';
import Sidebar from './Sidebar';
import { DataGrid } from '@material-ui/data-grid';
import MetaData from '../Layout/MetaData/MetaData';
import DeleteIcon from '@material-ui/icons/Delete';
import { Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { clearErrors , getAdminProjectsAction , deleteProjectAction} from '../../actions/projectsAction';
import { DELETE_PROJECT_RESET } from '../../constants/projectConstants';
import { useNavigate } from 'react-router-dom';


const AdminProjects = () => {

    const {loading,error,projects} = useSelector((state)=>state.getAdminProjects);
    const {error:deleteError,success,message} = useSelector((state)=>state.deleteProjects);

    const alert = useAlert();
    const dispatch = useDispatch();
    const history = useNavigate();

    const deleteProjectHandler = (id) => {
        dispatch(deleteProjectAction(id))
    }

    const columns = [
        {
         field:"id",
         headerName:"Project ID",
         minWidth:435,
         flex:1.5
        },
       {
        field:"name",
        headerName:"Name",
        minWidth:400,
        flex:1
      },
      {
        field:"actions",
        headerName:"Actions",
        flex:0.3,
        minWidth:200,
        sortable:false,
        renderCell:(params)=>{
          return (
            <Fragment>
           
              <Button onClick={()=>deleteProjectHandler(params.getValue(params.id,"id"))}>
                <DeleteIcon/>
              </Button>
            </Fragment>
          )
        }
      }
    ];

    const rows = [];
    projects && projects.forEach((project) => {
        rows.push({
            id: project._id,
            name: project.name
        })
    })

    useEffect(()=>{
        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        };
        if (deleteError) {
            alert.error(deleteError);
            dispatch(clearErrors())
        }
        if (success) {
            alert.success(message);
            history(`/dashboard`);
            dispatch({
                type:DELETE_PROJECT_RESET
            })
        }
        dispatch(getAdminProjectsAction());

    },[dispatch,alert,error,deleteError,success,message,history]);

  return (
    <Fragment>
    {
        loading ? (<Loader/>):(
            <Fragment>
            <MetaData title={"All Projects - Admin"} />
        <div className="dashboard">
          <Sidebar/>
          <div className="productListContainer">
            <h1 id='productListHeading'>ALL Projects</h1>
            <DataGrid
              rows={rows}
              columns={columns}
              disableSelectionOnClick
              className='productListTable'
              autoHeight
              pageSize={20}

            />
          </div>
        </div>
      </Fragment>
        )
    }
   </Fragment>
     )
}

export default AdminProjects