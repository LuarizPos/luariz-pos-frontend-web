import {
  ADD_CATEGORIES,
  ADD_CATEGORIES_ERROR,
  GET_CATEGORIES,
  UPDATE_CATEGORIES,
  UPDATE_CATEGORIES_ERROR,
  DELETE_CATEGORIES,
  DELETE_CATEGORIES_ERROR,
  CLEAR_ERROR_CATEGORIES,
  SHOW_ERROR_CATEGORIES,
  SHOW_LOADING_CATEGORIES,
  HIDE_LOADING_CATEGORIES,
} from "../types";

const initialState = {
  categories: [],
  loadingCategoryData: true,
  error: "",
};

export default function categoryReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
        loadingCategoryData: false,
      };
    case UPDATE_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
        loadingCategoryData: false,
      };
    case UPDATE_CATEGORIES_ERROR:
      return {
        ...state,
        error: action.payload,
        loadingCategoryData: false,
      };
    case ADD_CATEGORIES:
      return {
        ...state,
        categories: [...state.categories, action.payload],
        loadingCategoryData: false,
      };
    case ADD_CATEGORIES_ERROR:
      return {
        ...state,
        error: action.payload,
        loadingCategoryData: false,
      };
    case DELETE_CATEGORIES:
      return {
        ...state,
        categories: state.categories.filter(
          (category) => category.id_category !== action.payload
        ),
        loadingCategoryData: false,
      };
    case DELETE_CATEGORIES_ERROR:
      return {
        ...state,
        error: action.payload,
        loadingCategoryData: false,
      };
    case CLEAR_ERROR_CATEGORIES:
      return {
        ...state,
        error: action.payload,
      };
    case SHOW_ERROR_CATEGORIES:
      return {
        ...state,
        error: action.payload,
      };
    case SHOW_LOADING_CATEGORIES:
      return {
        ...state,
        loadingCategoryData: action.payload,
      };
    case HIDE_LOADING_CATEGORIES:
      return {
        ...state,
        loadingCategoryData: action.payload,
      };
    default:
      return state;
  }
}
