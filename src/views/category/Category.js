import React from "react";
import Button from "@material-ui/core/Button";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import CategoryList from "./CategoryList";

function Category() {
  return (
    <div>
      <Button
        variant="contained"
        size="large"
        color="primary"
        className="my-3"
        startIcon={<AddCircleOutlineIcon />}
      >
        Tambah Kategori
      </Button>
      <CategoryList />
    </div>
  );
}

export default Category;
