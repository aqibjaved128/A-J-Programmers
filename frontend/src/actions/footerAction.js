import { FOOTER_DETAILS_FAIL , FOOTER_DETAILS_SUCCESS , FOOTER_DETAILS_REQUEST , CLEAR_ERRORS, UPDATE_FOOTER_REQUEST, UPDATE_FOOTER_SUCCESS, UPDATE_FOOTER_FAIL} from "../constants/footerConstants";
import axios from 'axios';


  

// Get Footer Details 
export const footerDetailsAction = () => async (dispatch) => {
    try {
        dispatch({type:FOOTER_DETAILS_REQUEST});

        
      

        const {data} = await axios.get(`/api/v1/footer`);

        dispatch({
            type:FOOTER_DETAILS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type:FOOTER_DETAILS_FAIL,
            payload:error.response.data.message
        })
    }
};


// Update Footer Details  ---Admin
export const updateFooterDetailsAction = (id,newFooterData) => async (dispatch) => {
    try {
        dispatch({type:UPDATE_FOOTER_REQUEST});

        const config = {headers:{'Content-Type': "application/json"}}

    

        const {data} = await axios.put(`/api/v1/admin/footer/${id}`,newFooterData,config)


        dispatch({
            type:UPDATE_FOOTER_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type:UPDATE_FOOTER_FAIL,
            payload:error.response.data.message
        })
    }
};





// Clear Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({type:CLEAR_ERRORS})
}