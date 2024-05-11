import React, { Fragment, useEffect, useState } from 'react';
import CopyrightIcon from '@material-ui/icons/Copyright';
import HomeIcon from '@material-ui/icons/Home';
import PhoneIcon from '@material-ui/icons/Phone';
import MetaData from '../Layout/MetaData/MetaData';
import { updateFooterDetailsAction , clearErrors  } from '../../actions/footerAction';
import {useDispatch,useSelector} from 'react-redux';
import {useAlert} from 'react-alert';
import { UPDATE_FOOTER_RESET } from '../../constants/footerConstants';
import {useNavigate , useParams} from 'react-router-dom';
import Loader from '../Layout/Loader/Loader';



const UpdateFooter = () => {

    const [contactAddress , setContactAddress] = useState("");
    const [contactNo , setContactNo] = useState("");
    const [copyright , setCopyright] = useState("");

    const alert = useAlert();
    const dispatch = useDispatch();
    const {loading,error,success,message} = useSelector((state)=>state.updateFooter);
    const history = useNavigate();
    const {id} = useParams();

    const updateFooterHandler =  (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("copyright",copyright);
        myForm.set("contactNo",contactNo);
        myForm.set("contactAddress",contactAddress);
        dispatch(updateFooterDetailsAction(id, myForm));
    };

    useEffect(()=>{
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        };
        if (success) {
            alert.success(message);
            history(`/dashboard`);
            dispatch({
                type:UPDATE_FOOTER_RESET
            })
        };
       
    },[error,alert,dispatch,history,success,message]);

  return (
      <Fragment>
        {
            loading ? (<Loader/>):(
                <Fragment>
                <MetaData title={"Update Footer --Admin"}/>
               <div className="UpdatePasswordContainer">
                   <div className="updatePasswordBox">
                   <div className="updatePasswordHeading">Update Footer</div>
                       <form className='updatePasswordForm' onSubmit={updateFooterHandler} >
                           <div className="oldPassword">
                             <CopyrightIcon />
                               <input 
                               type="text"
                               required 
                               placeholder='Enter Copyright' 
                               value={copyright}
                               onChange={(e)=>setCopyright(e.target.value)}
                                />
                           </div>
                           <div className="newPassword">
                            <HomeIcon />
                               <input 
                               type="text" 
                               required
                               placeholder='Enter Contact Address'
                               value={contactAddress}
                               onChange={(e)=>setContactAddress(e.target.value)}
            
                                />
                           </div>
                           <div className="confirmNewPassword">
                            <PhoneIcon />
                               <input 
                               type="text" 
                               required 
                               placeholder='Enter Contact Number' 
                               value={contactNo}
                               onChange={(e)=>setContactNo(e.target.value)}
                                />
                           </div>
                           <input 
                           type="submit" 
                           value="Update Footer" 
                           className='updatePasswordBtn' />
                       </form>
                   </div>
               </div>
            </Fragment>
            )
        }
      </Fragment>
  )
}

export default UpdateFooter