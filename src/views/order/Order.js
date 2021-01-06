import React, { useEffect } from "react";
import Cart from "./Cart";
import OrderingProduct from "./OrderingProduct";
import CategoryFilter from "./CategoryFilter";
import { useDispatch } from "react-redux";
import { getProducts } from "../../store/actions/productsActions";
import { getCategories } from "../../store/actions/categoriesActions";

function Order() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCategories());
  }, [dispatch]);
  
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
