import React, { Fragment, useEffect } from 'react';
import {DataGrid} from '@material-ui/data-grid';
import MetaData from '../Layout/MetaData/MetaData';
import Sidebar from './Sidebar';
import Loader from '../Layout/Loader/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { clearErrors , getAllMedia , deleteMediaAction } from '../../actions/homeAction';
import DeleteIcon from '@material-ui/icons/Delete';
import { Button } from '@material-ui/core';
import { DELETE_MEDIA_RESET } from '../../constants/homeConstants';
import { useNavigate } from 'react-router-dom';


const AdminMedias = () => {

    const {loading, error,media} = useSelector((state)=>state.getMedia);

    const {error:deleteError,success,message} = useSelector((state)=>state.deleteHome);
    const dispatch = useDispatch();
    const alert = useAlert();

    const history = useNavigate();

    const deleteSubmitHandler = (id) => {
        dispatch(deleteMediaAction(id));
    }


    const columns = [
        {
         field:"id",
         headerName:"Service ID",
         minWidth:435,
         flex:1.5
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

    media && media.map((me)=>( 
        rows.push({
            id:me._id,
})
    ))

    useEffect(()=>{
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (deleteError) {
            alert.error(deleteError);
            dispatch(clearErrors());
        }
        if (success) {
            alert.success(message);
            history(`/dashboard`)

            dispatch({
                type:DELETE_MEDIA_RESET
            })
        }

        dispatch(getAllMedia());
    },[error,alert,dispatch,deleteError,success,message,history]);
  return (
    <Fragment>
    {
        loading ? (<Loader/>):(
            <Fragment>
            <MetaData title={"ALL Social Media - Admin"} />
        <div className="dashboard">
          <Sidebar/>
          <div className="productListContainer">
            <h1 id='productListHeading'>ALL Social Media</h1>
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

export default AdminMedias