import React, { Fragment, useEffect, useState } from 'react'
import MetaData from '../Layout/MetaData/MetaData';
import Loader from '../Layout/Loader/Loader';
import { createHomeAction , clearErrors } from '../../actions/homeAction';
import {useDispatch , useSelector} from 'react-redux';
import {useAlert} from 'react-alert';
import { CREATE_HOME_RESET } from '../../constants/homeConstants';
import {useNavigate} from 'react-router-dom';
import FaceIcon from '@material-ui/icons/Face';


const CreateHome = () => {

    const [avatarPreview , setAvatarPreview] = useState("/Profile.png");
    const  [skillsImages , setSkillsImages] = useState();
    const [name, setName] = useState("");

    const dispatch = useDispatch();
    const alert = useAlert();
    const {loading,error,success} = useSelector((state)=>state.createHome);

    const history = useNavigate();

    const changeDataSubmitHandler = (e) => {

        const reader = new FileReader();

        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvatarPreview(reader.result);
                setSkillsImages(reader.result);
            }
        }

        reader.readAsDataURL(e.target.files[0]);
    };



    const createSkillSubmitHandler = () => {
        const myForm = new FormData();

        myForm.set("skillsImages",skillsImages);
        myForm.set("name",name);
        dispatch(createHomeAction(myForm));
    };


    useEffect(()=>{
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (success) {
            alert.success(`Skill Card Created successfully`);
            history(`/dashboard`);
            dispatch({
                type:CREATE_HOME_RESET
            })
        }
    },[error,dispatch,alert,success,history]);

  return (
    <Fragment>
        {
            loading ? (<Loader/>):(
                
            <Fragment>
            <MetaData title={"Create Home Card   --Admin"} />
        <div className="updateProfileContainer">
        <div className="updateProfileBox">
           <h2 className='updateProfileHeading'>Create Skills Card</h2>
           <form 
           className="updateProfileForm" 
           encType='multipart/form-data'
           onSubmit={createSkillSubmitHandler}
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
            
             
               <div className="updateProfileImage" id='updateProfileImage'>
                   <img 
                   alt="avatar Preview" 
                   src={avatarPreview}
                   />
                   
                   <input 
                   type="file" 
                   name="skillsImages" 
                   accept='image/*' 
                   onChange={changeDataSubmitHandler}
                   />
               </div>
               <input 
               type="submit" 
               value="Create Card" 
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

export default CreateHome