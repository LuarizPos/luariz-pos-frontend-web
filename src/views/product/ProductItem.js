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

function ProductItem(props) {
  const editStatus = props.edit;
  const deleteStatus = props.delete;
  const descriptionStatus = props.description;
  const selectingStatus = props.selecting;

  const [selected, setSelected] = useState(false);

  const handleClick = (data) => {
    // console.log(event.target.dataset.id);
    // console.log(data.name);
    if (selectingStatus === true) {
      setSelected(!selected);
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
