import React from "react";
import { Switch, Route } from "react-router-dom";
import Category from "../views/category/Category";
import Dashboard from "../views/dashboard/Dashboard";
import Order from "../views/order/Order";
import Product from "../views/product/Product";
import Setting from "../views/setting/Setting";
// import Test from "../views/Test";

function TheContent() {
  return (
    <Switch>
      <Route path="/dashboard">
        <Dashboard />
      </Route>
      <Route path="/order">
        <Order />
      </Route>
      <Route path="/category">
        <Category />
      </Route>
      <Route path="/product">
        <Product />
      </Route>
      <Route path="/setting">
        <Setting />
      </Route>
    </Switch>
  );
}

export default TheContent;
