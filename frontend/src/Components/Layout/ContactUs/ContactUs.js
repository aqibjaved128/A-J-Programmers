import React, { Fragment, useEffect, useState } from 'react';
import './ContactUs.css';
import { IoLogoWhatsapp } from "react-icons/io5";
import { FaRegClock } from "react-icons/fa";
import { AiOutlinePhone } from "react-icons/ai";
import { Link , useNavigate } from 'react-router-dom';
import MetaData from '../MetaData/MetaData';
import {useDispatch , useSelector} from 'react-redux';
import {useAlert} from 'react-alert';
import { contactUsAction, clearErrors , contactPageDetailsAction } from '../../../actions/contactUsAction';
import Loader from '../Loader/Loader';
import { CONTACT_US_RESET } from '../../../constants/contactUsConstants';



const ContactUs = () => {

  const dispatch = useDispatch();
  const {loading,error,message:contactMessage,success} = useSelector((state)=>state.contactUs);
  const {error:contactError,contact} = useSelector((state)=>state.contactDetails)
  const alert = useAlert();

  const history = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [message, setMessage] = useState("");

  useEffect(()=>{

    if (contactError) {
      alert.error(contactError);
      dispatch(clearErrors());
      
    };

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success(contactMessage);
      history(`/contact-us`);
      dispatch({type:CONTACT_US_RESET})
    };

    dispatch(contactPageDetailsAction());


  },[alert,error,dispatch,success,contactMessage,contactError,history]);



  const contactUsSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name",name);
    myForm.set("email",email);
    myForm.set("country",country);
    myForm.set("message",message);

    dispatch(contactUsAction(name,email,country,message));
    setName("");
    setEmail("");
    setCountry("");
    setMessage("");
  }
  return (
    <Fragment>
      {
        loading ? (<Loader/>):(
          <Fragment>
      <MetaData title={`Contact Us - AJ Programmers`} />
      <div className="contactContainer">
        <div className='upperContactContainer'>
          <h1>Let's start a project together</h1>
          <p>"Innovate. Collaborate. Delivering Your Dreams: Let's Build Together"</p>
        </div>
        <div className='middleContactContainer'>
          <div>
            <h1>Contact Us</h1>
            <form className='contactUsForm' onSubmit={contactUsSubmitHandler}>
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
                placeholder='Email' 
                required 
                value={email} 
                onChange={(e)=>setEmail(e.target.value)}

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
                placeholder='Message ...' 
                required  
                rows={6} 
                value={message} 
                onChange={(e)=>setMessage(e.target.value)}

                />
              </div>
              <input type="submit" value="Send" className='contactBtn' />
            </form>
          </div>
         <div>
         {
            contact && contact.map((con)=>(
              <div key={con._id} className='contactdetailsCon'>
              <h1>{con.country}</h1>
              <p>Office :  {con.address}</p>
              <p>Telephone No : {con.telephone}</p>
              <p>Phone No : {con.phoneNo}</p>
              <p>Email : <a href="mailto:ajprogrammers@gmail.com" className='linkBtn'>{con.email}</a></p>
            </div>
            ))
          }
         </div>
        </div>
        <div className='lowerContactContainer'>
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
            <AiOutlinePhone />
              
            <h1>Call Us</h1>
              <p>Reach out to us </p>
              <h3>for more details</h3>
              <p className='bhai'>+92 370 1067949</p>
              <p>+92 328 2894047</p>
            </div>
            <div>
            <FaRegClock />

              <h1>Partner with Us</h1>
              
              <p>Reach out to us </p>
              <h3>for more details</h3>
              <Link to={`/partner-with-us`}>Let's innovate together</Link>
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

export default ContactUs