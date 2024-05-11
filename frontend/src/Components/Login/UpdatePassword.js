import React, { Fragment, useEffect, useState } from 'react';
import './UpdatePassword.css';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import LockIcon from '@material-ui/icons/Lock';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import MetaData from '../Layout/MetaData/MetaData';
import { updateUserPasswordAction , clearErrors } from '../../actions/userAction';
import {useDispatch,useSelector} from 'react-redux';
import {useAlert} from 'react-alert';
import { UPDATE_PASSWORD_RESET } from '../../constants/userConstants';
import {useNavigate} from 'react-router-dom';
import Loader from '../Layout/Loader/Loader';


const UpdatePassword = () => {
    const dispatch = useDispatch();
    const {error,loading,success} = useSelector((state)=>state.updatePassword);
    const alert = useAlert();
    const history = useNavigate();

    const [oldPassword,setOldPassword] = useState("");
    const [newPassword,setNewPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("");

    const updatePasswordSubmitHandler = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("oldPassword",oldPassword);
        myForm.set("newPassword",newPassword);
        myForm.set("confirmPassword",confirmPassword);

        dispatch(updateUserPasswordAction(oldPassword,newPassword,confirmPassword));
    }

    useEffect(()=>{
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (success) {
            alert.success(`Passwords updated successfully`);
            history(`/account`);
            dispatch({
                type:UPDATE_PASSWORD_RESET
            })
            
        }
    },[error,alert,dispatch,success,history]);
  return (
    <Fragment>
        {
            loading ? (<Loader />):(
                <Fragment>
         <MetaData title={"Change Password"}/>
        <div className="UpdatePasswordContainer">
            <div className="updatePasswordBox">
            <div className="updatePasswordHeading">Update Password</div>
                <form className='updatePasswordForm' onSubmit={updatePasswordSubmitHandler}>
                    <div className="oldPassword">
                    <VpnKeyIcon/>
                        <input 
                        type="password"
                        required 
                        placeholder='Old Password' 
                        value={oldPassword}
                        onChange={(e)=>setOldPassword(e.target.value)}
                         />
                    </div>
                    <div className="newPassword">
                        <LockOpenIcon/>
                        <input 
                        type="password" 
                        required
                        placeholder='New Password'
                        value={newPassword}
                        onChange={(e)=>setNewPassword(e.target.value)}

                         />
                    </div>
                    <div className="confirmNewPassword">
                    <LockIcon/>                      
                        <input 
                        type="password" 
                        required 
                        placeholder='Confirm Password' 
                        value={confirmPassword}
                        onChange={(e)=>setConfirmPassword(e.target.value)}
                         />
                    </div>
                    <input type="submit" value="Change Password" className='updatePasswordBtn' />
                </form>
            </div>
        </div>
</Fragment>
            )
        }
    </Fragment>
)
}

export default UpdatePassword