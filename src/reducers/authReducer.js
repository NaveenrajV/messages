import {
  AUTH_SUCCESS,
  AUTH_FAIL,
  UPDATE_MESSAGES,
  LOADING,
  LOGOUT
} from "../actions/actions";

const INITIAL_STATE = {
  loading: false,
  isLogged: false,
  data: {
    name: "",
    id: ""
  },
  loginStatus: ""
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AUTH_SUCCESS:
      return {
        loading: false,
        isLogged: true,
        data: action.data,
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
    case LOGOUT:
      return {
        isLogged: false
      };
    default:
      return state;
  }
};

export default authReducer;
