import React, { Fragment, useEffect } from 'react';
import { userDetailsAction , clearErrors , logoutUserAction } from '../../actions/userAction';
import {useDispatch , useSelector} from 'react-redux';
import {useAlert} from 'react-alert';
import MetaData from '../Layout/MetaData/MetaData';
import Loader from '../Layout/Loader/Loader';
import './LoginUserDetails.css';
import {Link , useNavigate} from 'react-router-dom';


const LoginUserDetails = () => {
  const dispatch = useDispatch();
  const {user,loading,error} = useSelector((state)=>state.userDetails);
  const {isAuthenticated} = useSelector((state)=>state.loginUser);
  const alert = useAlert();
  const history = useNavigate();

  useEffect(()=>{
  
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isAuthenticated === false) {
      history(`/million-dreams-login`)
    }
 
  dispatch(userDetailsAction())

  },[error, dispatch,alert,isAuthenticated,history]);

  
  function logoutSubmitHandler() {
    dispatch(logoutUserAction());
    history(`/million-dreams-login`)
    alert.success(`Logged out successfully`);
  }

  return (
    <Fragment>
      {
        loading ? (<Loader/>):(
          <Fragment>
            <MetaData title={`${user.name} Profile   --AJ`} />
            <div className="profileContainer">
        <div>
            <img src={user.avatar && user.avatar.url} alt={user.name} />
            <Link to={`/me/update`}>Edit Profile</Link>
        </div>
        <div>
            <div>
                <h4>Full Name</h4>
                <p>{user.name}</p>
            </div>
            <div>
                <h4>Email</h4>
                <p>{user.email}</p>
            </div>
            <div>
                <h4>Joined On</h4>
                <p>{String(user.createdAt).substr(0,10)}</p>
            </div>
            <div>
                <Link to={`/password/update`}>Change Password</Link>
                <Link onClick={logoutSubmitHandler} >Logout</Link>
            </div>
        </div>
    </div>
          </Fragment>
        )
      }
    </Fragment>
  )
}

export default LoginUserDetails