import {
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_ERROR
} from '../constants/registerConstants';

const registerReducer = (state = { message: "" }, action) => {
    switch (action.type) {
        case REGISTER_USER_REQUEST:
            return { ...state, loading: true };
        case REGISTER_USER_SUCCESS:
            return { loading: false, message: action.payload };
        case REGISTER_USER_ERROR:
            return { loading: false, error: action.error };
        default:
            return state;
    }
};

export default registerReducer;
