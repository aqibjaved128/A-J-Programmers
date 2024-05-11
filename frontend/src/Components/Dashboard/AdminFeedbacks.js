import React, { Fragment, useEffect } from 'react'
import Sidebar from './Sidebar'
import {DataGrid} from '@material-ui/data-grid'
import MetaData from '../Layout/MetaData/MetaData';
import Loader from '../Layout/Loader/Loader';
import { Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { useDispatch , useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { clearErrors , allfeedbacksAction , deleteFeedbackAction } from '../../actions/aboutUsAction';
import { DELETE_FEEDBACK_RESET } from '../../constants/aboutUsConstants';
import {useNavigate} from 'react-router-dom';


const AdminFeedbacks = () => {

    const {loading,error,feedbacks} =  useSelector((state)=>state.feedbacks);
    const {error:deleteError,success,message} =  useSelector((state)=>state.deleteFeedback);
    const history = useNavigate();


    const dispatch = useDispatch();
    const alert = useAlert();


    const deleteSubmitHandler = (id) => {
        dispatch(deleteFeedbackAction(id));
    }
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
           
              <Button onClick={()=>deleteSubmitHandler(params.getValue(params.id,"id"))}>
                <DeleteIcon/>
              </Button>
            </Fragment>
          )
        }
      }
    ];

    const rows = [];

    feedbacks && feedbacks.forEach((feedback)=>{
        rows.push({
            id: feedback._id,
            name: feedback.name,
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
                type:DELETE_FEEDBACK_RESET
            })
        }
        dispatch(allfeedbacksAction());
    },[error,alert,dispatch,success,deleteError,history,message]);

  return (
    <Fragment>
    {
      loading ? (<Loader/>):(
        <Fragment>
        <MetaData title={"All Feedbacks - Admin"} />
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

export default AdminFeedbacks