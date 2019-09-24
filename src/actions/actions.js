export const AUTH_SUCCESS = "AUTH_SUCCESS";
export const AUTH_FAIL = "AUTH_FAIL";
export const AUTH_VALIDATION = "AUTH_VALIDATION";
export const LOGOUT = "LOGOUT";
export const REGISTER = "REGISTER";
export const UPDATE_MESSAGE = "UPDATE_MESSAGE";
export const UPDATE_MESSAGES = "UPDATE_MESSAGES";
export const LOADING = "LOADING";
export const STOP_LOADING = "STOP_LOADING";

export const login = (email, password, history) => ({
  type: AUTH_VALIDATION,
  payload: { email, password, history }
});

export const register = (name, email, password, history) => ({
  type: REGISTER,
  payload: { name, email, password, history }
});

export const addMsg = (name, email, message, subject) => ({
  type: UPDATE_MESSAGE,
  data: { name, email, message, subject }
});
export const logout = () => ({ type: LOGOUT });
