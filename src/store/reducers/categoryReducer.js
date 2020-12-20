import { GET_CATEGORIES, UPDATE_CATEGORIES } from "../types";

const initialState = {
  categories: [],
  loading: true,
};

export default function categoryReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
        loading: false,
      };
    case UPDATE_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
        loading: false,
      };
    default:
      return state;
  }
}
