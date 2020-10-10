import React from "react";

function PaymentMethod() {
  return (
    <div className="paymentMethod">
      <div className="paymentMethod__card card m-3">
        <div className="card-body p-3">
          <div className="paymentMethod__title">
            <small className="text-muted">Pay with</small>
          </div>
          <span className="paymentMethod__type d-flex justify-content-between">
            <label className="d-flex align-items-center mb-0 font-weight-bold">
              Cash
            </label>
            <button className="btn btn-info">Change</button>
          </span>
        </div>
      </div>
      <div className="paymentMethod__payNow container">
        <button className="btn btn-lg btn-info btn-block">Pay Now</button>
      </div>
    </div>
  );
}

export default PaymentMethod;
