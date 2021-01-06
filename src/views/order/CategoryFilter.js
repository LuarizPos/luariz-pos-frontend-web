import React from "react";
import { Button } from "reactstrap";
import { useSelector } from "react-redux";

function CategoryFilter() {
  const categories = useSelector((state) => state.categories.categories);
  return (
    <div className="mb-2">
      <Button className="rounded btn btn-link rounded-pill active">
        All item
      </Button>
      {categories.map((category) => (
        <span key={category.id_category}>
          <Button color="link" className="rounded btn btn-link text-dark">
            {category.name}
          </Button>
        </span>
      ))}
    </div>
  );
}

export default CategoryFilter;
