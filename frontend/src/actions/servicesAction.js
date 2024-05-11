import { ALL_SERVICES_FAIL , ALL_SERVICES_REQUEST , ALL_SERVICES_SUCCESS , CLEAR_ERRORS, CREATE_SERVICE_FAIL, CREATE_SERVICE_REQUEST, CREATE_SERVICE_SUCCESS, DELETE_SERVICE_FAIL, DELETE_SERVICE_REQUEST, DELETE_SERVICE_SUCCESS, SERVICES_DETAILS_FAIL, SERVICES_DETAILS_REQUEST, SERVICES_DETAILS_SUCCESS } from "../constants/servicesConstants";
import axios from 'axios';


// Get ALL SERVICES ACTION
export const allservicesAction = () => async (dispatch) => {
    try {
        dispatch({type:ALL_SERVICES_REQUEST});

     

        const {data} = await axios.get('/api/v1/services');

        dispatch({
            type:ALL_SERVICES_SUCCESS,
            payload:data
        })
        
    } catch (error) {
        dispatch({
            type:ALL_SERVICES_FAIL,
            payload:error.response.data.message
        })
    }
};


// Get Services Details 
export const servicesDetailsAction = (id) => async (dispatch) => {
    try {
        dispatch({type:SERVICES_DETAILS_REQUEST});

      
        const {data} = await axios.get(`/api/v1/service/${id}`);

        dispatch({
            type:SERVICES_DETAILS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type:SERVICES_DETAILS_FAIL,
            payload:error.response.data.message
        })
    }
};

// Create Services   ---Admin
export const createServiceAction = (serviceData) => async (dispatch) => {
    try {
        
        dispatch({
            type:CREATE_SERVICE_REQUEST
        });

        const config = {headers:{"Content-Type":"multipart/form-data"}}

        const {data} = await axios.post(`/api/v1/admin/service/create`,serviceData,config);

        dispatch({
            type:CREATE_SERVICE_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type:CREATE_SERVICE_FAIL,
            payload:error.response.data.message
        })
    }
};


// Delete Service Action  ---Admin
export const deleteServiceAction = (id) => async (dispatch) =>{
    try {
        dispatch({type:DELETE_SERVICE_REQUEST});


        const config = {headers: {'Content-Type': 'application/json'}};

        const {data} = await axios.delete(`/api/v1/admin/service/${id}`,config);

        dispatch({
            type:DELETE_SERVICE_SUCCESS,
            payload:data
        })
        
    } catch (error) {
        dispatch({
            type:DELETE_SERVICE_FAIL,
            payload:error.response.data.message
        })
    }
}

// Clear Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({type:CLEAR_ERRORS});
}