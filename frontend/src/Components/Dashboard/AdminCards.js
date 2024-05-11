import React, { Fragment, useEffect } from 'react';
import {DataGrid} from '@material-ui/data-grid';
import Sidebar from './Sidebar';
import MetaData from '../Layout/MetaData/MetaData';
import Loader from '../Layout/Loader/Loader';
import DeleteIcon from '@material-ui/icons/Delete';
import { Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { allCardsAction , clearErrors, deleteCardAction } from '../../actions/aboutUsAction';
import { DELETE_CARD_RESET } from '../../constants/aboutUsConstants';
import {useNavigate} from 'react-router-dom';


const AdminCards = () => {

    const {loading,error,jobs} = useSelector((state)=>state.cards);
    const {error:deleteError,success,message} = useSelector((state)=>state.deleteCard);
    const dispatch = useDispatch();
    const alert  = useAlert();
    const history = useNavigate();

    const deleteCardSubmitHandler = (id) => {
        dispatch(deleteCardAction(id))
    }

    const columns = [
        {
         field:"id",
         headerName:"Service ID",
         minWidth:435,
         flex:1.5
        },
       {
        field:"subtitle",
        headerName:"Subtitle",
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
           
              <Button onClick={()=>deleteCardSubmitHandler(params.getValue(params.id,"id"))}>
                <DeleteIcon/>
              </Button>
            </Fragment>
          )
        }
      }
    ];

    const rows = [];
    jobs && jobs.forEach((job) => {
        rows.push({
            id: job._id,
            subtitle: job.subtitle,
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
            history(`/dashboard`);
            dispatch({
                type:DELETE_CARD_RESET
            })
        }
        dispatch(allCardsAction());
    },[error,alert,dispatch,success,message,history,deleteError]);

  return (
    <Fragment>
    {
      loading ? (<Loader/>):(
        <Fragment>
        <MetaData title={"All Cards - Admin"} />
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

export default AdminCards