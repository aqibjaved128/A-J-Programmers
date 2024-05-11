import './App.css';
import {BrowserRouter as Router , Routes , Route} from 'react-router-dom';
import Header from './Components/Layout/Header/Header';
import WebFont from 'webfontloader';
import React from 'react';
import Footer from './Components/Layout/Footer/Footer';
import ContactUs from './Components/Layout/ContactUs/ContactUs';
import ContactPartnerWithUs from './Components/Layout/ContactUs/ContactPartnerWithUs';
import OurProjects from './Components/OurProjects/OurProjects';
import ProjectDetails from './Components/OurProjects/ProjectDetails';
import Service from './Components/Services/Service';
import ServicesDetails from './Components/Services/ServicesDetails';
import AboutUs from './Components/AboutUs/AboutUs';
import Home from './Components/Home/Home';
import PageNotFound from './Components/Layout/PageNotFound/PageNotFound';
import Login from './Components/Login/Login';
import LoginUserDetails from './Components/Login/LoginUserDetails';
import UpdatePassword from './Components/Login/UpdatePassword';
import { useDispatch, useSelector } from 'react-redux';
import { loadUserAction  } from './actions/userAction';
import UpdateProfile from './Components/Login/UpdateProfile';
import ForgotPassword from './Components/Login/ForgotPassword';
import ResetPassword from './Components/Login/ResetPassword';
import UserOptions from './Components/Layout/UserOptions/UserOptions';
import Dashboard from './Components/Dashboard/Dashboard';
import AdminServices from './Components/Dashboard/AdminServices';
import CreateService from './Components/Dashboard/CreateService';
import CreateMemberCards from './Components/Dashboard/CreateMemberCards';
import AdminMembers from './Components/Dashboard/AdminMembers';
import CreateFeedback from './Components/Dashboard/CreateFeedback';
import AdminFeedbacks from './Components/Dashboard/AdminFeedbacks';
import CreateCards from './Components/Dashboard/CreateCards';
import AdminCards from './Components/Dashboard/AdminCards';
import CreateContact from './Components/Dashboard/CreateContact';
import AdminContact from './Components/Dashboard/AdminContact';
import AdminFooter from './Components/Dashboard/AdminFooter';
import UpdateFooter from './Components/Dashboard/UpdateFooter';
import ContactOptions from './Components/Layout/Header/ContactOptions';
import AdminProjects from './Components/Dashboard/AdminProjects';
import CreateProject from './Components/Dashboard/CreateProject';
import CreateHome from './Components/Dashboard/CreateHome';
import AdminHome from './Components/Dashboard/AdminHome';
import CreateLink from './Components/Dashboard/CreateLink';
import AdminLink from './Components/Dashboard/AdminLink';
import Loader from './Components/Layout/Loader/Loader';
import AdminMedia from './Components/Dashboard/AdminMedia';
import AdminMedias from './Components/Dashboard/AdminMedias';



function App() {

  const {isAuthenticated,user,loading} = useSelector((state)=>state.loginUser);

  const dispatch = useDispatch();


  React.useEffect(()=>{

   WebFont.load({
    google:{
      families:["Roboto","Poppins","Inter","Lato"]
    }
   })
   dispatch(loadUserAction())

  },[dispatch]);
  return (
    <Router>
      {
        loading ? (<Loader/>):(
         <>
          <Header/>
      {isAuthenticated && <UserOptions user={user} /> }  

      <ContactOptions />
      <Routes>
        <Route extact path='/' element={<Home/>} />
        <Route extact path='/contact-us' element={<ContactUs/>} />
        <Route extact path='/partner-with-us' element={<ContactPartnerWithUs/>} />
        <Route extact path='/our-projects' element={<OurProjects/>} />
        <Route extact path='/project/:id' element={<ProjectDetails/>} />
        <Route extact path='/services' element={<Service/>} />
        <Route extact path='/service/:name/:id' element={<ServicesDetails/>} />
        <Route extact path='/about-us' element={<AboutUs />} />
        <Route extact path='/million-dreams-login' element={<Login />} />
        <Route extact path='/account' element={isAuthenticated ? <LoginUserDetails />:<Login/>} />   
        <Route extact path='/password/update' element={isAuthenticated ? <UpdatePassword />:<Login/>} /> 
        <Route extact path='/me/update' element={isAuthenticated ? <UpdateProfile />:<Login/>} /> 
        <Route extact path='/password/forgot' element={<ForgotPassword />} />
        <Route extact path='/admin/password/reset/:token' element={<ResetPassword />} />
        <Route extact path='/dashboard' element={isAuthenticated ? <Dashboard/>:<Login/>} />
        <Route extact path='/admin/services' element={isAuthenticated ? <AdminServices/>:<Login/>} />
        <Route extact path='/admin/service' element={isAuthenticated ? <CreateService/>:<Login/>} />
        <Route extact path='/admin/member' element={isAuthenticated ? <CreateMemberCards/>:<Login/>} />
        <Route extact path='/admin/members' element={isAuthenticated ? <AdminMembers/>:<Login/>} />
        <Route extact path='/admin/feedback' element={isAuthenticated ? <CreateFeedback/>:<Login/>} />
        <Route extact path='/admin/feedbacks' element={isAuthenticated ? <AdminFeedbacks/>:<Login/>} />
        <Route extact path='/admin/card' element={isAuthenticated ? <CreateCards/>:<Login/>} />
        <Route extact path='/admin/cards' element={isAuthenticated ? <AdminCards/>:<Login/>} />
        <Route extact path='/admin/contact' element={isAuthenticated ? <CreateContact/>:<Login/>} />
        <Route extact path='/admin/contacts' element={isAuthenticated ? <AdminContact/>:<Login/>} />
        <Route extact path='/admin/footers' element={isAuthenticated ? <AdminFooter/>:<Login/>} />
        <Route extact path='/admin/footer/:id' element={isAuthenticated ? <UpdateFooter/>:<Login/>} />
        <Route extact path='/admin/projects' element={isAuthenticated ? <AdminProjects/>:<Login/>} />
        <Route extact path='/admin/project' element={isAuthenticated ? <CreateProject/>:<Login/>} />
        <Route extact path='/admin/home' element={isAuthenticated ? <CreateHome/>:<Login/>} />
        <Route extact path='/admin/homes' element={isAuthenticated ? <AdminHome/>:<Login/>} />
        <Route extact path='/admin/video' element={isAuthenticated ? <CreateLink/>:<Login/>} />
        <Route extact path='/admin/videos' element={isAuthenticated ? <AdminLink/>:<Login/>} />
        <Route extact path='/admin/media' element={isAuthenticated ? <AdminMedia/>:<Login/>} />
        <Route extact path='/admin/medias' element={isAuthenticated ? <AdminMedias/>:<Login/>} />
        <Route extact path='/*' element={<PageNotFound />} />
      </Routes>
      <Footer/>
         </>
        )
      }
    </Router>
  );
}

export default App;
