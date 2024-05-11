import React , {Fragment, useEffect, useState}from 'react';
import FaceIcon from '@material-ui/icons/Face';
import MetaData from '../Layout/MetaData/MetaData';
import TitleIcon from '@material-ui/icons/Title';
import {useDispatch,useSelector} from 'react-redux';
import {useAlert} from 'react-alert';
import { createMenmberCardAction , clearErrors } from '../../actions/aboutUsAction';
import { CREATE_MEMBER_RESET } from '../../constants/aboutUsConstants';
import {useNavigate} from 'react-router-dom';
import Loader from '../Layout/Loader/Loader';

const CreateMemberCards = () => {

    const dispatch = useDispatch();
    const alert = useAlert();
    const {loading,error,success} = useSelector((state)=>state.createMember);
    const history = useNavigate();

    const [name,setName] = useState("");
    const [title,setTitle] = useState("");
    const [avatar,setAvatar] = useState();
    const [avatarPreview,setAvatarPreview] = useState("/Profile.png");

    const CreateMemberCardsChange = (e) => {
        const reader = new FileReader();

        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvatarPreview(reader.result);
                setAvatar(reader.result);
            }
        }
        reader.readAsDataURL(e.target.files[0])
    };

    const updateProfileSubmitHandler = (e) => {
        e.preventDefault();

        const myForm = new FormData();
        myForm.set("name",name);
        myForm.set("title",title);
        myForm.set("avatar",avatar);

        dispatch(createMenmberCardAction(myForm));
    };


    useEffect(()=>{
        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        };
        if (success) {
            alert.success("Member Created Successfully");
            history(`/dashboard`)
            dispatch({
                type:CREATE_MEMBER_RESET
            })
        }
    },[success,error,dispatch,history,alert])
  return (
    <Fragment>
        {
            loading ? (<Loader/>):(
                
    <Fragment>
    <MetaData title={"Create Member    --Aadmin"} />
<div className="updateProfileContainer">
<div className="updateProfileBox">
   <h2 className='updateProfileHeading'>Create Team Member</h2>
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
       
       <div className="updateProfileImage" id='updateProfileImage'>
           <img 
           alt="avatar Preview" 
           src={avatarPreview}
           />
           
           <input 
           type="file" 
           name="avatar" 
           accept='image/*' 
           onChange={CreateMemberCardsChange} 
           />
       </div>
       <input 
       type="submit" 
       value="Create Member" 
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

export default CreateMemberCards