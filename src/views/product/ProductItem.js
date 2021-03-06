import React, { useState } from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
} from "reactstrap";
import EditProductModal from "./EditProductModal";
import DeleteProductModal from "./DeleteProductModal";
import { rupiahCoverter } from "../../helper/textHelper";
import { useDispatch, useSelector } from "react-redux";
import { prepareAddToCart } from "../../store/actions/ordersActions";
import { setToSelected } from "../../store/actions/productsActions";

function ProductItem(props) {
  const dispatch = useDispatch();
  const editStatus = props.edit;
  const deleteStatus = props.delete;
  const descriptionStatus = props.description;
  const selectingStatus = props.selecting;

  const selectedProducts = useSelector(
    (state) => state.products.selectedProducts
  );

  const [selected, setSelected] = useState(
    selectedProducts.includes(props.product.id) && selectingStatus === true
      ? true
      : false
  );

  const handleClick = (data) => {
    if (selectingStatus === true) {
      data.selectedItem = !selected;
      data.orderedItem = 1; // Set default order item to 1
      setSelected((selected) => !selected);
      dispatch(prepareAddToCart(data));
      dispatch(setToSelected(data));
    }
  };

  return (
    <React.Fragment>
      <Card
        onClick={() => handleClick(props.product)}
        className={
          selected
            ? "shadow mb-5 p-1 bg-dark text-white rounded"
            : "shadow mb-5 bg-white rounded"
        }
        id={`products-${props.product.id}`}
      >
        <CardImg
          top
          src={props.product.image}
          alt={props.product.name}
          width="100px"
        />
        <CardBody>
          <CardTitle tag="h6">{props.product.name}</CardTitle>
          <CardSubtitle className="mb-2 text-muted">
            <strong>{rupiahCoverter(props.product.price)}</strong>
          </CardSubtitle>
          <CardText>
            {descriptionStatus ? props.product.description : null}
          </CardText>
          <div className="d-flex justify-content-around" key={props.product.id}>
            {editStatus ? <EditProductModal product={props.product} /> : null}
            {deleteStatus ? (
              <DeleteProductModal product={props.product} />
            ) : null}
          </div>
        </CardBody>
      </Card>
    </React.Fragment>
  );
}

export default ProductItem;
