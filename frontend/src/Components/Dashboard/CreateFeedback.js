import React, { Fragment, useEffect, useState } from 'react'
import MetaData from '../Layout/MetaData/MetaData';
import FaceIcon from '@material-ui/icons/Face';
import TitleIcon from '@material-ui/icons/Title';
import DescriptionIcon from '@material-ui/icons/Description';
import { createFeedbackAction , clearErrors } from '../../actions/aboutUsAction';
import {useDispatch,useSelector} from 'react-redux';
import {useAlert} from 'react-alert';
import { CREATE_FEEDBACK_RESET } from '../../constants/aboutUsConstants';
import {useNavigate} from 'react-router-dom';
import Loader from '../Layout/Loader/Loader';

const CreateFeedback = () => {

    const [name,setName] = useState("");
    const [description,setDescription] = useState("");
    const [title,setTitle] = useState("");
    const [avatar,setAvatar] = useState();
    const [avatarPreview,setAvatarPreview] = useState("/Profile.png");

    const alert = useAlert();
    const dispatch = useDispatch();
    const {loading,error,success}  = useSelector((state)=>state.createFeedback);
    const history = useNavigate();

    const changeDataSubmitHandler = (e) => {
        const reader = new FileReader();

        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvatar(reader.result);
                setAvatarPreview(reader.result);
            }
        }

        reader.readAsDataURL(e.target.files[0]);
    };

    const updateProfileSubmitHandler = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("name",name);
        myForm.set("title",title);
        myForm.set("description",description);
        myForm.set("avatar",avatar);

        dispatch(createFeedbackAction(myForm));
    };

    useEffect(()=>{
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        };
        if (success) {
            alert.success(`Feedback Created successfully`);
            history(`/dashboard`);
            dispatch({
                type:CREATE_FEEDBACK_RESET
            })
        }
    },[error,alert,dispatch,success,history]);


  return (
   <Fragment>
    {
        loading ? (<Loader/>):( 
            <Fragment>
            <MetaData title={"Create Feedback   --Admin"} />
        <div className="updateProfileContainer">
        <div className="updateProfileBox">
           <h2 className='updateProfileHeading'>Create Client Feedback</h2>
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
               <div className="updateProfileName">
                   <TitleIcon />
                   <input 
                   type="text" 
                   name="title" 
                   required 
                   placeholder='Title' 
                   value={title}
                   onChange={(e)=>setTitle(e.target.value)}
        
                   />
               </div>
               <div className="updateProfileName">
                   <DescriptionIcon />
                   <input 
                   type="text" 
                   name="description" 
                   required 
                   placeholder='Description' 
                   value={description}
                   onChange={(e)=>setDescription(e.target.value)}
        
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
                   onChange={changeDataSubmitHandler}
                   />
               </div>
               <input 
               type="submit" 
               value="Create Feedback" 
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

export default CreateFeedback