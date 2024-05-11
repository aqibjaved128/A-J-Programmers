import React, { Fragment, useEffect, useState } from 'react';
import MetaData from '../Layout/MetaData/MetaData';
import PublicIcon from '@material-ui/icons/Public';
import HomeIcon from '@material-ui/icons/Home';
import MailIcon from '@material-ui/icons/Mail';
import PhoneIcon from '@material-ui/icons/Phone';
import { createContactAction , clearErrors } from '../../actions/contactUsAction';
import {useDispatch, useSelector} from 'react-redux';
import {useAlert} from 'react-alert';
import { CREATE_CONTACT_RESET } from '../../constants/contactUsConstants';
import {useNavigate} from 'react-router-dom';
import Loader from '../Layout/Loader/Loader';



const CreateContact = () => {

    const dispatch = useDispatch();
    const alert = useAlert();
    const {loading,error,success} = useSelector((state)=>state.createContact);
    const history = useNavigate();

    const [email,setEmail] = useState("");
    const [country,setCountry] = useState("");
    const [phoneNo,setPhoneNo] = useState("");
    const [telephone,setTelephone] = useState("");
    const [address,setAddress] = useState("");


    const contactSubmitHandler = (e) => {
        e.preventDefault();

        const myForm = new FormData();
        myForm.set("email",email);
        myForm.set("phoneNo",phoneNo);
        myForm.set("telephone",telephone);
        myForm.set("address",address);
        myForm.set("country",country);

        dispatch(createContactAction(myForm))
    }

    useEffect(()=>{
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        };
        if (success) {
            alert.success(`Contact Details created Successfully`);
            history(`/dashboard`);
            dispatch({
                type:CREATE_CONTACT_RESET
            })
        }
    },[error,alert,success,history,dispatch]);
  return (
    <Fragment>
        {
            loading ? (<Loader/>):(
                <Fragment>
                <MetaData title={"Create Contact"}/>
               <div className="UpdatePasswordContainer">
                   <div className="updatePasswordBox">
                   <div className="updatePasswordHeading">Create Contact</div>
                       <form className='updatePasswordForm' onSubmit={contactSubmitHandler} >
                           <div className="oldPassword">
                             <PublicIcon />
                               <input 
                               type="text"
                               required 
                               placeholder='Enter Country Name' 
                               value={country}
                               onChange={(e)=>setCountry(e.target.value)}
                                />
                           </div>
                           <div className="newPassword">
                            <HomeIcon />
                               <input 
                               type="text" 
                               required
                               placeholder='Enter Address'
                               value={address}
                               onChange={(e)=>setAddress(e.target.value)}
            
                                />
                           </div>
                           <div className="confirmNewPassword">
                            <PhoneIcon />
                               <input 
                               type="text" 
                               required 
                               placeholder='Enter telephone Number' 
                               value={telephone}
                               onChange={(e)=>setTelephone(e.target.value)}
                                />
                           </div>
                           <div className="confirmNewPassword">
                           <PhoneIcon />
                               <input 
                               type="text" 
                               required 
                               placeholder='Enter Phone Number' 
                               value={phoneNo}
                               onChange={(e)=>setPhoneNo(e.target.value)}
                                />
                           </div>
                           <div className="confirmNewPassword">
                             <MailIcon />
                               <input 
                               type="email" 
                               required 
                               placeholder='Enter Email Address' 
                               value={email}
                               onChange={(e)=>setEmail(e.target.value)}
            />
                           </div>
                           <input 
                           type="submit" 
                           value="Create Contact" 
                           className='updatePasswordBtn' />
                       </form>
                   </div>
               </div>
            </Fragment>
            )
        }
    </Fragment>
  )
}

export default CreateContact