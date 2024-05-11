import { FOOTER_DETAILS_FAIL , FOOTER_DETAILS_SUCCESS , FOOTER_DETAILS_REQUEST , CLEAR_ERRORS, UPDATE_FOOTER_REQUEST, UPDATE_FOOTER_SUCCESS, UPDATE_FOOTER_FAIL, UPDATE_FOOTER_RESET } from "../constants/footerConstants";


// Get Footer Details 
export const getFooterDetailsReducer = (state={footer:[]},action) => {
    switch (action.type) {
        case FOOTER_DETAILS_REQUEST:
            return {
                loading:true,
                footer:[]
            }
        case FOOTER_DETAILS_SUCCESS:
            return {
                ...state,
                loading:false,
                footer:action.payload.footer
            }    
        case FOOTER_DETAILS_FAIL:
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


// Update Footer Details  --Admin
export const updateFooterDetailsReducer = (state={footer:{}}, action) => {
    switch (action.type) {
        case UPDATE_FOOTER_REQUEST:
            return {
                ...state,
                loading: true
            }
        case UPDATE_FOOTER_SUCCESS:
            return {
                ...state,
                loading: false,
                success: action.payload.success,
                message: action.payload.message
            }    
        case UPDATE_FOOTER_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }    
        case UPDATE_FOOTER_RESET:
            return {
                ...state,
                success: false,
                message: false
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

