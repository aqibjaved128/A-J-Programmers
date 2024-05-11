import React, { Fragment, useEffect, useState } from 'react';
import './ContactPartnerWithUs.css';
import { CiMail } from "react-icons/ci";
import { IoLogoWhatsapp  } from "react-icons/io5";
import { FaRegClock } from "react-icons/fa";
import MetaData from '../MetaData/MetaData';
import {useDispatch, useSelector} from 'react-redux';
import {useAlert} from 'react-alert';
import { companyContactUsAction , clearErrors } from '../../../actions/contactUsAction';
import { CONTACT_COMPANY_RESET } from '../../../constants/contactUsConstants';
import Loader from '../Loader/Loader';

const ContactPartnerWithUs = () => {

  const alert = useAlert();
  const dispatch = useDispatch();
  const {loading,error,message:sendMessage,success} = useSelector((state)=>state.contactUs);

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [company,setCompany] = useState("");
  const [country,setCountry] = useState("");
  const [message,setMessage] = useState("");


  const contactUsSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name",name);
    myForm.set("email",email);
    myForm.set("company",company);
    myForm.set("country",country);
    myForm.set("message",message);

    dispatch(companyContactUsAction(name,email,country,message,company));

    setName("");
    setEmail("");
    setMessage("");
    setCompany("");
    setCountry("");
  }


  useEffect(()=>{
    if (error) {
      alert.error(error);
      dispatch(clearErrors())
    }
    if (success) {
      alert.success(sendMessage);

      dispatch({type:CONTACT_COMPANY_RESET})
    }
  },[dispatch,error,alert,sendMessage,success])

  return (
    <Fragment>
      {
        loading ? (<Loader />):(
          <Fragment>
      <MetaData title={`Join Us - AJ Programmers`} />
         <div className="contactPartnerContainer">
        <div className='uppercontactPartnerContainer'>
          <h1>Partner with Our Passionate Team</h1>
          <p>"Dream It, We Build It: Your Software Solutions Partner: Partner with Us"</p>
        </div>
        <div className='middlecontactPartnerContainer'>
            <h1>Partner with Us</h1>
            <form className='contactUsPartnerForm' onSubmit={contactUsSubmitHandler}>
              <div>
                <input 
                type="text" 
                placeholder='Full Name' 
                required 
                value={name} 
                onChange={(e)=>setName(e.target.value)}
                 />
              </div>
              <div>
                <input 
                type="email" 
                placeholder='Business Email' 
                required 
                value={email} 
                onChange={(e)=>setEmail(e.target.value)} 
                />
              </div>
              <div>
                <input 
                type="text" 
                placeholder='Company Name' 
                required 
                value={company} 
                onChange={(e)=>setCompany(e.target.value)} 
                 />
              </div>
              <div>
                <input 
                type="text" 
                placeholder='Country' 
                required 
                value={country}
                onChange={(e)=>setCountry(e.target.value)} 
                />
              </div>
              <div>
                <textarea 
                placeholder='About Company ...' 
                required  
                rows={10} 
                value={message} 
                onChange={(e)=>setMessage(e.target.value)}
                />
              </div>
              <input 
              type="submit" 
              value="Send" 
              className='contactPartnerBtn' 
              />
            </form>
         </div>
        
        
        <div className='lowercontactPartnerContainer'>
          <div>
          <h1>GET IN TOUCH</h1>
          <p>For all enquiries, please email us using the form above. We will respond within 24 hours!</p>
          </div>
          <div>
            <div>
              <IoLogoWhatsapp />
              <h1>Whatsapp Us</h1>
              <p>Reach out to us</p>
              <h3>for more details</h3>
              <p className='bhai'>+92 370 1067949</p>
              <p>+92 328 2894047</p>
            </div>
            <div>
            <CiMail />
              
            <h1>Contact Us</h1>
              <p>Reach out to us </p>
              <h3>for more details</h3>
              <p className='bhai'>+92 370 1067949</p>
              <p>ajprogrammers@gmail.com</p>
            </div>
            <div>
            <FaRegClock />

              <h1>Partner with Us</h1>
              
              <p>Reach out to us </p>
              <h3>for more details</h3>
              <p>Let's innovate together</p>
            </div>
          </div>
        </div>

      </div>
    </Fragment>
        )
      }
    </Fragment>
  )
}

export default ContactPartnerWithUs