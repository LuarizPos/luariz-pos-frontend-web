import React from "react";
import ProductList from "./ProductList";
import AddProductModal from "./AddProductModal";

function Product() {
  return (
    <div>
      <AddProductModal />
      <ProductList />
    </div>
  );
}

export default Product;
