import React, { Fragment, useEffect } from 'react';
import MetaData from '../Layout/MetaData/MetaData';
import { DataGrid } from '@material-ui/data-grid';
import Sidebar from './Sidebar';
import DeleteIcon from '@material-ui/icons/Delete';
import { Button } from '@material-ui/core';
import { useDispatch , useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { getVideoLinkAction , clearErrors , deleteLinkAction } from '../../actions/aboutUsAction';
import Loader from '../Layout/Loader/Loader';
import { DELETE_LINK_RESET } from '../../constants/aboutUsConstants';
import { useNavigate } from 'react-router-dom';

const AdminLink = () => {

    const dispatch = useDispatch();
    const alert = useAlert();
    const {loading,error,video} = useSelector((state)=>state.getVideoLink);

    const history = useNavigate();
    const {error:deleteError,success,message} = useSelector((state)=>state.deleteCard);

    const deleteSubmitHandler = (id) => {
        dispatch(deleteLinkAction(id))
    }
    const columns = [
        {
         field:"id",
         headerName:"Video ID",
         minWidth:435,
         flex:1.5
        },
       {
        field:"link",
        headerName:"Link",
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
           
              <Button onClick={()=>deleteSubmitHandler(params.getValue(params.id,"id"))}  >
                <DeleteIcon/>
              </Button>
            </Fragment>
          )
        }
      }
    ];

    const rows = [];
    video && video.forEach((vid)=>{
        rows.push({
            id:vid._id,
            link:vid.link
        })
    })


   useEffect(()=>{
    if (error) {
        alert.error(error);
        dispatch(clearErrors());
    }
    if (deleteError) {
        alert.error(deleteError);
        dispatch(clearErrors());
    };

    if (success) {
        alert.success(message);
        dispatch({
            type:DELETE_LINK_RESET
        })

        history(`/dashboard`)

    }
    dispatch(getVideoLinkAction());
   },[error,alert,dispatch,history,deleteError,success,message]); 
  return (
      <Fragment>
        {
            loading ? (<Loader />):(
                <Fragment>
                <MetaData title={"About Video Links - Admin"} />
            <div className="dashboard">
              <Sidebar/>
              <div className="productListContainer">
                <h1 id='productListHeading'>ALL TEAM MEMBERS</h1>
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

export default AdminLink