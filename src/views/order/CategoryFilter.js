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
        <Button
          color="link"
          className="rounded btn btn-link text-dark"
          key={category.id}
        >
          {category.name}
        </Button>
      ))}
    </div>
  );
}

export default CategoryFilter;
