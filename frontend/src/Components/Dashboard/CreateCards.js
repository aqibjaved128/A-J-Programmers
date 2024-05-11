import React, { Fragment, useEffect, useState } from 'react';
import { createCardAction , clearErrors } from '../../actions/aboutUsAction';
import MetaData from '../Layout/MetaData/MetaData';
import TitleIcon from '@material-ui/icons/Title';
import SubtitlesIcon from '@material-ui/icons/Subtitles';
import {useDispatch, useSelector} from 'react-redux';
import {useAlert} from 'react-alert';
import { CREATE_CARD_RESET } from '../../constants/aboutUsConstants';
import {useNavigate} from 'react-router-dom';
import Loader from '../Layout/Loader/Loader';

const CreateCards = () => {

    const [title,setTitle] = useState("");
    const [subtitle,setSubTitle] = useState("");
    const [image,setImage] = useState();
    const [avatarPreview,setAvatarPreview] = useState("/Profile.png");

    const alert = useAlert();
    const dispatch = useDispatch();
    const {loading,error,success} = useSelector((state)=>state.createCard);
    const history = useNavigate();


    const changeDataSubmitHandler = (e) => {

        const reader = new FileReader();

        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvatarPreview(reader.result);
                setImage(reader.result);
            }
        }
        reader.readAsDataURL(e.target.files[0]);

    };

    const updateProfileSubmitHandler = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("title",title);
        myForm.set("subtitle",subtitle);
        myForm.set("image",image);

        dispatch(createCardAction(myForm));
    };

    useEffect(()=>{
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        };
        if (success) {
            alert.success(`Card Created Successfully`);
            history(`/dashboard`);
            dispatch({
                type:CREATE_CARD_RESET
            })
        };
    },[error,alert,dispatch,success,history]);
  return (
     <Fragment>
        {
            loading ? (<Loader/>):(
                <Fragment>
                <MetaData title={"Create Feedback Card   --Admin"} />
            <div className="updateProfileContainer">
            <div className="updateProfileBox">
               <h2 className='updateProfileHeading'>Create Card</h2>
               <form 
               className="updateProfileForm" 
               encType='multipart/form-data'
               onSubmit={updateProfileSubmitHandler}
               >
            
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
                       <SubtitlesIcon />
                       <input 
                       type="text" 
                       name="subtitle" 
                       required 
                       placeholder='Subtitle' 
                       value={subtitle}
                       onChange={(e)=>setSubTitle(e.target.value)}
            
                       />
                   </div>
                 
                   <div className="updateProfileImage" id='updateProfileImage'>
                       <img 
                       alt="avatar Preview" 
                       src={avatarPreview}
                       />
                       
                       <input 
                       type="file" 
                       name="image" 
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

export default CreateCards