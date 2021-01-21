import {
  GET_PRODUCTS,
  GET_PRODUCTS_ERROR,
  UPDATE_PRODUCTS,
  UPDATE_PRODUCTS_ERROR,
  SHOW_EDIT_MODAL,
  SHOW_EDIT_MODAL_ERROR,
  HIDE_EDIT_MODAL,
  HIDE_EDIT_MODAL_ERROR,
  SHOW_LOADING,
  SHOW_LOADING_ERROR,
  HIDE_LOADING,
  HIDE_LOADING_ERROR,
  CLEAR_ERROR,
  CLEAR_ERROR_FAILED,
  SHOW_ERROR,
  SHOW_ERROR_FAILED,
  DELETE_PRODUCTS,
  DELETE_PRODUCTS_ERROR,
  ADD_PRODUCTS,
  ADD_PRODUCTS_ERROR,
  SET_TO_SELECTED,
  CLEAR_SELECTED,
  GET_PRODUCTS_BY_CATEGORY,
  GET_PRODUCTS_BY_CATEGORY_ERROR,
} from "../types";
import axios from "axios";

const baseURL = process.env.REACT_APP_BASEURL_SERVER;

export const getProducts = () => async (dispatch) => {
  const headers = {
    Authorization: "",
    Token: "",
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  };
  try {
    await dispatch({
      type: SHOW_LOADING,
      payload: true,
    });

    // Send a POST request
    await axios({
      method: "post",
      url: `${baseURL}/v1/get_product`,
      data: {
        Product: {
          ShowAll: 1,
          id_product: 0,
        },
      },
      headers: headers,
    }).then((response) => {
      let data = response.data.API_LuarizPos.Response;
      let message = response.data.API_LuarizPos.Message;

      if (message.Code === 200) {
        dispatch({
          type: GET_PRODUCTS,
          payload: data,
        });
      } else {
        dispatch({
          type: GET_PRODUCTS_ERROR,
        });
      }
    });
  } catch (e) {
    dispatch({
      type: GET_PRODUCTS_ERROR,
      payload: console.log(e),
    });
  }
};

export const updateProducts = (data) => async (dispatch) => {
  const headers = {
    Authorization: "",
    Token: "",
    "Access-Control-Allow-Origin": "*",
  };
  try {
    const updatedData = {
      id_product: Number(data.id_product),
      name: data.name,
      id_category: Number(data.id_category),
      description: data.description,
      image: data.image.fullEncoded,
      stock: 200,
      price: Number(data.price),
    };

    // Send a POST request
    await axios({
      method: "post",
      url: `${baseURL}/v1/update_product`,
      data: {
        Product: [
          {
            id_product: Number(data.id_product),
            name: data.name,
            id_category: Number(data.id_category),
            description: data.description,
            image: data.image,
            stock: 200,
            price: Number(data.price),
          },
        ],
      },
      headers: headers,
      timeout: 15000,
    }).then(() => {
      dispatch({
        type: UPDATE_PRODUCTS,
        payload: updatedData,
      });
    });
  } catch (e) {
    dispatch({
      type: UPDATE_PRODUCTS_ERROR,
      payload:
        "Terjadi kesalahan koneksi saat mengedit produk. Cobalah beberapa saat lagi.",
    });
  }
};

export const deleteProducts = (id) => async (dispatch) => {
  const headers = {
    Authorization: "",
    Token: "",
    "Access-Control-Allow-Origin": "*",
  };
  try {
    // Send a POST request
    await axios({
      method: "post",
      url: `${baseURL}/v1/delete_product`,
      data: {
        Product: [
          {
            id_product: Number(id),
          },
        ],
      },
      headers: headers,
      timeout: 15000,
    });

    await dispatch({
      type: DELETE_PRODUCTS,
      payload: id,
    });
  } catch (e) {
    dispatch({
      type: DELETE_PRODUCTS_ERROR,
      payload:
        "Terjadi kesalahan koneksi saat menghapus produk. Cobalah beberapa saat lagi.",
    });
  }
};

export const addProducts = (data) => async (dispatch) => {
  const headers = {
    Authorization: "",
    Token: "",
    "Access-Control-Allow-Origin": "*",
  };

  try {
    await dispatch({
      type: SHOW_LOADING,
      payload: true,
    });

    const addedData = {
      name: data.name,
      id_category: Number(data.id_category),
      description: data.description,
      image: data.image.fullEncoded,
      stock: 200,
      price: Number(data.price),
    };

    // Send a POST request
    await axios({
      method: "post",
      url: `${baseURL}/v1/insert_product`,
      data: {
        Product: [
          {
            name: data.name,
            id_category: Number(data.id_category),
            description: data.description,
            image: data.image,
            stock: 200,
            price: Number(data.price),
          },
        ],
      },
      headers: headers,
      timeout: 15000,
    }).then(function (response) {
      if (response.status === 200) {
        // set id_product from response
        addedData.id = response.data.API_LuarizPos.Response[0].id;
        dispatch({
          type: ADD_PRODUCTS,
          payload: addedData,
        });
      }
    });
  } catch (e) {
    dispatch({
      type: ADD_PRODUCTS_ERROR,
      payload:
        "Terjadi kesalahan koneksi saat menambah produk. Cobalah beberapa saat lagi.",
    });
  }
};

export const showEditModal = () => async (dispatch) => {
  try {
    dispatch({
      type: SHOW_EDIT_MODAL,
      payload: true,
    });
  } catch (e) {
    dispatch({
      type: SHOW_EDIT_MODAL_ERROR,
      payload: console.log(e),
    });
  }
};

export const hideEditModal = () => async (dispatch) => {
  try {
    dispatch({
      type: HIDE_EDIT_MODAL,
      payload: false,
    });
  } catch (e) {
    dispatch({
      type: HIDE_EDIT_MODAL_ERROR,
      payload: console.log(e),
    });
  }
};

export const showLoading = () => async (dispatch) => {
  try {
    dispatch({
      type: SHOW_LOADING,
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
      type: HIDE_LOADING,
      payload: false,
    });
  } catch (e) {
    dispatch({
      type: HIDE_LOADING_ERROR,
      payload: console.log(e),
    });
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

export const setToSelected = (data) => async (dispatch) => {
  dispatch({
    type: SET_TO_SELECTED,
    payload: data.id,
  });
};

export const clearSelected = () => async (dispatch) => {
  dispatch({
    type: CLEAR_SELECTED,
  });
};

export const getProductsByCategory = (id_category) => async (dispatch) => {
  const headers = {
    Authorization: "",
    Token: "",
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  };
  try {
    await dispatch({
      type: SHOW_LOADING,
      payload: true,
    });

    // Send a POST request
    await axios({
      method: "post",
      url: `${baseURL}/v1/get_product`,
      data: {
        Product: {
          ShowAll: 1,
          id_product: 0,
        },
      },
      headers: headers,
    }).then((response) => {
      let data = response.data.API_LuarizPos.Response.filter(
        (product) => product.id_category === id_category
      );
      let message = response.data.API_LuarizPos.Message;

      if (message.Code === 200) {
        dispatch({
          type: GET_PRODUCTS_BY_CATEGORY,
          payload: data,
        });
      } else {
        dispatch({
          type: GET_PRODUCTS_BY_CATEGORY_ERROR,
        });
      }
    });
  } catch (e) {
    dispatch({
      type: GET_PRODUCTS_BY_CATEGORY_ERROR,
      payload: console.log(e),
    });
  }
};
