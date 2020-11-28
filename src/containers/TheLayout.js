import React from "react";
import Header from "./TheHeader";
import Sidebar from "./TheSidebar";
import Content from "./TheContent";
import Footer from "./TheFooter";

function TheLayout() {
  return (
    <div className="d-flex flex-column sticky-footer-wrapper min-vh-100">
      <Header />
      <div className="flex-fill my-3">
        <div className="row m-0">
          <div className="col-1">
            <Sidebar />
          </div>
          <div className="col-11">
            <Content />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default TheLayout;
