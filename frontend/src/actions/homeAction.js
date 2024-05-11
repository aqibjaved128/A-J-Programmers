import { HOME_DETAILS_FAIL , HOME_DETAILS_REQUEST , HOME_DETAILS_SUCCESS , CLEAR_ERRORS, CREATE_HOME_FAIL, CREATE_HOME_REQUEST, CREATE_HOME_SUCCESS, DELETE_HOME_FAIL, DELETE_HOME_REQUEST, DELETE_HOME_SUCCESS, CREATE_MEDIA_FAIL, CREATE_MEDIA_REQUEST, CREATE_MEDIA_SUCCESS, ALL_MEDIA_FAIL, ALL_MEDIA_REQUEST, ALL_MEDIA_SUCCESS, DELETE_MEDIA_FAIL, DELETE_MEDIA_REQUEST, DELETE_MEDIA_SUCCESS } from "../constants/homeConstants";
import axios from 'axios';



// Get Home Details Action
export const homeDetailsAction = () => async (dispatch) => {
    try {
        dispatch({type:HOME_DETAILS_REQUEST});

        
   
        const {data} = await axios.get(`/api/v1/home`);

        dispatch({
            type:HOME_DETAILS_SUCCESS,
            payload: data
        })
        
    } catch (error) {
        dispatch({
            type:HOME_DETAILS_FAIL,
            payload:error.response.data.message
        })
    }
};


// Create Home --Admin
export const createHomeAction = (newData) => async (dispatch) => {
    try {
        dispatch({type:CREATE_HOME_REQUEST});

        
   
        const config = {headers : {"Content-Type":"multipart/form-data"}};

        const {data} = await axios.post(`/api/v1/admin/home/create`,newData,config);

        dispatch({
            type:CREATE_HOME_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type:CREATE_HOME_FAIL,
            payload:error.response.data.message
        })
    }
};


// Delete Home  Action  ---Admin
export const deleteHomeAction = (id) => async (dispatch) => {
    try {
        dispatch({type:DELETE_HOME_REQUEST});


        const config = {headers: {"Content-Type":"multipart/form-data"}};

     
        const {data} = await axios.delete(`/api/v1/admin/home/${id}`,config);

        dispatch({
            type:DELETE_HOME_SUCCESS,
            payload:data
        })
        
    } catch (error) {
        dispatch({
            type:DELETE_HOME_FAIL,
            payload:error.response.data.message,
        })
    }
}


// Media Links Action --Admin
export const createMediaAction = (mediaData) => async (dispatch) => {
    try {
        dispatch({
            type:CREATE_MEDIA_REQUEST
        })

        const config = {headers: {"Content-Type":"application/json"}}

        const {data} = await axios.post(`/api/v1/admin/media/create`,mediaData,config);


        dispatch({
            type:CREATE_MEDIA_SUCCESS,
            payload:data
        })
    } catch (error) {
        dispatch({
            type:CREATE_MEDIA_FAIL,
            payload:error.response.data.message,
        })
    }
};


/// Get All Media 
export const getAllMedia = () => async (dispatch)=> {
    try {
        dispatch({type:ALL_MEDIA_REQUEST});

        const {data} = await axios.get(`/api/v1/media`);

        dispatch({
            type:ALL_MEDIA_SUCCESS,
            payload:data
        })
        
    } catch (error) {
        dispatch({
            type:ALL_MEDIA_FAIL,
            payload:error.response.data.message
        })
    }
};

// Delete Media
export const deleteMediaAction = (id) => async (dispatch) => {
    try {
        dispatch({type:DELETE_MEDIA_REQUEST});

        const config = {headers: {"Content-Type":"application/json"}}

        const {data} = await axios.delete(`/api/v1/admin/media/${id}`,config);

        dispatch({
            type:DELETE_MEDIA_SUCCESS,
            payload:data

        })
    } catch (error) {
        dispatch({
            type:DELETE_MEDIA_FAIL,
            payload:error.response.data.message
        })
    }
};

// Clear Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({type:CLEAR_ERRORS})
};
