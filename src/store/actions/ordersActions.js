import { ADD_TO_CART, REMOVE_FROM_CART } from "../types";

export const prepareAddToCart = (data) => async (dispatch) => {
  if (data.selectedItem === true) {
    dispatch({
      type: ADD_TO_CART,
      payload: data,
    });
  } else {
    dispatch({
      type: REMOVE_FROM_CART,
      payload: data,
    });
  }
};
