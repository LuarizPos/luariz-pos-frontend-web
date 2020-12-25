import React from "react";
import CategoryList from "./CategoryList";
import AddCategoryModal from "./AddCategoryModal";

function Category() {

  return (
    <div>
      <AddCategoryModal />
      <CategoryList />
    </div>
  );
}

export default Category;
