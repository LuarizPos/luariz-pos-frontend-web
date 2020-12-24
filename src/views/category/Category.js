import React, { useEffect } from "react";
import CategoryList from "./CategoryList";
import AddCategoryModal from "./AddCategoryModal";
import { getCategories } from "../../store/actions/categoriesActions";
import { useDispatch } from "react-redux";

function Category() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <div>
      <AddCategoryModal />
      <CategoryList />
    </div>
  );
}

export default Category;
