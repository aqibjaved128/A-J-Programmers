import { ALL_PROJECTS_REQUEST , ALL_PROJECTS_FAIL , ALL_PROJECTS_SUCCESS , CLEAR_ERRORS, PROJECT_DETAILS_FAIL, PROJECT_DETAILS_REQUEST, PROJECT_DETAILS_SUCCESS, DELETE_PROJECT_FAIL, DELETE_PROJECT_REQUEST, DELETE_PROJECT_SUCCESS, CREATE_PROJECT_REQUEST, CREATE_PROJECT_FAIL, CREATE_PROJECT_SUCCESS, ADMIN_PROJECTS_REQUEST, ADMIN_PROJECTS_FAIL, ADMIN_PROJECTS_SUCCESS } from "../constants/projectConstants";
import axios from 'axios';


// All Projects Action
export const allProjectsAction = (currentPage=1, category = "" ) => async (dispatch) => {
    try {
        dispatch({type:ALL_PROJECTS_REQUEST});


        let link = `/api/v1/projects?page=${currentPage}`


        if (category) {
            link = `/api/v1/projects?page=${currentPage}&category=${category}`
        }


        const {data} = await axios.get(link);

        dispatch({
            type:ALL_PROJECTS_SUCCESS,
            payload:data
        })
    } catch (error) {
        dispatch({
            type:ALL_PROJECTS_FAIL,
            payload:error.response.data.message
        })
    }
};


// Get  Project Details 
export const getProjectDetailsActions = (id) => async (dispatch) => {
    try {
        dispatch({type:PROJECT_DETAILS_REQUEST});

  

        const {data} = await axios.get(`/api/v1/project/${id}`);

        dispatch({
            type:PROJECT_DETAILS_SUCCESS,
            payload: data
        })
        
    } catch (error) {
        dispatch({
            type:PROJECT_DETAILS_FAIL,
            payload:error.response.data.message
        })
    }
};


// Delete Project  ---Admin
export const deleteProjectAction = (id) => async (dispatch) => {
    try {
        dispatch({type:DELETE_PROJECT_REQUEST});

 
        const config = {headers: {'Content-Type': 'application/json'}};

        const {data} = await axios.delete(`/api/v1/admin/project/${id}`,config);

        dispatch({
            type:DELETE_PROJECT_SUCCESS,
            payload:data
        })
        
    } catch (error) {
        dispatch({
            type:DELETE_PROJECT_FAIL,
            payload:error.response.data.message
        })
    }
};


// Create Project --Admin
export const createProjectAction = (newUserData) => async (dispatch) => {
   try {
    dispatch({type:CREATE_PROJECT_REQUEST});



    const config = {headers: {"Content-Type":"multipart/form-data"}};

    const {data} = await axios.post(`/api/v1/admin/project/create`,newUserData,config);
    
    dispatch({
        type:CREATE_PROJECT_SUCCESS,
        payload: data
    })
   } catch (error) {
    dispatch({
        type:CREATE_PROJECT_FAIL,
        payload:error.response.data.message
    })
   }
};


// Get All Projects  ---Admin
export const getAdminProjectsAction = () => async (dispatch) => {
    try {
        dispatch({type:ADMIN_PROJECTS_REQUEST})

   
        const {data} = await axios.get(`/api/v1/admin/projects`)

        dispatch({
            type:ADMIN_PROJECTS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type:ADMIN_PROJECTS_FAIL,
            payload: error.response.data.message
        })
    }
}

// Clear Errors 
export const clearErrors = () => async (dispatch) => {
    dispatch({type:CLEAR_ERRORS})
};