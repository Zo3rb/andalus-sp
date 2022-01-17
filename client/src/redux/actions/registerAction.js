import axios from 'axios';
import toast from 'react-hot-toast';

import {
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_ERROR
} from '../constants/registerConstants';

const API_URL = "http://localhost:5000";

export const registerNewUser = (formData, callBack) => async dispatch => {
    try {
        dispatch({ type: REGISTER_USER_REQUEST });
        toast.loading("Please Wait ...", { duration: 3000 });
        const response = await axios.post(`${API_URL}/auth/reg`, formData);
        dispatch({
            type: REGISTER_USER_SUCCESS,
            payload: response.data
        });
        toast.success(response.data, { duration: 5000 });
        // For Program Navigation
        callBack();
    } catch (error) {
        dispatch({
            type: REGISTER_USER_ERROR,
            payload:
                error.response && error.response.data.message
                    ? toast.error(error.response.data.message, { duration: 3000 })
                    : toast.error(error.message, { duration: 3000 })
        });
    }
};
