import React from "react";
import Cart from "./Cart";
import OrderingProduct from "./OrderingProduct";
import ProductCategory from "./ProductCategory";

function Order() {
  return (
    <div className="row">
      <div className="col-8">
        <ProductCategory />
        <OrderingProduct />
      </div>
      <div className="col-4">
        <Cart />
      </div>
    </div>
  );
}

export default Order;
