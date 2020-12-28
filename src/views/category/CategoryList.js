import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Col, ListGroup, ListGroupItem, Row } from "reactstrap";
import LoadingData from "../../general_components/LoadingData";
import EditCategoryModal from "./EditCategoryModal";
import DeleteCategoryModal from "./DeleteCategoryModal";
import { getCategories } from "../../store/actions/categoriesActions";

function CategoryList() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const loadingCategoryData = useSelector(
    (state) => state.categories.loadingCategoryData
  );
  const categories = useSelector((state) => state.categories.categories);

  return (
    <div style={{ height: "70vh", overflow: "scroll" }}>
      {loadingCategoryData === true ? (
        <LoadingData />
      ) : (
        <>
          <ListGroup>
            {categories.map((category) => (
              <ListGroupItem
                className="shadow-sm p-3 mb-3 bg-white rounded"
                key={category.id_category}
              >
                <Row>
                  <Col className="text-left align-self-center">
                    <h4 className="d-block font-weight-bold mb-0 text-dark">
                      {category.name}
                    </h4>
                    <small>{category.total_product} Products</small>
                  </Col>
                  <Col className="text-right align-self-center">
                    <EditCategoryModal category={category} />
                    <DeleteCategoryModal category={category} />
                  </Col>
                </Row>
              </ListGroupItem>
            ))}
          </ListGroup>
        </>
      )}
    </div>
  );
}

export default CategoryList;
