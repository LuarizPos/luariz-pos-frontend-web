import { GET_PRODUCTS, PRODUCTS_ERROR } from "../types";
// import axios from "axios";

const headers = {
  Authorization: "",
  Token: "",
  "Content-type": "application/json; charset=UTF-8",
  "Access-Control-Allow-Origin": "*",
};

export const getProducts = () => async (dispatch) => {
  try {
    let res = fetch("https://app-luariz-post.herokuapp.com/v1/get_product", {
      method: "POST",
      body: JSON.stringify({
        Product: {
          ShowAll: 1,
          id_product: 0,
        },
      }),
      headers: headers,
    })
      .then((response) => response.json())
      .then((json) => console.log(json));

    dispatch({
      type: GET_PRODUCTS,
      payload: res.data,
    });
  } catch (e) {
    dispatch({
      type: PRODUCTS_ERROR,
      payload: console.log(e),
    });
  }
};
