import axios from 'axios';
import toast from 'react-hot-toast';

import {
    USER_ACTIVATE_REQUEST,
    USER_ACTIVATE_SUCCESS,
    USER_ACTIVATE_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT
} from '../constants/userConstants';

const API_URL = "http://localhost:5000";

export const activateUser = (token, callback) => async dispatch => {
    try {
        dispatch({ type: USER_ACTIVATE_REQUEST });
        toast.loading("Please Wait ...", { duration: 3000 });
        const response = await axios.post(`${API_URL}/auth/account-activation`, { token });
        dispatch({
            type: USER_ACTIVATE_SUCCESS,
            payload: response.data.data
        });
        localStorage.setItem("userInfo", JSON.stringify(response.data.data));
        toast.success(response.data.message);
        // For Program Navigation
        callback();
    } catch (error) {
        dispatch({
            type: USER_ACTIVATE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? toast.error(error.response.data.message, { duration: 3000 })
                    : toast.error(error.message, { duration: 3000 })
        });
    }
};

export const loginUser = (userData) => async dispatch => {
    try {
        dispatch({ type: USER_LOGIN_REQUEST });
        toast.loading("Please Wait ...", { duration: 3000 });
        const response = await axios.post(`${API_URL}/auth/login`, userData);
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: response.data.data,
            token: response.data.token
        });
        localStorage.setItem("userInfo", JSON.stringify({ ...response.data.data, accessToken: response.data.token }));
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload:
                error.response && error.response.data.message
                    ? toast.error(error.response.data.message, { duration: 3000 })
                    : toast.error(error.message, { duration: 3000 })
        });
    }
};

export const logOutUser = callback => dispatch => {
    try {
        localStorage.removeItem("userInfo");
        dispatch({ type: USER_LOGOUT });
        toast.success("Successfully Logged Out", { duration: 3000 });
        callback();
    } catch (error) {
        error.response && error.response.data.message
            ? toast.error(error.response.data.message, { duration: 3000 })
            : toast.error(error.message, { duration: 3000 })
    }
};

export const forgotPassword = async email => {
    try {
        const response = await axios.post(`${API_URL}/auth/forgot-password`, { email });
        toast.success(response.data)
    } catch (error) {
        error.response && error.response.data.message
            ? toast.error(error.response.data.message, { duration: 3000 })
            : toast.error(error.message, { duration: 3000 })
    }
};

export const changePasswordHandler = async (data, callback) => {
    try {
        const response = await axios.post(`${API_URL}/auth/renew-password`, data);
        toast.success(response.data);
        callback();
    } catch (error) {
        error.response && error.response.data.message
            ? toast.error(error.response.data.message, { duration: 3000 })
            : toast.error(error.message, { duration: 3000 })
    }
};

export const loginUserWithGoogle = (userData) => async dispatch => {
    try {
        dispatch({ type: USER_LOGIN_REQUEST });
        toast.loading("Please Wait ...", { duration: 3000 });
        const response = await axios.post(`${API_URL}/auth/google-login`, userData);
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: response.data.data,
            token: response.data.token
        });
        localStorage.setItem("userInfo", JSON.stringify({ ...response.data.data, accessToken: response.data.token }));
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload:
                error.response && error.response.data.message
                    ? toast.error(error.response.data.message, { duration: 3000 })
                    : toast.error(error.message, { duration: 3000 })
        });
    }
};

export const loginUserWithFacebook = (userData) => async dispatch => {
    try {
        dispatch({ type: USER_LOGIN_REQUEST });
        toast.loading("Please Wait ...", { duration: 3000 });
        const response = await axios.post(`${API_URL}/auth/facebook-login`, userData);
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: response.data.data,
            token: response.data.token
        });
        localStorage.setItem("userInfo", JSON.stringify({ ...response.data.data, accessToken: response.data.token }));
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload:
                error.response && error.response.data.message
                    ? toast.error(error.response.data.message, { duration: 3000 })
                    : toast.error(error.message, { duration: 3000 })
        });
    }
};
