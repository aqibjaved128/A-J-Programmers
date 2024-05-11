import { LOGIN_USER_FAIL , LOGIN_USER_REQUEST , LOGIN_USER_SUCCESS , CLEAR_ERRORS, USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_DETAILS_FAIL, LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOAD_USER_FAIL, UPDATE_PASSWORD_FAIL, UPDATE_PASSWORD_SUCCESS, UPDATE_PASSWORD_REQUEST, LOGOUT_USER_FAIL, LOGOUT_USER_SUCCESS, UPDATE_PROFILE_FAIL, UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_SUCCESS, FORGOT_PASSWORD_FAIL, FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS, RESET_PASSWORD_FAIL, RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS } from "../constants/userConstants";
import axios from 'axios';
 


  
// Login User Action
export const loginUserAction = (email,password) => async (dispatch) => {
    try {
        dispatch({type:LOGIN_USER_REQUEST});

    

        const config = {headers: {'Content-Type': 'application/json'}};

        const {data} = await axios.post(`/api/v1/admin/login`,{email,password},config);

        dispatch({
            type:LOGIN_USER_SUCCESS,
            payload: data.user
        })
    } catch (error) {
        dispatch({
            type:LOGIN_USER_FAIL,
            payload:error.response.data.message
        })
    }
};

//  User Details Action
export const userDetailsAction = () => async (dispatch) => {
    try {
        dispatch({type:USER_DETAILS_REQUEST});

  
        const {data} = await axios.get(`/api/v1/admin/me`);

        dispatch({
            type:USER_DETAILS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type:USER_DETAILS_FAIL,
            payload:error.response.data.message
        })
    }
};

//  Load User  Action
export const loadUserAction = () => async (dispatch) => {
    try {
        dispatch({type:LOAD_USER_REQUEST});

   
        const {data} = await axios.get(`/api/v1/admin/me`);

        dispatch({
            type:LOAD_USER_SUCCESS,
            payload: data.user
        })
    } catch (error) {
        dispatch({
            type:LOAD_USER_FAIL,
            payload:error.response.data.message
        })
    }
};


// Update User Password  --Admin
export const updateUserPasswordAction = (oldPassword,newPassword,confirmPassword) => async (dispatch) => {
    try {
        dispatch({type:UPDATE_PASSWORD_REQUEST});


        const config = {headers: {'Content-Type': 'application/json'}};

        const {data} = await  axios.put(`/api/v1/admin/password/update`,{oldPassword,newPassword,confirmPassword},config);
        
        dispatch({
            type:UPDATE_PASSWORD_SUCCESS,
            payload: data
        })
        
    } catch (error) {
        dispatch({
            type:UPDATE_PASSWORD_FAIL,
            payload:error.response.data.message,
        })
    }
};

// Logout User Action  --Admin
export const logoutUserAction = () => async (dispatch) =>  {
    try {



         await axios.get(`/api/v1/admin/logout`);

        dispatch({
            type:LOGOUT_USER_SUCCESS,
        })
        
    } catch (error) {
        dispatch({
            type:LOGOUT_USER_FAIL,
            payload:error.response.data.message
        })
    }
};

// Update Profile Action  --Admin
export const updateProfileAction = (newUserData) => async (dispatch) => {
    try {
        dispatch({type:UPDATE_PROFILE_REQUEST});

        const config = {headers: {'Content-Type': 'multipart/form-data'}};

        const {data} = await axios.put(`/api/v1/admin/profile/update`,newUserData,config);

        dispatch({
            type:UPDATE_PROFILE_SUCCESS,
            payload: data
        })
        
    } catch (error) {
        dispatch({
            type:UPDATE_PROFILE_FAIL,
            payload:error.response.data.message
        })
    }
};


// Forgot Password   --Admin
export const forgotPasswordAction = (email) => async (dispatch) => {
    try {
        dispatch({type:FORGOT_PASSWORD_REQUEST});

  
        const config = {headers: {'Content-Type': 'application/json'}};

        const {data} = await axios.post(`/api/v1/admin/password/forgot`,email,config);

        dispatch({
            type:FORGOT_PASSWORD_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type:FORGOT_PASSWORD_FAIL,
            payload: error.response.data.message
        })
    }
};

// Reset Password  --Admin
export const resetPasswordAction = (token,passwords) => async (dispatch) => {
    try {
        dispatch({type:RESET_PASSWORD_REQUEST});

        const config = { headers: {"Content-Type": "application/json" } };

        const {data} = await axios.put(`/api/v1/admin/password/reset/${token}`,passwords,config);

        dispatch({
            type:RESET_PASSWORD_SUCCESS,
            payload:data
        })
        
    } catch (error) {
        dispatch({
            type:RESET_PASSWORD_FAIL,
            payload:error.response.data.message
        })
    }
}


// Clear Erros
export const clearErrors = () => async (dispatch) => {
    dispatch({type:CLEAR_ERRORS})
}