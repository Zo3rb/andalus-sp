import {
    USER_ACTIVATE_REQUEST,
    USER_ACTIVATE_SUCCESS,
    USER_ACTIVATE_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT
} from '../constants/userConstants';

export const userActivate = (state = { user: null }, action) => {
    switch (action.type) {
        case USER_ACTIVATE_REQUEST:
            return { loading: true };
        case USER_ACTIVATE_SUCCESS:
            return { loading: false, user: action.payload };
        case USER_ACTIVATE_FAIL:
            return { loading: false, error: action.error, user: null };
        default:
            return state;
    }
};

export const userLoginReducer = (state = { user: null }, action) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return { loading: true };
        case USER_LOGIN_SUCCESS:
            return { loading: false, user: { ...action.payload, accessToken: action.token } };
        case USER_LOGIN_FAIL:
            return { loading: false, error: action.error, user: null };
        case USER_LOGOUT:
            return { user: null };
        default:
            return state;
    }
};
