import { ADD_TO_CART, ADD_TO_CART_ERROR, REMOVE_FROM_CART } from "../types";

const initialState = {
  orders: [],
  loadingOrderData: false,
  error: "",
};

export default function orderReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        orders: [...state.orders, action.payload],
      };
    case REMOVE_FROM_CART:
      return {
        ...state,
        orders: state.orders.filter((order) => order.id !== action.payload.id),
      };
    case ADD_TO_CART_ERROR:
      return {
        ...state,
        error: "ADD_TO_CART_ERROR",
      };
    default:
      return state;
  }
}
