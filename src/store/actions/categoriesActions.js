import {
  GET_CATEGORIES,
  CATEGORIES_ERROR,
  ADD_CATEGORIES,
  ADD_CATEGORIES_ERROR,
  SHOW_LOADING_CATEGORIES,
  SHOW_LOADING_ERROR,
  HIDE_LOADING_ERROR,
  SHOW_ERROR_FAILED,
  CLEAR_ERROR_FAILED,
  DELETE_CATEGORIES,
  DELETE_CATEGORIES_ERROR,
  UPDATE_CATEGORIES,
  UPDATE_CATEGORIES_ERROR,
  CLEAR_ERROR_CATEGORIES,
  HIDE_LOADING_CATEGORIES,
} from "../types";
import axios from "axios";
import { headers } from "../../helper/authHelper";
require("dotenv").config();

const baseURL = process.env.REACT_APP_BASEURL_SERVER;

export const getCategories = () => async (dispatch) => {
  // console.log("headers", headers);
  try {
    await dispatch({
      type: SHOW_LOADING_CATEGORIES,
      payload: true,
    });

    // Send a POST request
    let res = await axios({
      method: "post",
      url: `${baseURL}/v1/get_category`,
      data: {
        Category: {
          show_all: 1,
          id_category: 0,
        },
      },
      headers: headers,
    });

    // .then((json) => console.log(json.data.API_LuarizPos.Response));

    let data = await res.data.API_LuarizPos.Response;

    // console.log(data);

    await dispatch({
      type: GET_CATEGORIES,
      payload: data,
    });
  } catch (e) {
    dispatch({
      type: CATEGORIES_ERROR,
      payload: console.log(e),
    });
  }
};

export const addCategories = (data) => async (dispatch) => {
  try {
    await dispatch({
      type: SHOW_LOADING_CATEGORIES,
      payload: true,
    });

    const addedData = {
      name: data.name,
      total_product: 0,
    };

    // Send a POST request
    await axios({
      method: "post",
      url: `${baseURL}/v1/insert_category`,
      data: {
        Category: [
          {
            name: data.name,
            total_product: 0,
          },
        ],
      },
      headers: headers,
      timeout: 15000,
    }).then(function (response) {
      // set id_category from response
      addedData.id_category =
        response.data.API_LuarizPos.Response[0].id_category;
      dispatch({
        type: ADD_CATEGORIES,
        payload: addedData,
      });
    });
  } catch (e) {
    dispatch({
      type: ADD_CATEGORIES_ERROR,
      payload:
        "Terjadi kesalahan koneksi saat menambah produk. Cobalah beberapa saat lagi.",
    });
  }
};

export const editCategories = (data) => async (dispatch) => {
  try {
    // Send a POST request
    await axios({
      method: "post",
      url: `${baseURL}/v1/update_category`,
      data: {
        Category: [
          {
            id_category: data.id_category,
            name: data.name,
          },
        ],
      },
      headers: headers,
      timeout: 15000,
    }).then(() => {
      dispatch({
        type: UPDATE_CATEGORIES,
        payload: data,
      });
    });
  } catch (e) {
    dispatch({
      type: UPDATE_CATEGORIES_ERROR,
      payload:
        "Terjadi kesalahan koneksi saat mengubah kategori. Cobalah beberapa saat lagi.",
    });
  }
};

export const deleteCategories = (id) => async (dispatch) => {
  try {
    // Send a POST request
    await axios({
      method: "post",
      url: `${baseURL}/v1/delete_category`,
      data: {
        Category: [
          {
            delete_all: 0,
            id_category: id,
          },
        ],
      },
      headers: headers,
      timeout: 15000,
    }).then((response) => {
      let messageShortText = response.data.API_LuarizPos.Message.ShortText;
      let messageCode = response.data.API_LuarizPos.Message.Code;

      if (messageCode === 200) {
        dispatch({
          type: DELETE_CATEGORIES,
          payload: id,
        });
      } else {
        dispatch({
          type: DELETE_CATEGORIES_ERROR,
          payload: "Error : " + messageShortText,
        });
      }
    });
  } catch (e) {
    dispatch({
      type: DELETE_CATEGORIES_ERROR,
      payload:
        "Terjadi kesalahan koneksi saat menghapus kategori. Cobalah beberapa saat lagi.",
    });
  }
};

export const clearError = () => async (dispatch) => {
  try {
    dispatch({
      type: CLEAR_ERROR_CATEGORIES,
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
      type: SHOW_LOADING_CATEGORIES,
      payload: string,
    });
  } catch (e) {
    dispatch({
      type: SHOW_ERROR_FAILED,
      payload: console.log(e),
    });
  }
};

export const showLoading = () => async (dispatch) => {
  try {
    dispatch({
      type: SHOW_LOADING_CATEGORIES,
      payload: true,
    });
  } catch (e) {
    dispatch({
      type: SHOW_LOADING_ERROR,
      payload: console.log(e),
    });
  }
};

export const hideLoading = () => async (dispatch) => {
  try {
    dispatch({
      type: HIDE_LOADING_CATEGORIES,
      payload: false,
    });
  } catch (e) {
    dispatch({
      type: HIDE_LOADING_ERROR,
      payload: console.log(e),
    });
  }
};
