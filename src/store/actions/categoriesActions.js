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

export const getCategories = () => async (dispatch) => {
  const headers = {
    Authorization: "",
    Token: "",
    "Access-Control-Allow-Origin": "*",
  };
  try {
    await dispatch({
      type: SHOW_LOADING_CATEGORIES,
      payload: true,
    });

    // Send a POST request
    let res = await axios({
      method: "post",
      url: "https://app-luariz-post.herokuapp.com/v1/get_category",
      data: {
        Category: {
          ShowAll: 1,
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
  const headers = {
    Authorization: "",
    Token: "",
    "Access-Control-Allow-Origin": "*",
  };

  try {
    await dispatch({
      type: SHOW_LOADING_CATEGORIES,
      payload: true,
    });

    const addedData = {
      name: data.name,
    };

    // Send a POST request
    await axios({
      method: "post",
      url: "https://app-luariz-post.herokuapp.com/v1/insert_category",
      data: {
        Category: [
          {
            name: data.name,
          },
        ],
      },
      headers: headers,
      timeout: 15000,
    }).then(function (response) {
      // set id_category from response
      addedData.id = response.data.API_LuarizPos.Response[0].id;
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
  const headers = {
    Authorization: "",
    Token: "",
    "Access-Control-Allow-Origin": "*",
  };

  try {
    await dispatch({
      type: SHOW_LOADING_CATEGORIES,
      payload: true,
    });

    // Send a POST request
    await axios({
      method: "post",
      url: "https://app-luariz-post.herokuapp.com/v1/update_category",
      data: {
        Category: [
          {
            id_category: data.id,
            name: data.name,
          },
        ],
      },
      headers: headers,
      timeout: 15000,
    });

    await dispatch({
      type: UPDATE_CATEGORIES,
      payload: data,
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
  const headers = {
    Authorization: "",
    Token: "",
    "Access-Control-Allow-Origin": "*",
  };

  try {
    await dispatch({
      type: SHOW_LOADING_CATEGORIES,
      payload: true,
    });

    // Send a POST request
    await axios({
      method: "post",
      url: "https://app-luariz-post.herokuapp.com/v1/delete_category",
      data: {
        Category: [
          {
            id: id,
          },
        ],
      },
      headers: headers,
      timeout: 15000,
    });

    await dispatch({
      type: DELETE_CATEGORIES,
      payload: id,
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
