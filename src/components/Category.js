import React from "react";
import "./Category.css";

function Category() {
  return (
    <div className="category container mb-3 text-center">
      <button type="button" className="btn rounded-pill active">
        All Items
      </button>
      <button type="button" className="btn btn-link">
        Food
      </button>
      <button type="button" className="btn btn-link">
        Coffee
      </button>
      <button type="button" className="btn btn-link">
        Tea
      </button>
    </div>
  );
}

export default Category;
