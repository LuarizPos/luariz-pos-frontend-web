import React from "react";

function FooterPromo() {
  return (
    <div className="footerPromo container">
      <div className="footerPromo__card card m-3">
        <div className="card-body p-3">
          <div className="footerPromo__title">
            <small className="text-muted">Select promo to apply</small>
          </div>
          <span className="footerPromo__type d-flex justify-content-between">
            <label className="d-flex align-items-center mb-0 font-weight-bold">
              Free 2 Beverages (for every 10 food item)
            </label>
            <button className="btn btn-info">Change</button>
          </span>
        </div>
      </div>
    </div>
  );
}

export default FooterPromo;
