import {
  AUTH_SUCCESS,
  AUTH_FAIL,
  UPDATE_MESSAGES,
  LOADING,
  LOGOUT,
  STOP_LOADING
} from "../actions/actions";

const INITIAL_STATE = {
  loading: false,
  isLogged: JSON.parse(localStorage.getItem("isLogged")) || false,
  name: localStorage.getItem("name") || "",
  email: localStorage.getItem("email") || "",
  data: JSON.parse(localStorage.getItem("data")) || {},
  loginStatus: ""
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AUTH_SUCCESS:
      return {
        loading: false,
        isLogged: true,
        data: action.data,
        name: action.name,
        email: action.email,
        loginStatus: "success"
      };
    case AUTH_FAIL:
      console.log("Auth_FAIL");
      return {
        isLogged: false,
        data: {},
        loginStatus: "error"
      };
    case UPDATE_MESSAGES:
      return {
        ...state,
        data: action.data,
        loginStatus: "success"
      };

    case LOADING:
      return {
        loading: true
      };
    case STOP_LOADING:
      return {
        loading: false
      };
    case LOGOUT:
      return {
        isLogged: false
      };
    default:
      return state;
  }
};

export default authReducer;
