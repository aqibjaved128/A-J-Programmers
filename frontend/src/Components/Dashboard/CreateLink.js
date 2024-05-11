import React, { Fragment, useEffect, useState } from 'react'
import MetaData from '../Layout/MetaData/MetaData'
import LinkIcon from '@material-ui/icons/Link';
import { createVideoLinkAction , clearErrors } from '../../actions/aboutUsAction';
import { useDispatch , useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { CREATE_LINK_RESET } from '../../constants/aboutUsConstants';
import {useNavigate} from 'react-router-dom';
import Loader from '../Layout/Loader/Loader';


const CreateLink = () => {

    const [link,setLink] = useState("");
    const dispatch = useDispatch();
    const history = useNavigate();
    const alert = useAlert();
    const {loading,error,success} = useSelector((state)=>state.createMember);

    const createSkillSubmitHandler = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("link", link);

        dispatch(createVideoLinkAction(myForm))

    };

    useEffect(()=>{
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (success) {
            alert.success(`Video Created Successfully`);
            dispatch({
                type:CREATE_LINK_RESET
            })

            history(`/dashboard`)
        }
    },[history,dispatch,alert,success,error])
  return (
       <Fragment>
        {
            loading ? (<Loader />):(
                <Fragment>
                <MetaData title={"Create About Video   --Admin"} />
            <div className="updateProfileContainer">
            <div className="updateProfileBox">
               <h2 className='updateProfileHeading'>Create About Video</h2>
               <form 
               className="updateProfileForm" 
               encType='multipart/form-data'
               onSubmit={createSkillSubmitHandler}
               >
            
            <div className="updateProfileName">
                       <LinkIcon />
                       <input 
                       type="text" 
                       name="link" 
                       required 
                       placeholder='Link' 
                       value={link}
                       onChange={(e)=>setLink(e.target.value)}
            
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

export default CreateLink