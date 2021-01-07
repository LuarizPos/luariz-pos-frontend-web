import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  CLEAR_CART,
  SET_ORDERED_ITEM,
} from "../types";

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

export const clearCart = (data) => async (dispatch) => {
  dispatch({
    type: CLEAR_CART,
  });
};

export const setOrderedItem = (data) => async (dispatch) => {
  dispatch({
    type: SET_ORDERED_ITEM,
    payload: data,
  });
};
