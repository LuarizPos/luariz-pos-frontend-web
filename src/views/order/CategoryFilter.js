import React from "react";
import { Button } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, getProductsByCategory } from "../../store/actions/productsActions";

function CategoryFilter() {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.categories);

  const setOtherButtonsInactive = () => {
    let otherButtons = document.querySelectorAll(".category-filter > button");
    let i;
    for (i = 0; i < otherButtons.length; i++) {
      otherButtons[i].classList.remove("rounded-pill");
      otherButtons[i].classList.remove("active");
      otherButtons[i].classList.remove("btn-secondary");
      otherButtons[i].classList.add("text-dark");
    }
  };

  const setThisButtonActive = (data) => {
    document.getElementById(data).classList.add("rounded-pill");
    document.getElementById(data).classList.add("active");
    document.getElementById(data).classList.add("btn-secondary");
    document.getElementById(data).classList.add("text-white");
    document.getElementById(data).classList.remove("text-dark");
  };

  const handleClick = (data) => {
    setOtherButtonsInactive();
    setThisButtonActive(data);
    data === "all-category"
      ? dispatch(getProducts())
      : dispatch(getProductsByCategory(data));
  };

  return (
    <div className="category-filter mb-2">
      <Button
        color="link"
        id="all-category"
        className="text-decoration-none rounded btn btn-link rounded-pill active btn-secondary text-white"
        onClick={() => handleClick("all-category")}
      >
        All item
      </Button>
      {categories
        .sort((a, b) => a.id_category - b.id_category) // sort category ascending by id_category
        .map((category) => (
          <React.Fragment key={category.id_category}>
            <Button
              color="link"
              id={category.id_category}
              className="text-decoration-none rounded btn btn-link text-dark"
              onClick={() => handleClick(category.id_category)}
            >
              {category.name}
            </Button>
          </React.Fragment>
        ))}
    </div>
  );
}

export default CategoryFilter;
