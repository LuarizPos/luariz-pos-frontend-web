import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Col,
  Row,
} from "reactstrap";
import { getProducts } from "../../store/actions/productsActions";
import EditProductModal from "./EditProductModal";
import DeleteProductModal from "./DeleteProductModal";
import LoadingData from "../../general_components/LoadingData";

class ProductList extends Component {
  componentDidMount() {
    this.props.getProducts();
  }
  render() {
    const { products } = this.props.products;
    const { loading } = this.props.products;
    // console.log("loading: ", loading);

    return (
      <div>
        {loading ? (
          <LoadingData />
        ) : (
          <Row
            style={{
              height: "60vh",
              overflow: "scroll",
            }}
          >
            {products.map((product) => (
              <Col md="3" sm="3" xs="3" key={product.id}>
                <React.Fragment key={product.id}>
                  <Card className="shadow mb-5 bg-white rounded">
                    <CardImg
                      top
                      src={product.image}
                      alt={product.name}
                      width="100px"
                    />
                    <CardBody>
                      <CardTitle tag="h5">{product.name}</CardTitle>
                      <CardSubtitle tag="h6" className="mb-2 text-muted">
                        {product.price}
                      </CardSubtitle>
                      <CardText>{product.description}</CardText>
                      <div className="d-flex justify-content-around">
                        <EditProductModal product={product} />
                        <DeleteProductModal product={product} />
                      </div>
                    </CardBody>
                  </Card>
                </React.Fragment>
              </Col>
            ))}
          </Row>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ products: state.products });

export default connect(mapStateToProps, { getProducts })(ProductList);
