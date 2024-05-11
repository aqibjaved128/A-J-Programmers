import { CONTACT_US_REQUEST , CONTACT_US_FAIL  , CONTACT_US_SUCCESS , CLEAR_ERRORS, CONTACT_COMPANY_FAIL, CONTACT_COMPANY_REQUEST, CONTACT_COMPANY_SUCCESS, CONTACT_DETAILS_FAIL, CONTACT_DETAILS_REQUEST, CONTACT_DETAILS_SUCCESS, CREATE_CONTACT_FAIL, CREATE_CONTACT_REQUEST, CREATE_CONTACT_SUCCESS, DELETE_CONTACT_REQUEST, DELETE_CONTACT_SUCCESS, DELETE_CONTACT_FAIL } from "../constants/contactUsConstants";
import axios from 'axios';



  
// USER CONTACT US ACTION 
export const contactUsAction = (name,email,country,message) => async (dispatch) => {
    try {

        dispatch({type:CONTACT_US_REQUEST});

        const config = {headers:{'Content-Type': 'application/json'}};

    

        const {data} = await axios.post(`/api/v1/contactUs`,{name,
            email,
            country,
            message},config);

        dispatch({
            type:CONTACT_US_SUCCESS,
            payload:data
        })
        
    } catch (error) {
        dispatch({
            type:CONTACT_US_FAIL,
            payload:error.response.data.message
        })
    }
};



// COMPANIES CONTACT US 
export const companyContactUsAction = ( name,email,country, message, companyName) => async ( dispatch) => {
    try {
        dispatch({type:CONTACT_COMPANY_REQUEST});



        const config = {headers: {'Content-Type': 'application/json'}};

        const {data} = await axios.post(`/api/v1/company/contactUs`,{name,email,country,message,companyName},config);

        dispatch({
            type:CONTACT_COMPANY_SUCCESS,
            payload:data
        })
        
        
    } catch (error) {
        dispatch({
            type:CONTACT_COMPANY_FAIL,
            payload:error.response.data.message,
        })
    }
};


/// GET CONTACT PAGE DETAILS 
export const contactPageDetailsAction = () => async (dispatch) => {
    try {
        dispatch({type:CONTACT_DETAILS_REQUEST});


        const { data} = await axios.get(`/api/v1/contact`);

        dispatch({
            type:CONTACT_DETAILS_SUCCESS,
            payload: data
        })
        
    } catch (error) {
        dispatch({
            type:CONTACT_DETAILS_FAIL,
            payload:error.response.data.message
        })
    }
}


// Create Contact Action --Admin
export const createContactAction = (newDataChange) => async (dispatch) => {
    try {
        dispatch({type:CREATE_CONTACT_REQUEST});


        const config = {headers: {'Content-Type': 'application/json'}};

        const {data} = await axios.post(`/api/v1/admin/contact/create`,newDataChange,config);

        dispatch({
            type:CREATE_CONTACT_SUCCESS,
            payload: data
        })
        
    } catch (error) {
        dispatch({
            type:CREATE_CONTACT_FAIL,
            payload:error.response.data.message
        })
    }
}


// Delete Contact Action  --Admin
export const deleteContactAction = (id) => async (dispatch) => {
    try {
        dispatch({type:DELETE_CONTACT_REQUEST});



        const config = {headers: {'Content-Type': 'application/json'}};

        const {data} = await axios.delete(`/api/v1/admin/contact/${id}`,config);

        dispatch({
            type:DELETE_CONTACT_SUCCESS,
            payload: data
        })
        
    } catch (error) {
        dispatch({
            type:DELETE_CONTACT_FAIL,
            payload:error.response.data.message
        })
    }
}
// Clear Errors 
export const clearErrors = () => async (dispatch) => {
    dispatch({type:CLEAR_ERRORS})
}