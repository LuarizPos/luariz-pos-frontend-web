import { GET_CATEGORIES, CATEGORIES_ERROR } from "../types";
import axios from "axios";

export const getCategories = () => async (dispatch) => {
  const headers = {
    "Authorization": "",
    "Token": "",
    "Access-Control-Allow-Origin": "*",
  };
  try {
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
