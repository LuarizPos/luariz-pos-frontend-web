import React, { Component } from "react";
import { connect } from "react-redux";
import { Col, Row } from "reactstrap";
import { getProducts } from "../../store/actions/productsActions";
import { getCategories } from "../../store/actions/categoriesActions";
import LoadingData from "../../general_components/LoadingData";
import ProductItem from "./ProductItem";

class ProductList extends Component {
  componentDidMount() {
    this.props.getProducts();
    this.props.getCategories();
  }
  render() {
    const { products } = this.props.products;
    const { loadingProductData } = this.props.products;

    return (
      <div>
        {loadingProductData ? (
          <LoadingData />
        ) : (
          <div>
            {products.length === 0 ? (
              <h6>Tidak ada data produk.</h6>
            ) : (
              <Row
                style={{
                  height: "60vh",
                  overflow: "scroll",
                }}
              >
                {products.map((product) => (
                  <Col md="3" sm="3" xs="3" key={product.id}>
                    <ProductItem product={product} />
                  </Col>
                ))}
              </Row>
            )}
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ products: state.products });

export default connect(mapStateToProps, { getProducts, getCategories })(
  ProductList
);
