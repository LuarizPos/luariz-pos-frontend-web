import React from "react";
import "./Product.css";

function Product(props) {
  return (
    <div className="product" id={props.id} key={props.key}>
      <div className="product__card card m-2">
        <div className="card-body">
          <div className="row">
            <div className="col-7">
              <h6 className="product__title">{props.title}</h6>
              <label className="product__description">
                {props.description}
              </label>
            </div>
            <div className="col-5">
              <div className="product__image">
                <img src={props.image} alt="" className="rounded" />
              </div>
            </div>
          </div>
          <div className="product__price">
            <h6>Rp {props.price}</h6>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
