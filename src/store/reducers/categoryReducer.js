import {
  ADD_CATEGORIES,
  ADD_CATEGORIES_ERROR,
  GET_CATEGORIES,
  UPDATE_CATEGORIES,
  DELETE_CATEGORIES,
  DELETE_CATEGORIES_ERROR,
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
          (category) => category.id !== action.payload
        ),
        loadingCategoryData: false,
      };
    case DELETE_CATEGORIES_ERROR:
      return {
        ...state,
        error: action.payload,
        loadingCategoryData: false,
      };
    default:
      return state;
  }
}
