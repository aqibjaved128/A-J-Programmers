import React, { Fragment, useEffect, useState } from 'react';
import FaceIcon from '@material-ui/icons/Face';
import MailOutLineIcon from  '@material-ui/icons/MailOutline';
import './UpdateProfile.css';
import { updateProfileAction , clearErrors , loadUserAction } from '../../actions/userAction';
import {useDispatch,useSelector} from 'react-redux';
import {useAlert} from 'react-alert';
import Loader from '../Layout/Loader/Loader';
import { UPDATE_PROFILE_RESET } from '../../constants/userConstants';
import { useNavigate } from 'react-router-dom';
import MetaData from '../Layout/MetaData/MetaData';


const UpdateProfile = () => {

    const dispatch = useDispatch();
    const {loading,error,isUpdated , success} = useSelector((state)=>state.updatePassword);
    const {user} = useSelector((state)=>state.loginUser);
    const alert = useAlert();
    const history = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [avatar,setAvatar] = useState();
    const [avatarPreview,setAvatarPreview] = useState("/Profile.png");

    const updateProfileDataChange = (e) => {
        const reader = new FileReader();

        reader.onload = () => {
            if (reader.readyState === 2) {
              setAvatarPreview(reader.result);
              setAvatar(reader.result);
            }

        }
        reader.readAsDataURL(e.target.files[0]);
    }

    const updateProfileSubmitHandler = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("name",name);
        myForm.set("email",email);
        myForm.set("avatar",avatar);

        dispatch(updateProfileAction(myForm));
    }


    useEffect(()=>{
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        };
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setAvatarPreview(user.avatar.url);
        }
        if (isUpdated) {
            alert.success(`Profile updated successfully`);
            history(`/account`);
            dispatch({
                type:UPDATE_PROFILE_RESET
            })
        };
        if (success) {
            dispatch(loadUserAction());
        }
    },[error,dispatch,alert,isUpdated,history,user,success]);


    
  return (
   <Fragment>
    {
        loading ? (<Loader/>):(
            <Fragment>
                <MetaData title={"Update Profile   --AJ"} />
            <div className="updateProfileContainer">
           <div className="updateProfileBox">
               <h2 className='updateProfileHeading'>Update Profile</h2>
               <form 
               className="updateProfileForm" 
               encType='multipart/form-data'
               onSubmit={updateProfileSubmitHandler}
               >
   
                   <div className="updateProfileName">
                       <FaceIcon />
                       <input 
                       type="text" 
                       name="name" 
                       required 
                       placeholder='Name' 
                       value={name}
                       onChange={(e)=>setName(e.target.value)}
   
                       />
                   </div>
                   <div className="updateProfileEmail">
                       <MailOutLineIcon/>
                       <input
                        type="email" 
                        name="email" 
                        required 
                        placeholder='Email' 
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                         />
                   </div>
                   <div className="updateProfileImage" id='updateProfileImage'>
                       <img 
                       alt="avatar Preview" 
                       src={avatarPreview}
                       />
                       
                       <input 
                       type="file" 
                       name="avatar" 
                       accept='image/*' 
                       onChange={updateProfileDataChange}
                       />
                   </div>
                   <input 
                   type="submit" 
                   value="Update Profile" 
                   className='updateProfileBtn'
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

export default UpdateProfile