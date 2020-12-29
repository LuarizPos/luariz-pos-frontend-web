import React from "react";
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
  return (
    <React.Fragment>
      <Card className="shadow mb-5 bg-white rounded">
        <CardImg
          top
          src={props.product.image}
          alt={props.product.name}
          width="100px"
        />
        <CardBody>
          <CardTitle tag="h5">{props.product.name}</CardTitle>
          <CardSubtitle tag="h6" className="mb-2 text-muted">
            {rupiahCoverter(props.product.price)}
          </CardSubtitle>
          <CardText>{props.product.description}</CardText>
          <div className="d-flex justify-content-around" key={props.product.id}>
            <EditProductModal product={props.product} />
            <DeleteProductModal product={props.product} />
          </div>
        </CardBody>
      </Card>
    </React.Fragment>
  );
}

export default ProductItem;
