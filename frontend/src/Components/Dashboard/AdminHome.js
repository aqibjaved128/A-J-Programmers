import React, { Fragment, useEffect } from 'react'
import MetaData from '../Layout/MetaData/MetaData';
import {DataGrid} from '@material-ui/data-grid';
import { Button } from '@material-ui/core';
import Sidebar from './Sidebar';
import Loader from '../Layout/Loader/Loader';
import DeleteIcon from '@material-ui/icons/Delete';
import {  useDispatch , useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { homeDetailsAction , clearErrors , deleteHomeAction } from '../../actions/homeAction';
import { DELETE_HOME_RESET } from '../../constants/homeConstants';
import {useNavigate} from 'react-router-dom';
 
const AdminHome = () => {

    const dispatch = useDispatch();
    const alert = useAlert();
    const {loading,error,homes} = useSelector((state)=>state.homes);
    const {error:deleteError,message,success} = useSelector((state)=>state.deleteHome);
    const history = useNavigate();

    const deleteSkillsSubmitHandler = (id) => {
        dispatch(deleteHomeAction(id));
    }

    const columns = [
        {
         field:"id",
         headerName:"Skills ID",
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
           
              <Button onClick={()=>deleteSkillsSubmitHandler(params.getValue(params.id,"id"))}>
                <DeleteIcon/>
              </Button>
            </Fragment>
          )
        }
      }
    ];

    const rows = [];

    homes && homes.forEach((home)=>{
        rows.push({
            id: home._id,
            name: home.name,
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
        }
        if (success) {
            alert.success(message);
            history(`/dashboard`);
            dispatch({
                type:DELETE_HOME_RESET
            })
        }
        dispatch(homeDetailsAction());

    },[error,alert,dispatch,deleteError,success,message,history]);
  return (
    <Fragment>
    {
      loading ? (<Loader/>):(
        <Fragment>
        <MetaData title={"All Home Skills Cards - Admin"} />
    <div className="dashboard">
      <Sidebar/>
      <div className="productListContainer">
        <h1 id='productListHeading'>ALL Home Skills Cards</h1>
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

export default AdminHome