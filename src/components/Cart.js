import React from "react";
import "./Cart.css";

function Cart(props) {
  return (
    <div className="cart">
      <div className="cart__container">
        <div className="cart__item d-flex align-items-center mb-1">
          <img
            src={props.image}
            alt=""
            className="rounded"
            width="50"
            height="50"
          />
          <label className="cart__itemTitle font-weight-bold m-0 p-1">
            {props.title}
          </label>
          <button className="btn btn-danger">-</button>
          <label className="my-1 mx-2">2</label>
          <button className="btn btn-info">+</button>
          <h6 className="mx-1 my-0">Rp {props.price}</h6>
        </div>
      </div>
    </div>
  );
}

export default Cart;
