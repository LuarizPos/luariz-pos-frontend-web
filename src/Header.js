import React from "react";

function Header() {
  return (
    <div className="header container mb-5">
      <div className="header__content row justify-content-center">
        <div className="header__merchantInfo text-center">
          <h1 class="font-weight-bolder">The Tjangkier</h1>
          <label>ID #7RT892BHD89</label>
          <p class="card-text">
            <small class="text-muted">Last synced : 3 mins ago</small>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Header;
