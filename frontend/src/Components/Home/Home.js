import React, { Fragment, useEffect } from 'react';
import './Home.css';
import * as THREE from 'three';
import { Link } from 'react-router-dom';
import moonImage from '../../images/moon.jpg';
import venusImage from '../../images/venus.jpg';
import spaceImage from '../../images/space.jpg';
import {Typography} from '@material-ui/core';
import { MouseOutlined } from '@material-ui/icons';
import { FaInstagram   } from "react-icons/fa6";
import { RiFacebookCircleLine   } from "react-icons/ri";
import { TbBrandLinkedin } from "react-icons/tb";
import SkillsCard from './SkillsCard.js';
import Slider from "react-slick";
import AboutCover from '../../images/about2.png';
import Carousel  from 'react-material-ui-carousel';
import AOS from 'aos';
import 'aos/dist/aos.css';
import ServicesCard from '../Services/ServicesCard.js';
import OurProjectsCard from '../OurProjects/OurProjectsCard.js';
import TeamMembersCard from '../AboutUs/TeamMembersCard.js';
import ClientCard from '../AboutUs/ClientCard.js';
import MetaData from '../Layout/MetaData/MetaData.js';
import {useDispatch,useSelector} from 'react-redux';
import {useAlert} from 'react-alert';
import { allservicesAction , clearErrors } from '../../actions/servicesAction.js';
import Loader from '../Layout/Loader/Loader.js';
import { allTeamMembersAction  , allfeedbacksAction , allCardsAction } from '../../actions/aboutUsAction.js';
import { allProjectsAction  } from '../../actions/projectsAction';
import { homeDetailsAction } from '../../actions/homeAction.js';
import { CiYoutube } from "react-icons/ci";
import {   getAllMedia  } from '../../actions/homeAction';




const Home = () => {

  const dispatch = useDispatch();
  const {loading,error,services} = useSelector((state)=>state.services);
  const {error:memberError,cards} = useSelector((state)=>state.memberCards);
  const {error:feedbackError,feedbacks} = useSelector((state)=>state.feedbacks);
  const {error:cardError,jobs} = useSelector((state)=>state.cards);
  const {error:projectErrors,projects  } = useSelector((state)=>state.projects);
  const {error:homeErrors,homes  } = useSelector((state)=>state.homes);
  const { error:mediaError,media} = useSelector((state)=>state.getMedia);


  const alert = useAlert();
   
  var team = {
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


  var settings = {
    dots: false,
  infinite: true,
  slidesToShow: 11,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
  speed:2000,
  pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 10,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 8,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      }
    ]
  };

  var setting = {
    dots: false,
  infinite: true,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
  pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };



  useEffect(()=>{
   
    AOS.init()
   
    const textureLoader = new THREE.TextureLoader();

const moonTexture = textureLoader.load(moonImage);
const venusTexture = textureLoader.load(venusImage);
const spaceTexture = textureLoader.load(spaceImage);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(4, 4, 8);

const canvas = document.querySelector(".homeCanvas");
const renderer = new THREE.WebGLRenderer({ canvas });

const moonGeometry = new THREE.SphereGeometry(2, 64, 64);
const moonMaterial = new THREE.MeshStandardMaterial({ map: moonTexture });
const moon = new THREE.Mesh(moonGeometry, moonMaterial);

const venusGeometry = new THREE.SphereGeometry(3, 64, 64);
const venusMaterial = new THREE.MeshBasicMaterial({ map: venusTexture });
const venus = new THREE.Mesh(venusGeometry, venusMaterial);
venus.position.set(8, 5, 5);

const pointLight = new THREE.PointLight(0xffffff, 1);
const pointLight2 = new THREE.PointLight(0xffffff, 0.1);

pointLight.position.set(8, 5, 5);
pointLight2.position.set(-8, -5, -5);

scene.add(moon);
scene.add(venus);
scene.add(pointLight);
scene.add(pointLight2);
scene.background = spaceTexture;

const constSpeed = 0.01;
window.addEventListener("mousemove", (e) => {
  if (e.clientX <= window.innerWidth / 2) {
    moon.rotation.x -= constSpeed;
    moon.rotation.y += constSpeed;
    venus.rotation.x -= constSpeed;
    venus.rotation.y += constSpeed;
  }

  if (e.clientX > window.innerWidth / 2) {
    moon.rotation.x -= constSpeed;
    moon.rotation.y -= constSpeed;
    venus.rotation.x -= constSpeed;
    venus.rotation.y -= constSpeed;
  }

  if (e.clientY > window.innerHeight / 2) {
    moon.rotation.x -= constSpeed;
    moon.rotation.y += constSpeed;
    venus.rotation.x -= constSpeed;
    venus.rotation.y += constSpeed;
  }

  if (e.clientY <= window.innerHeight / 2) {
    moon.rotation.x -= constSpeed;
    moon.rotation.y -= constSpeed;
    venus.rotation.x -= constSpeed;
    venus.rotation.y -= constSpeed;
  }
});

const animate = () => {
  requestAnimationFrame(animate);
  moon.rotation.y += 0.001;
  venus.rotation.y += 0.001;
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.render(scene, camera);
};

animate();

return window.addEventListener("scroll",()=>{
  camera.rotation.z = window.scrollY * 0.001;
  camera.rotation.y = window.scrollY * 0.003;


  

 });

 

  },[]);
useEffect(()=>{
  
 if (error) {
  alert.error(error);
  dispatch(clearErrors());
}
if (memberError) {
  alert.error(memberError);
  dispatch(clearErrors());
}
if (cardError) {
  alert.error(cardError);
  dispatch(clearErrors());
}
if (feedbackError) {
  alert.error(feedbackError);
  dispatch(clearErrors());
}
if (projectErrors) {
  alert.error(projectErrors);
  dispatch(clearErrors());
}
if (homeErrors) {
  alert.error(homeErrors);
  dispatch(clearErrors());
}
if (mediaError) {
  alert.error(mediaError);
  dispatch(clearErrors());
}
dispatch(allservicesAction());
dispatch(allTeamMembersAction());
dispatch(allfeedbacksAction());
dispatch(allCardsAction());
dispatch(allProjectsAction());
dispatch(homeDetailsAction());
dispatch(getAllMedia());
},[alert,dispatch,error,memberError,cardError,feedbackError,projectErrors,homeErrors,mediaError])
  return (
       <div className='mianBhaijan'>
          <Fragment>
      <MetaData title={`AJ Programmers - Software Development Company`} />
      <div className='home'>
      <canvas className='homeCanvas'></canvas> 
      <div className="homeCanvasContainer">
  
        {
          media && media.map((me)=>(
            <Typography variant='h1' key={me._id}>
          
                      <a href={me.facebook} target='blank'><RiFacebookCircleLine /></a>
                        <a href={me.linkedin} target='blank'><TbBrandLinkedin /></a>
                        <a href={me.instagram} target='blank'><FaInstagram /></a>
                        <a href={me.youtube} target='blank'><CiYoutube /></a>
      
      
            </Typography>
          ))
        }
         
  
          <div className="homeCanvasBox">
            <Typography variant="h2">DESIGNERS</Typography>
            <Typography variant="h2">DEVELOPERS</Typography>
            <Typography variant="h2">WEB DEVELOPERS</Typography>
            <Typography variant="h2">DIGITAL MARKETERS</Typography>
  
          </div>
  
        </div>
  
        <div className="homeScrollBtn">
          <MouseOutlined />
        </div>

      </div>
     <Fragment>
      {
        loading ? (<Loader/>):(
          <Fragment>
            <div className="skillsContainer">
     <Slider {...settings} className='bhaiii' >
          {
            homes && homes.map((home)=>(
              <SkillsCard home={home} key={home._id} />
            ))
          }
        </Slider>
     </div>
    <div className="homeAboutContainer">
     <div>
     <p data-aos = "fade-down">Get To Know</p>
      <h1 data-aos = "fade-down">About Us</h1>
      <h2 data-aos = "fade-down">We do design, code & develop Software finally launch.</h2>
      <p data-aos = "fade-down"> <b>Welcome to AJ Programmers, </b> a leading software company dedicated to delivering innovative solutions that empower businesses and individuals alike. With a passion for technology and a commitment to excellence, we strive to transform ideas into reality through cutting-edge software development.</p>
      <div data-aos = "fade-down">
        <h3>Contact us today to embark on your software development journey with AJ Programmers</h3>
      </div>
     </div>
     <div>
      <img src={AboutCover} alt="aboutCover" data-aos = "fade-down" />
     </div>
    </div>
    <div className="homeServiceContainer">
      <div>
      <p data-aos = "fade-down">Our Solutions</p>
      <h1 data-aos = "fade-down">Services We Provide</h1>
      <h3 data-aos = "fade-down">Unlocking your business's full potential through cutting-edge IT solutions.</h3>
      </div>
      <div>
    <Slider {...setting} className='serviceBhai' data-aos = "fade-down" >
     {
      services && services.map((service)=>(
        <ServicesCard service={service} key={service._id} />
      ))
     }
  
    </Slider>
      </div>
    </div >
    <div className="homePortfolioContainer">
      <div>
        <h1 data-aos = "fade-down" >Our Project</h1>
        <p data-aos = "fade-down" >Seamless integration, unmatched performance - that's our IT promise.</p>
      </div>
      <div className='bottomProjectContainer' data-aos = "fade-down" >
      {
                            projects && projects.map((project)=>(<OurProjectsCard 
                                project={project} 
                                key={project._id} 
                                />))
                        }
  
      </div>
      <Link data-aos = "fade-down"  to={`/our-projects`}>View Our Portfolio</Link>
    </div>
    <div className="aboutOurTeamContainer">
    <div className="thirdMidContainer">
      <div>
        <p  data-aos = "fade-down"> Our Team </p>
        <h1  data-aos = "fade-down">Meet Our Team</h1>
        <h3  data-aos = "fade-down">Our team is highly skilled, reliable, and always available to address our technical issues.</h3>
      </div>
      <Slider {...team}  data-aos = "fade-down"  >
      {
                              cards && cards.map((memberCard)=>(
                                <TeamMembersCard memberCard={memberCard} key={memberCard._id}/>
                              ))
      }
  
       </Slider> 
       
    </div>
    </div>
    <div className="testinomialContainer">
    <div className="testinomialContainer1">
      <p data-aos = "fade-down">Testimonial</p>
      <h1 data-aos = "fade-down">What Customers Says About Us</h1>
      <h3 data-aos = "fade-down">Transforming businesses through innovative technology and exceptional service.</h3>
      <h5 data-aos = "fade-down" >"Where IT expertise meets customer satisfaction."</h5>
    </div>
    <div className='testinomialContainer2'>
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
                        <ClientCard clientCardDetails={clientCardDetails} key={clientCardDetails._id}  />
                      ))
                    }
           
              </div>
          </div>
    </div>
    </div>
    <div className="secondAboutContainer homeContactContainer">
          <div className='aboutBottomContainer'>
                  <h1 >We have the solutions you are seeking.</h1>
                  <Link to={`/contact-us`} >Discover more</Link>
              </div>
    </div>
           </Fragment>
        )
      }
     </Fragment>
    
     </Fragment>
       </div>
     )
  }

export default Home
