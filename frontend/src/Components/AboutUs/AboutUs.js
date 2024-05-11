import React, { Fragment, useEffect, useState } from 'react';
import './AboutUs.css';
import { IoLogoYoutube } from "react-icons/io";
import { Dialog  , DialogContent } from '@material-ui/core';
import {Link} from 'react-router-dom';
import Carousel  from 'react-material-ui-carousel';
import ClientCard from './ClientCard.js';
import Slider from "react-slick";
import TeamMembersCard from './TeamMembersCard.js';
import logo from '../../images/logo.png';
import AOS from 'aos';
import 'aos/dist/aos.css';
import MetaData from '../Layout/MetaData/MetaData.js';
import { allTeamMembersAction , clearErrors , allfeedbacksAction , allCardsAction , getVideoLinkAction } from '../../actions/aboutUsAction.js';
import {useDispatch,useSelector} from 'react-redux';
import {useAlert} from 'react-alert';
import Loader from '../Layout/Loader/Loader.js';
import SkillBarBhai from './SkillBarBhai.js';

const AboutUs = () => {

  const skills = [
    { skill: 'Web Designing & Development', level: 97 },
    { skill: 'Search Engine Optimization', level: 94 },
    { skill: 'Insights & Strategy', level: 92 },
    { skill: 'Marketing Data', level: 90 },
  ];
  

    const [open , setOpen] = useState(false);
    const dispatch = useDispatch();
    const alert = useAlert();
    const {loading,error,cards} = useSelector((state)=>state.memberCards);
    const {error:feedbackError,feedbacks} = useSelector((state)=>state.feedbacks);
    const {error:cardError,jobs} = useSelector((state)=>state.cards);
    const {error:videoError,video} = useSelector((state)=>state.getVideoLink);


    const submitReviewToggle = () => {
        open ? setOpen(false) : setOpen(true);
    }
    var settings = {
        dots: false,
      infinite: true,
      slidesToShow: 4,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
      pauseOnHover: true,
        responsive: [
          {
            breakpoint: 1400,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 1100,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
              initialSlide: 2
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
      };
      useEffect(()=>{
        if (error) {
          alert.error(error);
          dispatch(clearErrors());
        };
        if (feedbackError) {
          alert.error(feedbackError);
          dispatch(clearErrors());
        };
        if (cardError) {
          alert.error(cardError);
          dispatch(clearErrors());
        };
        if (videoError) {
          alert.error(videoError);
          dispatch(clearErrors());
        };
        dispatch(allTeamMembersAction());
        dispatch(allfeedbacksAction());
        dispatch(allCardsAction());
        dispatch(getVideoLinkAction());
        AOS.init()
      },[alert,dispatch,error,feedbackError,cardError,videoError])
  return (
         <Fragment>
          {
            loading ? (<Loader />) : (
              <Fragment>
              <MetaData title={`About Us - AJ Programmers`} />
          <div className="aboutUsContainer">
                <div className='aboutUpperContainer' >
                    <h1>WHO ARE WE?</h1>
                    <p>AJ Programmers has been providing 360 degree IT services to its clients; which include but are not limited to: software development, web development, mobile app development, infrastructure, digital marketing and operation support.</p>
                </div>
                <div className='firstMidContainer'>
                    <h1>AJ PROGRAMMERS (WEBSITE DESIGN & DEVELOPMENT, SEO, GRAPHIC DESIGNING) IN KARACHI</h1>
                    <div> 
                        <div>
                            <p>We are providing you with the best quality which you are looking for. We are experts in our work to help you to improve your business and compete with your competitors in your business line.</p>
                            <p>Our experienced team of best web designers & developers offer exclusive, user-friendly, and SEO-optimized professional website design services to make you feel proud.</p>
                            <p>For international customers, AJ Programmers provides effective Web-based technologies, experience-based solutions, technological support, and a lifelong working relationship with customers. Whether you are an entrepreneurial startup or a unit of a large company, we have the right online solutions for bringing optimum results to your firm.</p>
                        </div>
                        <div>
                         <img src={logo} alt="logo" />
                         {
                          skills && skills.map((skill,index)=>(
                          <SkillBarBhai skill={skill.skill} level={skill.level} key={index} />
    
                          ))
                         }
                        </div>
    
                </div>    
     </div>   
        <div className='secondMidContainer'>
                    <div className='secondMidContainer1'>
                        <h1>WE HAVE DONE IT ALL.</h1>
       
          
    
           
                         <button className="button">
                         <IoLogoYoutube onClick={submitReviewToggle} /> 
                           </button>
    
                         
                     
                        <Dialog
            aria-labelledby='simple-dialog-title'
            open={open}
            onClose={submitReviewToggle}
            className='dialogBox'
            >
                 
                  <DialogContent
            >
              {
                video && video.map((vid)=>(
                <iframe width="560" key={vid._id} height="330" src={vid.link} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" className='iframeTag' ></iframe>

                ))
              }
            </DialogContent>
        
                </Dialog>
            </div>
              <div className='secondMidContainer2'>
              <div>
                  <Carousel 
                        autoPlay={true}
                        indicators={false}>
                           {
                            feedbacks && feedbacks.map((abo)=>(
                              <div  className='carouselFeedContainer' key={abo._id}>
                              <i>{abo && abo.description}</i>
                              <img src={abo.avatar && abo.avatar.url} alt={abo.name} />
                              <b>{abo && abo.name}</b>
                              <p>{abo && abo.title}</p>
                          </div>
                            ))
                           }
                  </Carousel>
               
              </div>
              <div>
                  {
                    jobs && jobs.map((clientCardDetails)=>(
                      <ClientCard clientCardDetails={clientCardDetails} key={clientCardDetails._id} />
                    ))
                  }
           
              </div>
          </div>
            
    
         </div>
                <div className='thirdMidContainer'>
                    <div>
                    <p data-aos = "fade-down">Our team members</p>
                    <h1 data-aos = "fade-down">Experienced People</h1>
                    <h3 data-aos = "fade-down">Teamwork is the ability to work together toward a common vision. The ability is to directly involve the individual accomplishments toward organizational objectives. It is the fuel that allows common people to attain uncommon results.</h3>
                    </div>
    
    
                      <Slider {...settings} className='bhai' data-aos = "fade-down" >
                              {
                                cards && cards.map((memberCard)=>(
                                  <TeamMembersCard memberCard={memberCard} key={memberCard._id}/>
                                ))
                              }
                       </Slider>
                
                  
             
                </div>
            </div>
            <div className="secondAboutContainer">
            <div className='aboutBottomContainer'>
                    <h1>We have the solutions you are seeking.</h1>
                    <Link to={`/contact-us`}>Discover more</Link>
                </div>
            </div>
    
              </Fragment>
            )
          }
         </Fragment>
          )
        }


export default AboutUs