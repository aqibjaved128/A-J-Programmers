import React, { Fragment, useEffect } from 'react';
import {DataGrid} from '@material-ui/data-grid';
import Sidebar from './Sidebar';
import MetaData from '../Layout/MetaData/MetaData';
import DeleteIcon from '@material-ui/icons/Delete';
import { Button } from '@material-ui/core';
import './AdminServices.css';
import {useDispatch,useSelector} from 'react-redux';
import {useAlert} from 'react-alert';
import { deleteServiceAction , clearErrors } from '../../actions/servicesAction';
import { DELETE_SERVICE_RESET } from '../../constants/servicesConstants';
import Loader from '../Layout/Loader/Loader';
import { useNavigate } from 'react-router-dom';

const AdminServices = () => {

  const dispatch = useDispatch();
  const alert = useAlert();
    const {services} = useSelector((state)=>state.services);
    const {loading,success,message,error} = useSelector((state)=>state.deleteService);
    const history = useNavigate();

    const columns = [
        {
         field:"id",
         headerName:"Service ID",
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
           
              <Button onClick={()=>deleteServiceHandler(params.getValue(params.id,"id"))}>
                <DeleteIcon/>
              </Button>
            </Fragment>
          )
        }
      }
    ];

    const rows = [];
    services && services.forEach((service) =>{
        rows.push({
            id: service._id,
            name: service.name
        })
    })

    const deleteServiceHandler = (id) => {
      dispatch(deleteServiceAction(id))
    }

   useEffect(()=>{
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (message) {
      alert.success(message);
    }
    if (success) {
      history(`/dashboard`);
      dispatch({
        type:DELETE_SERVICE_RESET
      })
    }
   },[alert,dispatch,error,success,message,history]); 
  return (
    <Fragment>
      {
        loading ? (<Loader/>):(
          <Fragment>
          <MetaData title={"ALL SERVICES - Admin"} />
      <div className="dashboard">
        <Sidebar/>
        <div className="productListContainer">
          <h1 id='productListHeading'>ALL SERVICES</h1>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className='productListTable'
            autoHeight
          />
        </div>
      </div>
    </Fragment>
        )
      }
    </Fragment>
  )
}

export default AdminServices