import { GET_PRODUCTS, PRODUCTS_ERROR } from "../types";
import axios from "axios";

const headers = {
  "Authorization": "",
  "Token": "",
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
};

export const getProducts = () => async (dispatch) => {
  try {
    const res = await axios
      .post(
        "https://app-luariz-post.herokuapp.com/v1/get_product",
        {
          Product: {
            ShowAll: 1,
            id_product: 0,
          },
        },
        { headers }
      )
      .then((response) => {
        console.log(response);
      });
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
