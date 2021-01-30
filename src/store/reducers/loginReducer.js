import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  SHOW_LOADING_LOGIN,
  HIDE_LOADING_LOGIN,
  CLEAR_ERROR,
  SHOW_ERROR,
} from "../types";

const initialState = {
  error: "",
  message: "",
  loadingLoginData: false,
  disabledButton: false,
};

export default function loginReducer(state = initialState, action) {
  switch (action.type) {
    case SHOW_LOADING_LOGIN:
      return {
        ...state,
        loadingLoginData: action.payload,
      };
    case HIDE_LOADING_LOGIN:
      return {
        ...state,
        loadingLoginData: action.payload,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case SHOW_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        message: action.payload,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
}
