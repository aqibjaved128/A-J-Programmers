import { HOME_DETAILS_FAIL , HOME_DETAILS_REQUEST , HOME_DETAILS_SUCCESS , CLEAR_ERRORS, CREATE_HOME_REQUEST, CREATE_HOME_SUCCESS, CREATE_HOME_FAIL, CREATE_HOME_RESET, DELETE_HOME_REQUEST, DELETE_HOME_SUCCESS, DELETE_HOME_FAIL, DELETE_HOME_RESET, CREATE_MEDIA_REQUEST, CREATE_MEDIA_SUCCESS, CREATE_MEDIA_FAIL, CREATE_MEDIA_RESET, ALL_MEDIA_REQUEST, ALL_MEDIA_SUCCESS, ALL_MEDIA_FAIL, DELETE_MEDIA_REQUEST, DELETE_MEDIA_SUCCESS, DELETE_MEDIA_FAIL, DELETE_MEDIA_RESET } from "../constants/homeConstants";


// Get Home Details 
export const getHomeDetailsReducer = (state={homes:[]},action) => {
    switch (action.type) {
        case HOME_DETAILS_REQUEST:
            return {
                loading: true,
                homes:[]
            }
        case HOME_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                homes:action.payload.homes
            }    
        case HOME_DETAILS_FAIL:
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

// Create Home  ---Admin
export const createHomeReducer = (state={home:{}} , action ) => {
    switch (action.type) {
        case CREATE_HOME_REQUEST:
            return {
                ...state,
                loading: true
            }
        case CREATE_HOME_SUCCESS:
            return {
                ...state,
                loading: false,
                success: action.payload.success
            }    
        case CREATE_HOME_FAIL:
            return {
                ...state,
                loading: false,
                error:action.payload
            } 
        case CREATE_HOME_RESET:
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


// Delete Home Page Skills  --Admin
export const deleteHomeReducer = (state={home:{}},action) => {
    switch (action.type) {
        case DELETE_HOME_REQUEST:
            case DELETE_MEDIA_REQUEST:
            return {
                ...state,
                loadings: true
            }
        case DELETE_HOME_SUCCESS:
            case DELETE_MEDIA_SUCCESS:
            return {
                ...state,
                loadings: false,
                success: action.payload.success,
                message: action.payload.message
            }    
        case DELETE_HOME_FAIL:
            case DELETE_MEDIA_FAIL:
            return {
                ...state,
                loadings: false,
                error: action.payload
            }    
        case DELETE_HOME_RESET:
            case DELETE_MEDIA_RESET:
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

// Media Links  --Admin
export const mediaLinksReducer = (state={media:{}}, action) => {
    switch (action.type) {
        case CREATE_MEDIA_REQUEST:
            return {
                ...state,
                loading: true
            }
        case CREATE_MEDIA_SUCCESS:
            return {
                ...state,
                loading: false,
                success:action.payload.success
            } 
        case CREATE_MEDIA_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }    
        case CREATE_MEDIA_RESET:
            return {
                ...state,
                loading: false,
                success: false
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

// Get Media Links  
export const getMediaReducer = (state={media:[]}, action) => {
    switch (action.type) {
        case ALL_MEDIA_REQUEST:
            return {
                ...state,
                loading: true
            }
        case ALL_MEDIA_SUCCESS:
            return {
                ...state,
                loading: false,
                media: action.payload.media
            }  
        case ALL_MEDIA_FAIL:
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

