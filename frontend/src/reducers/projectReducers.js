import { ALL_PROJECTS_REQUEST , ALL_PROJECTS_FAIL , ALL_PROJECTS_SUCCESS , CLEAR_ERRORS, PROJECT_DETAILS_REQUEST, PROJECT_DETAILS_SUCCESS, PROJECT_DETAILS_FAIL, DELETE_PROJECT_REQUEST, DELETE_PROJECT_SUCCESS, DELETE_PROJECT_FAIL, DELETE_PROJECT_RESET, CREATE_PROJECT_REQUEST, CREATE_PROJECT_SUCCESS, CREATE_PROJECT_FAIL, CREATE_PROJECT_RESET, ADMIN_PROJECTS_REQUEST, ADMIN_PROJECTS_SUCCESS, ADMIN_PROJECTS_FAIL } from "../constants/projectConstants";



// Get All Projects 
export const getAllprojectsReducer = (state={projects:[]},action) =>{
    switch (action.type) {
        case ALL_PROJECTS_REQUEST:
            return {
                loading: true,
                projects:[]
            }
        case ALL_PROJECTS_SUCCESS:
            return {
                ...state,
                loading: false,
                projects:action.payload.projects,
                projectsCount:action.payload.projectsCount,
                resultPerPage:action.payload.resultPerPage,
            }    
        case ALL_PROJECTS_FAIL:
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


// GET SINGLE PROJECT DETAILS 
export const projectDetailsReducer = (state={project:{}},action) => {
    switch (action.type) {
        case PROJECT_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case PROJECT_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                project: action.payload.project
            }   
        case PROJECT_DETAILS_FAIL:
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

// Delete Project Reducer  --Admin
export const deleteProjectReducer = (state={project:{}},action) => {
    switch (action.type) {
        case DELETE_PROJECT_REQUEST:
            case CREATE_PROJECT_REQUEST:
            return {
                ...state,
                loading:true
            }
        case DELETE_PROJECT_SUCCESS:
            return {
                ...state,
                loading:false,
                success:action.payload.success,
                message:action.payload.message
            }
        case CREATE_PROJECT_SUCCESS:
            return {
                ...state,
                loading:false,
                success:action.payload.success
            }        
        case DELETE_PROJECT_FAIL:
            case CREATE_PROJECT_FAIL:
            return {
                ...state,
                loading:false,
                error:action.payload
            }    
        case DELETE_PROJECT_RESET:
            return {
                ...state,
                success:false,
                message:false
            }    
          case CREATE_PROJECT_RESET:
            return {
                ...state,
                success:false,
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


//  Get All Projects -- Admins
export const getAllAdminProjectsReducer = (state={projects:[]},action) => {
    switch (action.type) {
        case ADMIN_PROJECTS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case ADMIN_PROJECTS_SUCCESS:
            return {
                ...state,
                loading:false,
                projects:action.payload.projects
            }
        case ADMIN_PROJECTS_FAIL:
            return {
                ...state,
                loading:false,
                errors:action.payload
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