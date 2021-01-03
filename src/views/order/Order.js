import React from "react";
import Cart from "./Cart";
import OrderingProduct from "./OrderingProduct";
import CategoryFilter from "./CategoryFilter";

function Order() {
  return (
    <div className="row">
      <div className="col-8">
        <CategoryFilter />
        <OrderingProduct />
      </div>
      <div className="col-4">
        <Cart />
      </div>
    </div>
  );
}

export default Order;
