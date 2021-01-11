import {
  GET_PRODUCTS,
  GET_PRODUCTS_ERROR,
  UPDATE_PRODUCTS,
  UPDATE_PRODUCTS_ERROR,
  SHOW_EDIT_MODAL,
  HIDE_EDIT_MODAL,
  SHOW_LOADING,
  HIDE_LOADING,
  CLEAR_ERROR,
  SHOW_ERROR,
  DELETE_PRODUCTS,
  DELETE_PRODUCTS_ERROR,
  ADD_PRODUCTS,
  ADD_PRODUCTS_ERROR,
  GET_ERROR,
  SET_TO_SELECTED,
  CLEAR_SELECTED,
} from "../types";

const initialState = {
  products: [],
  loadingProductData: false,
  error: "",
  selectedProducts: [],
};

export default function productReducer(state = initialState, action) {
  switch (action.type) {
    case SHOW_EDIT_MODAL:
      return {
        ...state,
        openEditModal: action.payload,
      };
    case HIDE_EDIT_MODAL:
      return {
        ...state,
        openEditModal: action.payload,
      };
    case SHOW_LOADING:
      return {
        ...state,
        loadingProductData: action.payload,
      };
    case HIDE_LOADING:
      return {
        ...state,
        loadingProductData: action.payload,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case SHOW_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case GET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        loadingProductData: false,
      };
    case GET_PRODUCTS_ERROR:
      return {
        ...state,
        loadingProductData: false,
      };
    case UPDATE_PRODUCTS:
      return {
        ...state,
        products: state.products.map((product) =>
          product.id === action.payload.id_product
            ? {
                ...product,
                name: action.payload.name,
                id_category: action.payload.id_category,
                description: action.payload.description,
                price: action.payload.price,
                image: action.payload.image,
              }
            : product
        ),
        loadingProductData: false,
      };
    case UPDATE_PRODUCTS_ERROR:
      return {
        ...state,
        error: action.payload,
        loadingProductData: false,
      };
    case DELETE_PRODUCTS:
      return {
        ...state,
        products: state.products.filter(
          (product) => product.id !== action.payload
        ),
        loadingProductData: false,
      };
    case DELETE_PRODUCTS_ERROR:
      return {
        ...state,
        error: action.payload,
        loadingProductData: false,
      };
    case ADD_PRODUCTS:
      return {
        ...state,
        products: [...state.products, action.payload],
        loadingProductData: false,
      };
    case ADD_PRODUCTS_ERROR:
      return {
        ...state,
        error: action.payload,
        loadingProductData: false,
      };
    case GET_ERROR:
      return {
        ...state,
        error: [...state.products.error],
      };
    case SET_TO_SELECTED:
      return {
        ...state,
        selectedProducts: [...state.selectedProducts, action.payload],
      };
    case CLEAR_SELECTED:
      return {
        ...state,
        selectedProducts: [],
      };
    default:
      return state;
  }
}
