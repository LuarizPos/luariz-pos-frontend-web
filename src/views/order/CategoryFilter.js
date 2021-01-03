import React from "react";
import { Button } from "reactstrap";

function CategoryFilter() {
  return (
    <div className="mb-2">
      <Button className="rounded btn btn-link rounded-pill active">
        All item
      </Button>
      <Button color="link" className="rounded btn btn-link text-dark">
        Makanan
      </Button>
      <Button color="link" className="rounded btn btn-link text-dark">
        Minuman
      </Button>
      <Button color="link" className="rounded btn btn-link text-dark">
        Snack
      </Button>
    </div>
  );
}

export default CategoryFilter;
