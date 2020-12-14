import { combineReducers } from "redux";
import userReducer from "./userReducer";
import productReducer from "./productReducer";
import categoryReducer from "./categoryReducer";

export default combineReducers({
  categories: categoryReducer,
  products: productReducer,
  users: userReducer,
});
