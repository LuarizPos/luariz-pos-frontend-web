import React from "react";
import "./Product.css";

function Product(props) {
  return (
    <div className="product">
      <div className="product__card card m-3">
        <div className="card-body d-flex flex-column justify-content-between">
          <div className="card-title">
            <label className="product__title">{props.title}</label>
            <label className="product__description">{props.description}</label>
          </div>
          <div className="d-block">
            <div className="d-flex justify-content-between">
              <div className="product__price">
                <h6>Rp {props.price}</h6>
              </div>
              <div className="product__image">
                <img src={props.image} alt="" className="rounded" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
