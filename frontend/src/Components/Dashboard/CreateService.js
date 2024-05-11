import React, { Fragment, useEffect, useState } from 'react';
import { createServiceAction , clearErrors } from '../../actions/servicesAction';
import MetaData from '../Layout/MetaData/MetaData';
import {useDispatch,useSelector} from 'react-redux';
import {useAlert} from 'react-alert';
import './CreateService.css';
import CreateIcon from '@material-ui/icons/Create';
import LinkIcon from '@material-ui/icons/Link';
import DescriptionIcon from '@material-ui/icons/Description';
import TitleIcon from '@material-ui/icons/Title';
import Loader from '../Layout/Loader/Loader';
import { CREATE_SERVICE_RESET } from '../../constants/servicesConstants';
import {useNavigate} from 'react-router-dom';

const CreateService = () => {

    const alert = useAlert();
    const {loading,error,success} = useSelector((state)=>state.adminService);
    const dispatch = useDispatch();
    const history = useNavigate();

    const [name,setName] = useState("");
    const [nameLink , setNameLink] = useState("");
    const [miniDescription,setMiniDescription] = useState("");
    const [title,setTitle] = useState("");
    const [subtitle,setSubtitle] = useState("");
    const [descriptiontitle,setDescriptiontitle] = useState("");
    const [subDescription,setSubDescription] = useState("");
    const [avatarPreview,setAvatarPreview] = useState("/Profile.png");
    const [DescriptionPreview,setDescriptionPreview] = useState("/Profile.png");
    const [logoImage,setLogoImage] = useState();
    const [descriptionImage,setDescriptionImage] = useState();


    const createServiceDataChange = (e) => {

        const reader = new FileReader();

        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvatarPreview(reader.result);
                setDescriptionPreview(reader.result);
                setLogoImage(reader.result);
                setDescriptionImage(reader.result);
            }
        }

        reader.readAsDataURL(e.target.files[0]);
    };
    const createServiceDataChanges = (e) => {

        const reader = new FileReader();

        reader.onload = () => {
            if (reader.readyState === 2) {
                setDescriptionPreview(reader.result);
                setDescriptionImage(reader.result);
            }
        }

        reader.readAsDataURL(e.target.files[0]);
    };
    const createServiceSubmitHandler = (e) => {
        e.preventDefault();

        const myForm = new FormData();
        myForm.set("name",name);
        myForm.set("nameLink",nameLink);
        myForm.set("miniDescription",miniDescription);
        myForm.set("title",title);
        myForm.set("subtitle",subtitle);
        myForm.set("descriptiontitle",descriptiontitle);
        myForm.set("subDescription",subDescription);
        myForm.set("logoImage",logoImage);
        myForm.set("descriptionImage",descriptionImage);

        dispatch(createServiceAction(myForm));
    };


    useEffect(()=>{
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        };

        if (success) {
            alert.success(`Service Created Successfully`);
            history(`/dashboard`);
            dispatch({
                type:CREATE_SERVICE_RESET
            })
        }
    },[dispatch,alert,error,history,success]);


  return (
     <Fragment>
        {
            loading ? (<Loader/>):(
                <Fragment>
                <MetaData title={"Create Service   --Admin"} />
            <div className="createServicesContainer">
           <div className="createServicesBox">
               <h2 className='updateProfileHeading'>Create Service</h2>
               <form 
               className="updateProfileForm" 
               encType='multipart/form-data'
               onSubmit={createServiceSubmitHandler}
               >
   
                   <div className="updateProfileName">
                    <CreateIcon />
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
                    <LinkIcon />
                       <input 
                       type="text" 
                       name="nameLink" 
                       required 
                       placeholder='Link-Name' 
                       value={nameLink}
                       onChange={(e)=>setNameLink(e.target.value)}
   
                       />
                   </div>
                   <div className="updateProfileName">
                    <DescriptionIcon />
                       <input 
                       type="text" 
                       name="miniDescription" 
                       required 
                       placeholder='Mini Description'  
                       value={miniDescription}
                       onChange={(e)=>setMiniDescription(e.target.value)}
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
                    <TitleIcon />
                       <input 
                       type="text" 
                       name="subtitle"  
                       required 
                       placeholder='Subtitle'   
                       value={subtitle}
                       onChange={(e)=>setSubtitle(e.target.value)}
                       />
                   </div>
                   <div className="updateProfileName">
                    <TitleIcon />
                       <input 
                       type="text" 
                       name="descriptiontitle" 
                       required 
                       placeholder='description Title'  
                       value={descriptiontitle}
                       onChange={(e)=>setDescriptiontitle(e.target.value)}
                       />
                   </div>
                   <div className="updateProfileName">
                    <DescriptionIcon />
                       <input 
                       type="text" 
                       name="subDescription" 
                       required 
                       placeholder='Sub Description'  
                       value={subDescription}
                       onChange={(e)=>setSubDescription(e.target.value)}

                       />
                   </div>
                   <div className="updateProfileImage" id='updateProfileImage'>
                       <img 
                       alt="avatar Preview"
                       src={avatarPreview}  

                       />
                       
                       <input 
                       type="file" 
                       name="logoImage" 
                       accept='image/*'
                       onChange={createServiceDataChange}
                       />
                   </div>
                  
                   <div className="updateProfileImage" id='updateProfileImage'>
                   <img 
                       alt="Description Preview"
                       src={DescriptionPreview}  

                       />
                       <input 
                       type="file" 
                       name="descriptionImage" 
                       accept='image/*' 
                       onChange={createServiceDataChanges}

                       />
                   </div>
                   <input 
                   type="submit" 
                   value="Create Service" 
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

export default CreateService