import React from "react";
import { useSelector } from "react-redux";
import { Col, Row } from "reactstrap";
import ProductItem from "../product/ProductItem";
import LoadingData from "../../general_components/LoadingData";

function OrderingProduct() {
  const products = useSelector((state) => state.products.products);
  const loadingProductData = useSelector(
    (state) => state.products.loadingProductData
  );

  return (
    <React.Fragment>
      {loadingProductData ? (
        <LoadingData />
      ) : (
        <React.Fragment>
          {products.length === 0 ? (
            <h6>Tidak ada data produk.</h6>
          ) : (
            <Row
              className="p-3 border rounded"
              style={{
                height: "60vh",
                overflow: "scroll",
              }}
            >
              {products.map((product) => (
                <Col
                  md="3"
                  sm="3"
                  xs="3"
                  key={product.id}
                  className="order-product"
                >
                  <ProductItem
                    product={product}
                    edit={false}
                    delete={false}
                    description={false}
                    selecting={true}
                  />
                </Col>
              ))}
            </Row>
          )}
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

export default OrderingProduct;
