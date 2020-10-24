import React from "react";
import "./Calculation.css";

function Calculation(props) {
  return (
    <div className="calculation">
      <div className="calculation__card card m-1">
        <div className="card-body p-3">
          <span className="calculation__subtotal d-flex justify-content-between">
            <label>Subtotal</label>
            <label className="font-weight-bold">Rp 150.000</label>
          </span>
          <span className="calculation__discount d-flex justify-content-between">
            <label>Discount</label>
            <label className="font-weight-bold">- Rp 50.000</label>
          </span>
          <span className="calculation__tax d-flex justify-content-between">
            <label>Pajak</label>
            <label className="font-weight-bold">Rp 1.500</label>
          </span>
          <hr class="my-1" />
          <span className="calculation__total d-flex justify-content-between">
            <label>Total</label>
            <label className="font-weight-bold">Rp 98.500</label>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Calculation;
