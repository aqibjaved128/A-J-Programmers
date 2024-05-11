import React, { Fragment, useEffect, useState } from 'react';
import { Button , Typography} from '@material-ui/core';
import './Login.css';
import MetaData from '../Layout/MetaData/MetaData';
import { loginUserAction , clearErrors } from '../../actions/userAction';
import {useDispatch , useSelector} from 'react-redux';
import {useAlert} from 'react-alert';
import Loader from '../Layout/Loader/Loader';
import {useNavigate , useLocation , Link} from 'react-router-dom';


const Login = () => {

  const dispatch = useDispatch();
  const alert = useAlert();
  const {loading,error,isAuthenticated} = useSelector((state)=>state.loginUser);
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const history = useNavigate();
  const location = useLocation();
  const redirect = location.search ? location.search.split('=')[1]:"/account";

  const loginSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.set("email", email);
    myForm.set("password", password);

    dispatch(loginUserAction(email, password));
  }

  useEffect(()=>{
    if (error) {
      alert.error(error);
      dispatch(clearErrors())
    }
  
    if (isAuthenticated) {
      history(redirect)
    }
    

  },[error,alert,dispatch,history,isAuthenticated,redirect]);
  return (
             <Fragment>
            <MetaData title={`AJ --Admin Panel`} />
            <Fragment>
              {
                loading ? (<Loader />):(
                  <div className='login'>
                  <div className="loginContainer">
                      <form  className='loginForm' onSubmit={loginSubmitHandler} >
                         <Typography variant='h4'>
                          <p>A</p>
                          <p>D</p>
                          <p>M</p>
                          <p>I</p>
                          <p style={{ marginRight: "1vmax" }}>N</p>
              
                          <p>P</p>
                          <p>A</p>
                          <p>N</p>
                          <p>E</p>
                          <p>L</p>
                         </Typography>
                         <div>
                          <input 
                          type="email"
                          placeholder='Admin Email' 
                          required 
                          value={email}
                          onChange={(e)=>setEmail(e.target.value)}
                           />
                           <input 
                           type="password" 
                           required 
                           placeholder='Admin Password' 
                           value={password}
                           onChange={(e)=>setPassword(e.target.value)}
                            />
                            <Button type='submit' variant='contained' >Login</Button>
                            <Link to={`/password/forgot`} className='forgotBtn' >Forgot Password</Link>
                         </div>
                      </form>
                  </div>
                  </div>
                )
              }
            </Fragment>
          </Fragment>
          )
        }

export default Login