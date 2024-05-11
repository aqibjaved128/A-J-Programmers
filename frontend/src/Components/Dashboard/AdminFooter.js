import React, { Fragment, useEffect } from 'react';
import {DataGrid} from '@material-ui/data-grid';
import MetaData from '../Layout/MetaData/MetaData';
import Sidebar from './Sidebar';
import Loader from '../Layout/Loader/Loader';
import  EditIcon  from '@material-ui/icons/Edit';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { clearErrors } from '../../actions/footerAction';
import { Link } from 'react-router-dom';

const AdminFooter = () => {

    const dispatch = useDispatch()
    const {loading,error,footer} = useSelector((state)=>state.footer)
    const alert = useAlert();
    const columns = [
        {
         field:"id",
         headerName:"Service ID",
         minWidth:435,
         flex:1.5
        },
       {
        field:"copyright",
        headerName:"Copyright",
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
           
              <Link to={`/admin/footer/${params.getValue(params.id,"id")}`} >
                <EditIcon/>
              </Link>
            </Fragment>
          )
        }
      }
    ];

    const rows = [];

    footer && footer.forEach((foot)=>{
        rows.push({
            id: foot._id,
            copyright: foot.copyright
        })
    })

    useEffect(()=>{
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
    },[alert,error,dispatch])
  return (
    <Fragment>
    {
        loading ? (<Loader/>):(
            <Fragment>
            <MetaData title={"Footer Details - Admin"} />
        <div className="dashboard">
          <Sidebar/>
          <div className="productListContainer">
            <h1 id='productListHeading'>Footer Details</h1>
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

export default AdminFooter