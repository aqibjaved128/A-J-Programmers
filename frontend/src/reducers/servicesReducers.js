import { ALL_SERVICES_FAIL , ALL_SERVICES_REQUEST , ALL_SERVICES_SUCCESS , CLEAR_ERRORS, CREATE_SERVICE_FAIL, CREATE_SERVICE_REQUEST, CREATE_SERVICE_RESET, CREATE_SERVICE_SUCCESS, DELETE_SERVICE_FAIL, DELETE_SERVICE_REQUEST, DELETE_SERVICE_RESET, DELETE_SERVICE_SUCCESS, SERVICES_DETAILS_FAIL, SERVICES_DETAILS_REQUEST, SERVICES_DETAILS_SUCCESS } from "../constants/servicesConstants";


// GET ALL SERVICES 
export const getAllServicesReducer = (state={services:[]},action) => {
    switch (action.type) {
        case ALL_SERVICES_REQUEST:
            return {
                loading: true,
                services:[]
            }
        case ALL_SERVICES_SUCCESS:
            return {
                ...state,
                loading: false,
                services:action.payload.services,
                servicesCount: action.payload.servicesCount
            }   
        case ALL_SERVICES_FAIL:
            return {
                ...state,
                loading: false,
                error:action.payload
            }  
        case CLEAR_ERRORS:
            return {
                ...state,
                error:null
            }       
            
    
        default:
            return state;
    }
};


// GET SERVICE DETAILS 
export const getServicesDetailsReducer = (state={service:{}},action) => {
    switch (action.type) {
        case SERVICES_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case SERVICES_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                service:action.payload.service
            }    
        case SERVICES_DETAILS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }    
        case CLEAR_ERRORS:
            return {
                ...state,
                error:null
            }    
    
        default:
            return state;
    }
};

// Create Service  Reducer  --Admin
export const createServiceReducer = (state={service:{}},action) => {
    switch (action.type) {
        case CREATE_SERVICE_REQUEST:
            return {
                ...state,
                loading:true
            }
        case CREATE_SERVICE_SUCCESS:
            return {
                ...state,
                loading:false,
                success: action.payload.success,
                service: action.payload.service
            }    
            
        case CREATE_SERVICE_FAIL:
            return {
                ...state,
                loading:false,
                error: action.payload
            }    
        case CREATE_SERVICE_RESET:
            return {
                ...state,
                success:false
            }    
        case CLEAR_ERRORS:
            return {
                ...state,
                error:null
            }    
        default:
            return state;
    }
};


// Delete Service Reducer  --Admin
export const deleteServiceReducer = (state={service:{}},action) => {
    switch (action.type) {
        case DELETE_SERVICE_REQUEST:
            return {
                ...state,
                loading: true
            }
        case DELETE_SERVICE_SUCCESS:
        return {
            ...state,
            loading: false,
            success: action.payload.success,
            message: action.payload.message
        }    

        case DELETE_SERVICE_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case DELETE_SERVICE_RESET:
            return {
                ...state,
                success:false,
                message:false,
            }    
        case CLEAR_ERRORS:
            return {
                ...state,
                error:null
            }    
    
        default:
            return state;
    }
};


