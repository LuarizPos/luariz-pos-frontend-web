import React from "react";
import Category from "./Category";
import Header from "./Header";
import Product from "./Product";
import Cart from "./Cart";
import "./Order.css";
import Calculation from "./Calculation";
import PaymentMethod from "./PaymentMethod";
import Promotion from "./Promotion";

function Order() {
  return (
    <div className="order">
      <div className="order container mt-3">
        <div className="order__panel row">
          <div className="order__leftPanel col-7 border-right">
            <Header />
            <Category />
            <div className="product__container card-group overflow-auto justify-content-center">
              <Product
                key={42341132432}
                id={432432432}
                title="Jagung Panggang"
                description="Jagung manis enak rasa asin gurih lezat."
                price={3000}
                image="https://source.unsplash.com/100x100/?corn"
              />
              <Product
                key={423432432}
                id={32343242}
                title="Steak Iga Sapi"
                description="Steak dengan daging pilihan yang gurih lezat."
                price={45000}
                image="https://source.unsplash.com/100x100/?steak"
              />
              <Product
                key={423432432}
                id={32343242}
                title="El Capucinno"
                description="Kopi capucinno dengan rasa mantap."
                price={15000}
                image="https://source.unsplash.com/100x100/?coffee"
              />
              <Product
                key={423432432}
                id={32343242}
                title="The Mi Tea"
                description="Teh beraroma menyejukkan."
                price={8000}
                image="https://source.unsplash.com/100x100/?tea"
              />
            </div>
            <Promotion />
          </div>
          <div className="order__rightPanel col-5">
            <div className="">
              <div className="d-flex justify-content-between">
                <h5 className="m-0 d-flex align-items-center">Current Order</h5>
                <button className="btn btn-light">Clear</button>
              </div>
            </div>
            <div className="order__cartList">
              <Cart
                key={423432432}
                id={32343242}
                title="El Capucinno"
                description="Kopi capucinno dengan rasa mantap."
                price={15000}
                image="https://source.unsplash.com/100x100/?coffee"
              />
              <Cart
                key={423432432}
                id={32343242}
                title="The Mi Tea "
                description="Teh beraroma menyejukkan."
                price={8000}
                image="https://source.unsplash.com/100x100/?tea"
              />
              <Cart
                key={423432432}
                id={32343242}
                title="The Mi Tea "
                description="Teh beraroma menyejukkan."
                price={8000}
                image="https://source.unsplash.com/100x100/?tea"
              />
              <Cart
                key={423432432}
                id={32343242}
                title="The Mi Tea "
                description="Teh beraroma menyejukkan."
                price={8000}
                image="https://source.unsplash.com/100x100/?tea"
              />
              <Cart
                key={423432432}
                id={32343242}
                title="The Mi Tea "
                description="Teh beraroma menyejukkan."
                price={8000}
                image="https://source.unsplash.com/100x100/?tea"
              />
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
