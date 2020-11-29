import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import LessWidth from "./views/warning/LessWidth";
import "bootstrap/dist/css/bootstrap.min.css";
import reportWebVitals from "./reportWebVitals";

import { Provider } from "react-redux";
import store from "./store/index";
window.store = store;

const deviceWidth = Math.max(window.screen.width, window.innerWidth);

if (deviceWidth < 720) {
  ReactDOM.render(
    <Provider store={store}>
      <LessWidth />
    </Provider>,
    document.getElementById("root")
  );
} else {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById("root")
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
