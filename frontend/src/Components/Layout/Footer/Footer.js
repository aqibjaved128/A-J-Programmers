import React, { Fragment, useEffect } from 'react';
import logo from '../../../images/logo.png';
import './Footer.css';
import { Link } from 'react-router-dom';
import {RiFacebookCircleLine} from 'react-icons/ri';
import {FaInstagram } from 'react-icons/fa';
import {TbBrandLinkedin} from 'react-icons/tb';
import { footerDetailsAction , clearErrors } from '../../../actions/footerAction';
import {useDispatch,useSelector} from 'react-redux';
import {useAlert} from 'react-alert';
import Loader from '../Loader/Loader';
import { CiYoutube } from "react-icons/ci";
import { allservicesAction } from '../../../actions/servicesAction';
import {   getAllMedia  } from '../../../actions/homeAction';

const Footer = () => {

    const dispatch = useDispatch();
    const { error:mediaError,media} = useSelector((state)=>state.getMedia);

    const {loading,error,footer} = useSelector((state)=>state.footer);
    const {error:serviceError,services} = useSelector((state)=>state.services);
    const alert = useAlert();

    useEffect(()=>{
        if (error) { 
            alert.error(error);
            dispatch(clearErrors())
        }
        if (error) {
            alert.error(serviceError);
            dispatch(clearErrors())
        }
        if (mediaError) {
            alert.error(mediaError);
            dispatch(clearErrors())
        }
        dispatch(footerDetailsAction())
        dispatch(allservicesAction())
        dispatch(getAllMedia())
    },[error,dispatch,alert,serviceError,mediaError])
  return (
  <Fragment>
    {
        loading ? (<Loader/>):(
            <Fragment>
            <footer>
               <div>
               <div className="leftFooter">
                    <img src={logo} alt="logo" />
                    <p>AJ Programmers is a leading software development organization, providing top-notch services to businesses of all kinds. Partner with us for innovative solutions tailored to your needs.</p>
                </div>
                <div className="midFooter1">
                    <h1>Services</h1>
                    {
                        services && services.map((ser)=>(
                            <Link key={ser._id} to={`/service/${ser.nameLink}/${ser._id}`}>{ser.name}  </Link>
                        ))
                    }
                </div>
                <div className="midFooter2">
                    <h1>Quick Links</h1>
                    <Link to={`/about-us`}>About Us</Link>
                    <Link to={`/services`}>Services</Link>
                    <Link to={`/our-projects`}>Portfolio</Link>
                    <Link to={`/contact-us`}>Contact Us</Link>
                    <Link to={`/partner-with-us`}>Join Us</Link>
    
                </div>
                {
                    footer && footer.map((foot)=>(
                        <div className="rightFooter" key={foot._id}>
                    <h1>Contact Us</h1>
                     <p> Call: {foot.contactNo}</p>
                    <p>Email: ajprogrammers@gmail.com</p>
                    <p>Address: {foot.contactAddress}</p>
                </div>
                    ))
                }
               </div>
               <div className="miniFooter">
                <div>
                    {
                        footer && footer.map((foot)=>(
                    <p key={foot._id}>&copy; {foot.copyright}</p>

                        ))
                    }
                </div>
                <div>
                    
                 {
                    media && media.map((me)=>(
                        <Fragment key={me._id} >
                        <a href={me.facebook} target='blank'><RiFacebookCircleLine /></a>
                        <a href={me.linkedin} target='blank'><TbBrandLinkedin /></a>
                        <a href={me.instagram} target='blank'><FaInstagram /></a>
                        <a href={me.youtube} target='blank'><CiYoutube /></a>
                        </Fragment>
                    ))
                 }
                </div>
               </div>
            </footer>
        </Fragment>
        )
    }
  </Fragment>
  )
}

export default Footer