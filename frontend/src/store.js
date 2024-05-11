import {configureStore} from '@reduxjs/toolkit';
import { deleteProjectReducer, getAllAdminProjectsReducer, getAllprojectsReducer, projectDetailsReducer } from './reducers/projectReducers';
import { contactUsReducer, createContactReducer, getContactPageDetails } from './reducers/contactUsReducers';
import { createServiceReducer, deleteServiceReducer, getAllServicesReducer, getServicesDetailsReducer } from './reducers/servicesReducers';
import { createCardReducer, createFeedbackReducer, createMemberReducer, deleteCardReducer, deleteFeedbackReducer, deleteTeamMemberReducer, getAllCardsReducers, getAllFeedbacksReducers, getAllTeamMemebersReducers, getVideoLinkReducer } from './reducers/aboutUsReducers';
import {  getFooterDetailsReducer, updateFooterDetailsReducer } from './reducers/footerReducers';
import { createHomeReducer, deleteHomeReducer, getHomeDetailsReducer, getMediaReducer, mediaLinksReducer } from './reducers/homeReducers';
import { forgotPasswordReducer, getLoginDetailsReducer, getResetPasswordReducer, loginUserReducer, updatePasswordReducer } from './reducers/userReducer';

const store = configureStore({
    reducer:{
    projects: getAllprojectsReducer,
    projectDetails: projectDetailsReducer,
    contactUs:contactUsReducer,
    contactDetails:getContactPageDetails,
    services:getAllServicesReducer,
    servicesDetails:getServicesDetailsReducer,
    memberCards:getAllTeamMemebersReducers,
    feedbacks:getAllFeedbacksReducers,
    cards:getAllCardsReducers,
    footer:getFooterDetailsReducer,
    homes:getHomeDetailsReducer,
    loginUser:loginUserReducer,
    updatePassword:updatePasswordReducer,
    userDetails:getLoginDetailsReducer,
    forgotPassword:forgotPasswordReducer,
    resetPassword:getResetPasswordReducer,
    adminService:createServiceReducer,
    deleteService:deleteServiceReducer,
    createMember:createMemberReducer,
    deleteMember:deleteTeamMemberReducer,
    createFeedback:createFeedbackReducer,
    deleteFeedback:deleteFeedbackReducer,
    createCard:createCardReducer,
    deleteCard:deleteCardReducer,
    createContact:createContactReducer,
    updateFooter:updateFooterDetailsReducer,
    deleteProjects:deleteProjectReducer,
    createHome:createHomeReducer,
    deleteHome:deleteHomeReducer,
    getAdminProjects:getAllAdminProjectsReducer,
    getVideoLink:getVideoLinkReducer,
    adminMedia:mediaLinksReducer,
    getMedia:getMediaReducer
    }
})

export default store;
