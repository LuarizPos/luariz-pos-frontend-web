import React from "react";
import Category from "./Category";
import Header from "./Header";
import Product from "./Product";
import Cart from "./Cart";
import "./Order.css";
import Calculation from "./Calculation";
import PaymentMethod from "./PaymentMethod";
import Promotion from "./Promotion";
import data from "./productData.json";

function Order() {
  return (
    <div className="order">
      <div className="order container mt-3">
        <div className="order__panel row">
          <div className="order__leftPanel col-7 border-right">
            <Header />
            <Category />
            <div className="product__container card-group overflow-auto justify-content-center">
              {data.map((obj) => {
                return (
                  <Product
                    key={obj.key}
                    id={obj.id}
                    title={obj.title}
                    description={obj.description}
                    price={obj.price}
                    image={obj.image}
                  />
                );
              })}
            </div>
            <Promotion />
          </div>
          <div className="order__rightPanel col-5">
            <div className="mb-3">
              <div className="d-flex justify-content-between">
                <h5 className="m-0 d-flex align-items-center">Current Order</h5>
                <button className="btn btn-light">Clear</button>
              </div>
            </div>
            <div className="order">
              <div className="order__cartList">
                {data.map((obj) => {
                  return (
                    <Cart
                      key={obj.key}
                      id={obj.id}
                      title={obj.title}
                      description={obj.description}
                      price={obj.price}
                      image={obj.image}
                    />
                  );
                })}
              </div>
            </div>
            <Calculation />
            <PaymentMethod />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Order;
