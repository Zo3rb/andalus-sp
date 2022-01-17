import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

// Importing && Adding MY Reducers
import registerReducer from "./reducers/registerReducer";
import { userActivate, userLoginReducer } from "./reducers/userReducers";
const reducer = combineReducers({
    register: registerReducer,
    userActivate,
    userLogin: userLoginReducer
});

// Getting User Data From localStorage to Import to Redux Store
const userInfoFromLocalStorage = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null;
const initialState = {
    userLogin: { user: userInfoFromLocalStorage },
};

const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
