import { combineReducers } from "redux";
import userReducer from "./userReducer";
import productReducer from "./productReducer";
import categoryReducer from "./categoryReducer";
import orderReducer from "./orderReducer";
import loginReducer from "./loginReducer";

export default combineReducers({
  categories: categoryReducer,
  products: productReducer,
  users: userReducer,
  orders: orderReducer,
  login: loginReducer,
});
