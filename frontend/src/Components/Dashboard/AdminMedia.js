import React, { Fragment, useEffect, useState } from 'react';
import { createMediaAction , clearErrors } from '../../actions/homeAction';
import {useDispatch,useSelector} from 'react-redux';
import {useAlert} from 'react-alert';
import MetaData from '../Layout/MetaData/MetaData';
import Loader from '../Layout/Loader/Loader';
import { FaInstagram , FaFacebook , FaLinkedin , FaYoutube} from "react-icons/fa";
import { CREATE_MEDIA_RESET } from '../../constants/homeConstants';
import {useNavigate} from 'react-router-dom';


const AdminMedia = () => {

    const [instagram , setInstagram] = useState("");
    const [facebook , setFacebook] = useState("");
    const [linkedin,setLinkedin] = useState("");
    const [youtube , setYoutube] = useState("");

    const dispatch = useDispatch();
    const {loading, error , success} = useSelector((state)=>state.adminMedia);
    const alert = useAlert();
    const history = useNavigate();


    const createMediaSubmitHandler = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("instagram",instagram);
        myForm.set("youtube",youtube);
        myForm.set("linkedin",linkedin);
        myForm.set("facebook",facebook);

        dispatch(createMediaAction(myForm));
    }


    useEffect(()=>{
        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }
        if (success) {
            alert.success(`Social Media Created Successfully`);
            history(`/dashboard`);
            dispatch({
                type:CREATE_MEDIA_RESET
            })
        }
    },[error,alert,dispatch, success , history]);
  return (
<Fragment>
        {
            loading ? (<Loader/>):(
                <Fragment>
                <MetaData title={"Create Social Media Links --Admin"}/>
               <div className="UpdatePasswordContainer">
                   <div className="updatePasswordBox">
                   <div className="updatePasswordHeading">Create Social Media</div>
                       <form className='updatePasswordForm' onSubmit={createMediaSubmitHandler}  >
                           <div className="oldPassword">
                            <FaInstagram />
                               <input 
                               type="text"
                               required 
                               placeholder='Enter Instagram Link ...'
                               value={instagram}
                               onChange={(e)=>setInstagram(e.target.value)}
                                />
                           </div>
                           <div className="newPassword">
                           <FaFacebook />
                               <input 
                               type="text" 
                               required
                               placeholder='Enter Facebook Link ...'
                               value={facebook}
                               onChange={(e)=>setFacebook(e.target.value)}
            
                                />
                           </div>
                           <div className="confirmNewPassword">
                           <FaLinkedin />
                               <input 
                               type="text" 
                               required 
                               placeholder='Enter LinkedIn Link ...'
                               value={linkedin}
                               onChange={(e)=>setLinkedin(e.target.value)}
                                />
                           </div>
                           <div className="confirmNewPassword">
                           <FaYoutube />
                               <input 
                               type="text" 
                               required 
                               placeholder='Enter Youtube Link ...'
                               value={youtube}
                               onChange={(e)=>setYoutube(e.target.value)}
                                />
                           </div>
                           <input 
                           type="submit" 
                           value="Create" 
                           className='updatePasswordBtn' />
                       </form>
                   </div>
               </div>
            </Fragment>
            )
        }
      </Fragment>  )
}

export default AdminMedia