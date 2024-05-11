import { ALL_CARDS_FAIL, ALL_CARDS_REQUEST, ALL_CARDS_SUCCESS, ALL_FEEDBACKS_FAIL, ALL_FEEDBACKS_REQUEST, ALL_FEEDBACKS_SUCCESS, ALL_MEMBERS_FAIL , ALL_MEMBERS_REQUEST , ALL_MEMBERS_SUCCESS , CLEAR_ERRORS, CREATE_CARD_FAIL, CREATE_CARD_REQUEST, CREATE_CARD_RESET, CREATE_CARD_SUCCESS, CREATE_FEEDBACK_FAIL, CREATE_FEEDBACK_REQUEST, CREATE_FEEDBACK_RESET, CREATE_FEEDBACK_SUCCESS, CREATE_LINK_FAIL, CREATE_LINK_REQUEST, CREATE_LINK_RESET, CREATE_LINK_SUCCESS, CREATE_MEMBER_FAIL, CREATE_MEMBER_REQUEST, CREATE_MEMBER_RESET, CREATE_MEMBER_SUCCESS, DELETE_CARD_FAIL, DELETE_CARD_REQUEST, DELETE_CARD_RESET, DELETE_CARD_SUCCESS, DELETE_FEEDBACK_FAIL, DELETE_FEEDBACK_REQUEST, DELETE_FEEDBACK_RESET, DELETE_FEEDBACK_SUCCESS, DELETE_LINK_FAIL, DELETE_LINK_REQUEST, DELETE_LINK_RESET, DELETE_LINK_SUCCESS, DELETE_MEMBER_FAIL, DELETE_MEMBER_REQUEST, DELETE_MEMBER_RESET, DELETE_MEMBER_SUCCESS, GET_LINK_FAIL, GET_LINK_REQUEST, GET_LINK_SUCCESS } from "../constants/aboutUsConstants";


// Get All Team Memebers
export const getAllTeamMemebersReducers = (state={cards:[]},action) => {
    switch (action.type) {
        case ALL_MEMBERS_REQUEST:
            return {
                loading:true,
                cards:[]
            }
        case ALL_MEMBERS_SUCCESS:
            return {
                ...state,
                loading:false,
                cards:action.payload.cards,
                cardsCount:action.payload.cardsCount
            }    
        case ALL_MEMBERS_FAIL:
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

// GET ALL FEEDBACKS
export const getAllFeedbacksReducers = (state={feedbacks:[]},action) => {
    switch (action.type) {
        case ALL_FEEDBACKS_REQUEST:
            return {
                loading: true,
                feedbacks:[]
            }
        case ALL_FEEDBACKS_SUCCESS:
            return {
                ...state,
                loading: false,
                feedbacks:action.payload.feedbacks
            }  
        case ALL_FEEDBACKS_FAIL:
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




// GET ALL CARDS
export const getAllCardsReducers = (state={jobs:[]},action) => {
    switch (action.type) {
        case ALL_CARDS_REQUEST:
            return {
                loading: true,
                jobs:[]
            }
        case ALL_CARDS_SUCCESS:
            return {
                ...state,
                loading: false,
                jobs:action.payload.jobs
            }  
        case ALL_CARDS_FAIL:
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


// Create Member Card  --Admin
export const createMemberReducer = (state={card:{}}, action) => {
    switch (action.type) {
        case CREATE_MEMBER_REQUEST:
            case CREATE_LINK_REQUEST:
            return {
                ...state,
                loading: true
            }
        case CREATE_MEMBER_SUCCESS:
            case CREATE_LINK_SUCCESS:
            return {
                ...state,
                loading: false,
                success: action.payload.success
            }    
        case CREATE_MEMBER_FAIL:
            case CREATE_LINK_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }    
        case CREATE_MEMBER_RESET:
            case CREATE_LINK_RESET:
            return {
                ...state,
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


// Delete Team Member --Admin
export const deleteTeamMemberReducer = (state={card:{}}, action) => {
  switch (action.type) {
    case DELETE_MEMBER_REQUEST:
        return {
            ...state,
            loading: true,
        }
    case DELETE_MEMBER_SUCCESS:
        return {
            ...state,
            loading: false,
            success: action.payload.success,
            message: action.payload.message
        }    
    case DELETE_MEMBER_FAIL:
        return {
            ...state,
            loading: false,
            error: action.payload
        }    
    case DELETE_MEMBER_RESET:
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


// Create Client Feedback  --Admin
export const createFeedbackReducer = (state={feedback:{}}, action) => {
    switch (action.type) {
      case CREATE_FEEDBACK_REQUEST:
          return {
              ...state,
              loading: true,
          }
      case CREATE_FEEDBACK_SUCCESS:
          return {
              ...state,
              loading: false,
              success: action.payload.success,
          }    
      case CREATE_FEEDBACK_FAIL:
          return {
              ...state,
              loading: false,
              error: action.payload
          }    
      case CREATE_FEEDBACK_RESET:
          return {
              ...state,
              success: false,
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

  // Delete Feedback  ---Admin
  export const deleteFeedbackReducer = (state={feedback:{}}, action) => {
    switch (action.type) {
      case DELETE_FEEDBACK_REQUEST:
          return {
              ...state,
              loading: true,
          }
      case DELETE_FEEDBACK_SUCCESS:
          return {
              ...state,
              loading: false,
              success: action.payload.success,
              message: action.payload.message
          }    
      case DELETE_FEEDBACK_FAIL:
          return {
              ...state,
              loading: false,
              error: action.payload
          }    
      case DELETE_FEEDBACK_RESET:
          return {
              ...state,
              success: false,
              message: false,
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


  // Create Card --Admin
  export const createCardReducer = (state={job:{}}, action) => {
    switch (action.type) {
        case CREATE_CARD_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case CREATE_CARD_SUCCESS:
            return {
                ...state,
                loading: false,
                success:action.payload.success
            }    
        case CREATE_CARD_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }    
    
        case CREATE_CARD_RESET:
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
  }

  // Delete Card Reducer  --Admin
  export const deleteCardReducer = (state={card:{}},action) => {
    switch (action.type) {
        case DELETE_CARD_REQUEST:
            case DELETE_LINK_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case DELETE_CARD_SUCCESS:
            case DELETE_LINK_SUCCESS:
            return {
                ...state,
                loading: false,
                success: action.payload.success,
                message: action.payload.message
            }    
        case DELETE_CARD_FAIL:
            case DELETE_LINK_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case DELETE_CARD_RESET:
            case DELETE_LINK_RESET:
            return {
                ...state,
                success:false,
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



  /// Get Video  Link   
  export const getVideoLinkReducer = (state={video:[]},action) => {
    switch (action.type) {
        case GET_LINK_REQUEST:
            return {
                ...state,
                loading: true
            }
        case GET_LINK_SUCCESS:
            return {
                ...state,
                loading: false,
                video: action.payload.video
            }    
        case GET_LINK_FAIL:
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

