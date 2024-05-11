import { ALL_CARDS_FAIL, ALL_CARDS_REQUEST, ALL_CARDS_SUCCESS, ALL_FEEDBACKS_FAIL, ALL_FEEDBACKS_REQUEST, ALL_FEEDBACKS_SUCCESS, ALL_MEMBERS_FAIL , ALL_MEMBERS_REQUEST , ALL_MEMBERS_SUCCESS , CLEAR_ERRORS, CREATE_CARD_FAIL, CREATE_CARD_REQUEST, CREATE_CARD_SUCCESS, CREATE_FEEDBACK_FAIL, CREATE_FEEDBACK_REQUEST, CREATE_FEEDBACK_SUCCESS, CREATE_LINK_FAIL, CREATE_LINK_REQUEST, CREATE_LINK_SUCCESS, CREATE_MEMBER_FAIL, CREATE_MEMBER_REQUEST, CREATE_MEMBER_SUCCESS, DELETE_CARD_FAIL, DELETE_CARD_REQUEST, DELETE_CARD_SUCCESS, DELETE_FEEDBACK_FAIL, DELETE_FEEDBACK_REQUEST, DELETE_FEEDBACK_SUCCESS, DELETE_LINK_FAIL, DELETE_LINK_REQUEST, DELETE_LINK_SUCCESS, DELETE_MEMBER_FAIL, DELETE_MEMBER_REQUEST, DELETE_MEMBER_SUCCESS, GET_LINK_FAIL, GET_LINK_REQUEST, GET_LINK_SUCCESS } from "../constants/aboutUsConstants";
import axios from 'axios';




  


// Get All Team Members Action
export const allTeamMembersAction = () => async (dispatch) => {
    try {
        dispatch({type:ALL_MEMBERS_REQUEST});

        const {data} = await axios.get(`/api/v1/member/cards`);


        dispatch({
            type:ALL_MEMBERS_SUCCESS,
            payload: data
        }) 
        
    } catch (error) {
        dispatch({
            type:ALL_MEMBERS_FAIL,
            payload:error.response.data.message
        })
    }
};

// GET ALL FEEDBACKS 
export const allfeedbacksAction = () => async (dispatch) => {
    try {
        dispatch({type:ALL_FEEDBACKS_REQUEST});

   
        const {data} = await axios.get(`/api/v1/feedbacks`);

        dispatch({
            type:ALL_FEEDBACKS_SUCCESS,
            payload:data
        })
    } catch (error) {
        dispatch({
            type:ALL_FEEDBACKS_FAIL,
            payload:error.response.data.message
        })
    }
};

// GET ALL CARDS 
export const allCardsAction = () => async (dispatch) => {
    try {
        dispatch({type:ALL_CARDS_REQUEST});

     


        const {data} = await axios.get(`/api/v1/jobs`);

        dispatch({
            type:ALL_CARDS_SUCCESS,
            payload:data
        })
    } catch (error) {
        dispatch({
            type:ALL_CARDS_FAIL,
            payload:error.response.data.message
        })
    }
};


// Create Member Card  --Admin
export const createMenmberCardAction = (newMemberData) => async (dispatch) => {
    try {
        dispatch({type:CREATE_MEMBER_REQUEST});

    

        const config = {headers:{"Content-Type":"multipart/form-data"}};

        const {data} = await axios.post(`/api/v1/admin/card/create`,newMemberData,config);

        dispatch({
            type:CREATE_MEMBER_SUCCESS,
            payload:data
        })
        
    } catch (error) {
        dispatch({
            type:CREATE_MEMBER_FAIL,
            payload:error.response.data.message
        })
    }
}


// Delete Team Member Card  ---Admin
export const deleteTeamMemberCardAction = (id) => async (dispatch) => {
    try {
        dispatch({type:DELETE_MEMBER_REQUEST});

        const config = {headers: {"Content-Type": "application/json"}};

  
        const {data} = await axios.delete(`/api/v1/admin/member/card/${id}`,config)

        dispatch({
            type:DELETE_MEMBER_SUCCESS,
            payload:data
        });


    } catch (error) {
        dispatch({
            type:DELETE_MEMBER_FAIL,
            payload:error.response.data.message
        })
    }
};

// Create Client Feedback --Admin
export const createFeedbackAction = (feedbackData) => async (dispatch) => {
    try {
        dispatch({type:CREATE_FEEDBACK_REQUEST});

        const config = {headers: {"Content-Type": "multipart/form-data"}};

     

        const {data} = await axios.post(`/api/v1/admin/feedback/create`,feedbackData,config);


        dispatch({
            type:CREATE_FEEDBACK_SUCCESS,
            payload:data
        });


    } catch (error) {
        dispatch({
            type:CREATE_FEEDBACK_FAIL,
            payload:error.response.data.message
        })
    }
};



// Delete Feedback  ----Admin 
export const deleteFeedbackAction = (id) => async (dispatch) => {
    try {
        dispatch({type:DELETE_FEEDBACK_REQUEST});

        const config = {headers: {"Content-Type": "application/json"}};



        const {data} = await axios.delete(`/api/v1/admin/feedback/${id}`,config)

        dispatch({
            type:DELETE_FEEDBACK_SUCCESS,
            payload:data
        });


    } catch (error) {
        dispatch({
            type:DELETE_FEEDBACK_FAIL,
            payload:error.response.data.message
        })
    }
};


// Create Card  --Admin
export const createCardAction = (newData) => async (dispatch) => {
    try {
        dispatch({type:CREATE_CARD_REQUEST});

        const config = {headers: {"Content-Type": "multipart/form-data"}};


        const {data} = await axios.post(`/api/v1/admin/job/create`,newData,config)
        
        dispatch({
            type:CREATE_CARD_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type:CREATE_CARD_FAIL,
            payload:error.response.data.message
        })
    }
}

// Delete Card  ---Admin
export const deleteCardAction = (id) => async (dispatch) => {
    try {
        dispatch({type:DELETE_CARD_REQUEST});

        const config = {headers: {"Content-Type": "application/json"}};


        const {data} = await axios.delete(`/api/v1/admin/job/${id}`,config)

        dispatch({
            type:DELETE_CARD_SUCCESS,
            payload:data
        });


    } catch (error) {
        dispatch({
            type:DELETE_CARD_FAIL,
            payload:error.response.data.message
        })
    }
};


/// Create Video Link  ---Admin
export const createVideoLinkAction = (newData) => async (dispatch) => {
    try {
        dispatch({type:CREATE_LINK_REQUEST})

        const config = {headers: {"Content-Type":"application/json"}}

 
        const {data} = await axios.post('/api/v1/admin/video/create',newData,config);

        dispatch({
            type:CREATE_LINK_SUCCESS,
            payload: data
        })
        
    } catch (error) {
        dispatch({
            type:CREATE_LINK_FAIL,
            payload:error.response.data.message
        })
    }
};


// Get Video Link   
export const getVideoLinkAction = () => async (dispatch) => {
    try {
        dispatch({type:GET_LINK_REQUEST});


        const {data} = await axios.get(`/api/v1/video`);

        dispatch({
            type:GET_LINK_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type:GET_LINK_FAIL,
            payload:error.response.data.message
        })
    }
};

// Delete link  --Admin
export const deleteLinkAction = (id) => async (dispatch) => {
    try {
        dispatch({type:DELETE_LINK_REQUEST});

        
  
        const {data} = await axios.delete(`/api/v1/admin/video/${id}`);

        dispatch({
            type:DELETE_LINK_SUCCESS,
            payload:data
        })
    } catch (error) {
        dispatch({
            type:DELETE_LINK_FAIL,
            payload: error.response.data.message
        })
    }
}



// Clear Errors 
export const clearErrors = () => async (dispatch) => {
    dispatch({type:CLEAR_ERRORS})
}