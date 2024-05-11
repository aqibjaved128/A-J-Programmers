import React, { Fragment, useEffect, useState } from 'react';
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import MetaData from '../Layout/MetaData/MetaData';
import { resetPasswordAction , clearErrors } from '../../actions/userAction';
import {useDispatch,useSelector} from 'react-redux';
import {useAlert} from 'react-alert';
import Loader from '../Layout/Loader/Loader';
import {useParams,useNavigate} from 'react-router-dom';
import './ResetPassword.css';

const ResetPassword = () => {

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const history = useNavigate();
    const alert = useAlert();
    const {loading} = useSelector((state)=>state.forgotPassword);
    const {error,success} = useSelector((state)=>state.resetPassword);
    const dispatch = useDispatch();
    const {token} = useParams();


    const resetPasswordSubmitHandler = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("password",password);
        myForm.set("confirmPassword",confirmPassword);

        dispatch(resetPasswordAction(token, myForm));

       
    }



    useEffect(()=>{
        if (error) {
            alert.error(error)
            dispatch(clearErrors());
        };
   
        if (success) {
            alert.success(`Password Reset Successfully`);
            history(`/million-dreams-login`)
        }
   

    },[error,alert,dispatch,history,success]);
  return (
          <Fragment>
            {
                loading ? (<Loader/>):(
                    <Fragment>
    <MetaData title={"Reset Password"}/>
        <div className="resetPasswordContainer">
            <div className="resetPasswordBox">
                <h2 className='resetPasswordHeading'>Reset Password</h2>
                <form className='resetPasswordForm' onSubmit={resetPasswordSubmitHandler} >
                    <div>
                        <LockOpenIcon/>
                        <input 
                        type="password" 
                        required 
                        placeholder='New Password' 
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                         />
                    </div>
                    <div>
                        <LockIcon/>
                        <input 
                        type="password" 
                        required 
                        placeholder='Confirm Password' 
                        value={confirmPassword}
                        onChange={(e)=>setConfirmPassword(e.target.value)}
                         />
                    </div>
                    <input 
                    type="submit" 
                    value="Reset Password" 
                    className='resetPasswordBtn' 
                    />
                </form>
            </div>
        </div>
    </Fragment>
                )
            }
          </Fragment>
  )
}

export default ResetPassword