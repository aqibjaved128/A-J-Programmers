import { CONTACT_US_FAIL , CLEAR_ERRORS , CONTACT_US_REQUEST , CONTACT_US_RESET , CONTACT_US_SUCCESS, CONTACT_COMPANY_REQUEST, CONTACT_COMPANY_SUCCESS, CONTACT_COMPANY_FAIL, CONTACT_COMPANY_RESET, CONTACT_DETAILS_REQUEST, CONTACT_DETAILS_SUCCESS, CONTACT_DETAILS_FAIL, CREATE_CONTACT_REQUEST, CREATE_CONTACT_SUCCESS, CREATE_CONTACT_FAIL, CREATE_CONTACT_RESET, DELETE_CONTACT_REQUEST, DELETE_CONTACT_SUCCESS, DELETE_CONTACT_FAIL, DELETE_CONTACT_RESET } from "../constants/contactUsConstants";


/// USERS CONTACT US 
export const contactUsReducer = (state={contactUs:{}}, action) => {
    switch (action.type) {
        case CONTACT_US_REQUEST:
            case CONTACT_COMPANY_REQUEST:
            return {
                ...state,
                loading: true
            }
        case CONTACT_US_SUCCESS:
            case CONTACT_COMPANY_SUCCESS:
            return {
                ...state,
                loading: false,
                message: action.payload.message,
                success: action.payload.success
            }    
        case CONTACT_US_FAIL:
            case CONTACT_COMPANY_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }    
        case CONTACT_US_RESET:
            case CONTACT_COMPANY_RESET:
            return {
                ...state,
                loading: false,
                message: null,
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



/// GET CONTACT PAGE DETAILS 
export const getContactPageDetails = (state={contact:[]},action) => {
    switch (action.type) {
        case CONTACT_DETAILS_REQUEST:
            return {
                loading:true,
                contact:[]
            }
        case CONTACT_DETAILS_SUCCESS:
            return {
                ...state,
                loading:false,
                contact:action.payload.contact
            } 
        case CONTACT_DETAILS_FAIL:
            return {
                ...state,
                loading:false,
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

/// Create Contact Details  ---Admin
export const createContactReducer = (state={contact:{}}, action) => {
    switch (action.type) {
        case CREATE_CONTACT_REQUEST:
            case DELETE_CONTACT_REQUEST:
            return {
                ...state,
                loading: true
            }
        case CREATE_CONTACT_SUCCESS:
            return {
                ...state,
                loading: false,
                success: action.payload.success
            }    
        case DELETE_CONTACT_SUCCESS:
            return {
                ...state,
                loading: false,
                success: action.payload.success,
                message: action.payload.message
            }    
        case CREATE_CONTACT_FAIL:
            case DELETE_CONTACT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }  
        case CREATE_CONTACT_RESET:
            return {
                ...state,
                success: false
            } 
        case DELETE_CONTACT_RESET:
            return {
                ...state,
                success: false,
                message:false
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