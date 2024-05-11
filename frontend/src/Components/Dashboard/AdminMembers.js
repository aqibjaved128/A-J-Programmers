import React, { Fragment, useEffect } from 'react';
import {DataGrid} from '@material-ui/data-grid';
import Sidebar from './Sidebar';
import MetaData from '../Layout/MetaData/MetaData';
import { Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import {useDispatch,useSelector} from 'react-redux';
import {useAlert} from 'react-alert';
import { allTeamMembersAction , clearErrors } from '../../actions/aboutUsAction';
import { deleteTeamMemberCardAction } from '../../actions/aboutUsAction';
import Loader from '../Layout/Loader/Loader';
import { DELETE_MEMBER_RESET } from '../../constants/aboutUsConstants';
import {useNavigate} from 'react-router-dom';


const AdminMembers = () => {

    const dispatch = useDispatch();
    const alert = useAlert();
    const {loading,error,cards} = useSelector((state)=>state.memberCards);
    const {error:deleteError,success,message} = useSelector((state)=>state.deleteMember);
    const history = useNavigate();

    const deleteMemberSubmitHandler = (id) => {
        dispatch(deleteTeamMemberCardAction(id))
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
           
              <Button onClick={()=>deleteMemberSubmitHandler(params.getValue(params.id,"id"))}>
                <DeleteIcon/>
              </Button>
            </Fragment>
          )
        }
      }
    ];
    const rows = [];

    cards && cards.forEach((card)=>{
        rows.push({
            id: card._id,
            name: card.name,
            title: card.title
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
                type:DELETE_MEMBER_RESET
            })
        }
        dispatch(allTeamMembersAction());
    },[error,alert,dispatch,history,success,deleteError,message]);
  return (
   <Fragment>
    {
        loading ? (<Loader/>):(
            <Fragment>
            <MetaData title={"ALL Team Members - Admin"} />
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

export default AdminMembers