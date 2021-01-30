import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  // LOGOUT,
  SHOW_LOADING_LOGIN,
  HIDE_LOADING_LOGIN,
  CLEAR_ERROR,
  CLEAR_ERROR_FAILED,
  SHOW_ERROR,
  SHOW_ERROR_FAILED,
} from "../types";
import axios from "axios";
require("dotenv").config();

const baseURL = process.env.REACT_APP_BASEURL_SERVER;

export const doLogin = (data) => async (dispatch) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
  };

  dispatch({
    type: SHOW_LOADING_LOGIN,
    payload: true,
  });

  axios({
    method: "post",
    url: `${baseURL}/v1/login_user`,
    data: {
      Login: { email: data.email, password: data.password },
    },
    headers: headers,
  }).then((response) => {
    dispatch({
      type: HIDE_LOADING_LOGIN,
      payload: false,
    });

    let role_id = response.data.API_LuarizPos.Response.role_id;
    let token = response.data.API_LuarizPos.Response.token;
    let sessionData = { role_id, token };
    let messageShortText = response.data.API_LuarizPos.Message.ShortText;
    let messageCode = response.data.API_LuarizPos.Message.Code;

    if (messageCode === 200) {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: messageShortText,
      });
      // Create session storage and save session data
      sessionStorage.setItem("session", JSON.stringify(sessionData));
      // Redirect to dashboard
      window.location.replace(window.location.href);
    } else {
      dispatch({
        type: LOGIN_FAIL,
        payload: messageShortText,
      });
    }
  });
};

export const showLoading = () => async (dispatch) => {
  try {
    dispatch({
      type: SHOW_LOADING_LOGIN,
      payload: true,
    });
  } catch (e) {
    console.log(e);
  }
};

export const hideLoading = () => async (dispatch) => {
  try {
    dispatch({
      type: HIDE_LOADING_LOGIN,
      payload: false,
    });
  } catch (e) {
    console.log(e);
  }
};

export const clearError = () => async (dispatch) => {
  try {
    dispatch({
      type: CLEAR_ERROR,
      payload: "",
    });
  } catch (e) {
    dispatch({
      type: CLEAR_ERROR_FAILED,
      payload: console.log(e),
    });
  }
};

export const showError = (string) => async (dispatch) => {
  try {
    dispatch({
      type: SHOW_ERROR,
      payload: string,
    });
  } catch (e) {
    dispatch({
      type: SHOW_ERROR_FAILED,
      payload: console.log(e),
    });
  }
};
