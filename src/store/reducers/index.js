import { combineReducers } from "redux";
import userReducer from "./userReducer";
import productReducer from "./productReducer";

export default combineReducers({
  products: productReducer,
  users: userReducer,
});
