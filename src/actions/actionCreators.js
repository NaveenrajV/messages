import {
  AUTH_VALIDATION,
  REGISTER,
  UPDATE_MESSAGE,
  LOGOUT,
  LOGOUT_INIT,
  LOADING
} from "./actions";

export const login = (email, password) => ({
  type: AUTH_VALIDATION,
  payload: { email, password }
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
export const logout_init = () => ({ type: LOGOUT_INIT });
export const loading = () => ({ type: LOADING });
