import React, { Fragment, useEffect } from 'react';
import Loader from '../Layout/Loader/Loader';
import {DataGrid} from '@material-ui/data-grid';
import Sidebar from './Sidebar';
import MetaData from '../Layout/MetaData/MetaData';
import { Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import {  useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { clearErrors, contactPageDetailsAction , deleteContactAction } from '../../actions/contactUsAction';
import { DELETE_CONTACT_RESET } from '../../constants/contactUsConstants';
import {useNavigate} from 'react-router-dom';

const AdminContact = () => {

    const alert = useAlert();
    const dispatch = useDispatch();
    const {loading,error,contact} = useSelector((state)=>state.contactDetails);
    const {error:deleteError,message,success} = useSelector((state)=>state.createContact);
    const history = useNavigate();

    const deleteSubmitHandler = (id) => {
        dispatch(deleteContactAction(id));
    }

    const columns = [
        {
         field:"id",
         headerName:"Service ID",
         minWidth:435,
         flex:1.5
        },
       {
        field:"country",
        headerName:"Country",
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
           
              <Button onClick={()=>deleteSubmitHandler(params.getValue(params.id,"id"))}>
                <DeleteIcon/>
              </Button>
            </Fragment>
          )
        }
      }
    ];


    const rows = [];

    contact && contact.forEach((row)=>{
        rows.push({
            id: row._id,
            country: row.country
        })
    })

    useEffect(()=>{
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        };
        if (deleteError) {
            alert.error(deleteError);
            dispatch(clearErrors());
         };
         if (success) {
            alert.success(message);
            history(`/dashboard`);
            dispatch({
                type:DELETE_CONTACT_RESET
            })
         }
        dispatch(contactPageDetailsAction());
    },[error,alert,dispatch,history,message,success,deleteError]);
  return (

    <Fragment>
    {
      loading ? (<Loader/>):(
        <Fragment>
        <MetaData title={"All Contact Details - Admin"} />
    <div className="dashboard">
      <Sidebar/>
      <div className="productListContainer">
        <h1 id='productListHeading'>ALL Contact Details</h1>
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

export default AdminContact