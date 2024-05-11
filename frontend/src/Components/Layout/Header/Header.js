import React, { Component } from 'react';
import logo from '../../../images/logo.png';
import { Link } from 'react-router-dom';
import { IoIosArrowDown } from "react-icons/io";
import  {MdOutlinePhoneInTalk}  from "react-icons/md";
import './Header.css';
import { FaInstagram   } from "react-icons/fa6";
import { RiFacebookCircleLine } from "react-icons/ri";
import { TbBrandLinkedin } from "react-icons/tb";
import { connect } from 'react-redux';
import {CiYoutube} from 'react-icons/ci';
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseSharp } from "react-icons/io5";


class Header extends Component{



  state = {clicked: false};

  handleClick = () => {
    this.setState({clicked: !this.state.clicked});

  }



  


  render (){ 

    const {services} = this.props;
    const { media} = this.props;
    
  return (
    <nav className="navbarContainer">
      <div className="leftNavbar">
        <img src={logo} alt="logo" />
      <div className="hamburger" id="mobile" onClick={this.handleClick}>
        {this.state.clicked ?  <IoCloseSharp />:<GiHamburgerMenu />}
         

    </div>
      </div>
      <div  className={this.state.clicked ? "#midNavbar active" : "#midNavbar"} id='midNavbar' >
        <ul >
          <li onClick={this.handleClick} ><Link to={`/`}  >Home</Link></li>
          <li onClick={this.handleClick}><Link to={`/our-projects`}>Our Projects</Link></li>
          <li className='minilist'  onClick={this.handleClick}><Link to={`/services`} >Services</Link> <IoIosArrowDown/>
          <div className='minilistContainer'>
               {
                services && services.map((service)=>(
                  <li onClick={this.handleClick} key={service._id}>
                  <Link to={`/service/${service.nameLink}/${service._id}`}>{service.name}</Link>
                 </li>   
                ))
               }
          </div>
          

          </li>
          <li onClick={this.handleClick}><Link to={`/about-us`}>About Us</Link></li>

          <li onClick={this.handleClick}><Link to={`/contact-us`}>Contact Us</Link></li>
        </ul>
      </div>
      <div className="rightNavbar">
        <div>
          <MdOutlinePhoneInTalk />
        </div>
        <div>
          <p>Call anytime</p>
          <p className='ikbhai'>+92 370 1067949</p>
         {
          media && media.map((me)=>(
            <div className='socialMedia' key={me._id}>
            
       
            <a href={me.facebook} target='blank'><RiFacebookCircleLine /></a>
            <a href={me.linkedin} target='blank'><TbBrandLinkedin /></a>
            <a href={me.instagram} target='blank'><FaInstagram /></a>
            <a href={me.youtube} target='blank'><CiYoutube /></a>
              </div>
          ))
         }
        </div>
      </div>
    </nav>
  )
}
}

const mapStateToProps = state => {
  return {
    services: state.services.services, 
    media: state.getMedia.media
  };
};

export default connect (mapStateToProps)(Header);