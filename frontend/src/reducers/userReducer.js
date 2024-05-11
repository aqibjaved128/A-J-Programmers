import { LOGIN_USER_FAIL , LOGIN_USER_REQUEST , LOGIN_USER_SUCCESS , CLEAR_ERRORS, USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_DETAILS_FAIL, LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOAD_USER_FAIL, UPDATE_PASSWORD_REQUEST, UPDATE_PASSWORD_SUCCESS, UPDATE_PASSWORD_FAIL, UPDATE_PASSWORD_RESET, LOGOUT_USER_SUCCESS, LOGOUT_USER_FAIL, UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_SUCCESS, UPDATE_PROFILE_FAIL, UPDATE_PROFILE_RESET, FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_FAIL, FORGOT_PASSWORD_SUCCESS, RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAIL } from "../constants/userConstants";
 

// Update Password  --Admin
export const updatePasswordReducer = (state={user:{}}, action) => {
    switch (action.type) {
        case UPDATE_PASSWORD_REQUEST:
            case UPDATE_PROFILE_REQUEST:
            return {
                ...state,
                loading: true
            }
         
        case UPDATE_PASSWORD_SUCCESS:
            case UPDATE_PROFILE_SUCCESS:
            return {
                ...state,
                loading: false,
                success: action.payload.success,
                isUpdated:true
            } 
         
        case UPDATE_PASSWORD_FAIL:
            case UPDATE_PROFILE_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
    
        
        case UPDATE_PASSWORD_RESET:
            case UPDATE_PROFILE_RESET:
            return {
                ...state,
                loading: false,
                isUpdated: false,
                success:false
            }       
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }    
        default:
            return state;
    }
}

// lOGIN USER REDUCER  & LOAD USER REDUCER & LOGOUT USER REDUCER

export const loginUserReducer = (state={user:{}},action)=>{

    switch (action.type) {
        case LOGIN_USER_REQUEST:
            case LOAD_USER_REQUEST:
            return {
                loading:true,
                isAuthenticated:false,
            }
        case LOGIN_USER_SUCCESS:
            case LOAD_USER_SUCCESS:
            return {
                ...state,
                loading:false,
                isAuthenticated:true,
                user:action.payload
            }
            case LOGOUT_USER_SUCCESS:
                return {
                    loading: false,
                    user: null,
                    isAuthenticated: false,
                  };
        case LOGIN_USER_FAIL:
            return {
                ...state,
                loading:false,
                isAuthenticated:false,
                user:null,
                error:action.payload
            }
        case LOAD_USER_FAIL:
                return {
                  loading: false,
                  isAuthenticated: false,
                  user: null,
                  error: action.payload,
                };    
        case LOGOUT_USER_FAIL:
            return {      
        ...state,
        loading: false,
        error: action.payload,
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

// Get login User Details Reducer   --Admin
export const getLoginDetailsReducer = (state={user:{}},action) => {
    switch (action.type) {
        case USER_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
            } 
        case USER_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                user:action.payload.user,

            }    
        case USER_DETAILS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
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

export const forgotPasswordReducer = (state={user:{}},action) => {
    switch (action.type) {
        case FORGOT_PASSWORD_REQUEST:
            return {
                ...state,
                loading: true
            }
        case FORGOT_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
                message: action.payload.message
            }    
        case FORGOT_PASSWORD_FAIL:
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
}

export const getResetPasswordReducer = (state={user:{}},action) => {
    switch (action.type) {
        case RESET_PASSWORD_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case RESET_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
                success:action.payload.success,

            }                
        case RESET_PASSWORD_FAIL:
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
