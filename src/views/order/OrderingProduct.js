import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row } from "reactstrap";
import { getProducts } from "../../store/actions/productsActions";
import ProductItem from "../product/ProductItem";
import LoadingData from "../../general_components/LoadingData";
import { Link } from "react-router-dom";

function OrderingProduct() {
  const dispatch = useDispatch();
  const [order, setOrder] = useState([]);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const products = useSelector((state) => state.products.products);
  const loadingProductData = useSelector(
    (state) => state.products.loadingProductData
  );

  const handleClick = (id) => {
    // console.log(event.target.dataset.id);
    setOrder(id);
    console.log(id);
  };

  return (
    <React.Fragment>
      {loadingProductData ? (
        <LoadingData />
      ) : (
        <React.Fragment>
          {products.length === 0 ? (
            <h6>
              Tidak ada data produk. Silahkah tambah produk di bagian{" "}
              <Link to="/product">Produk</Link>
            </h6>
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
                  onClick={() => handleClick(product)}
                  // data-id={product.id}
                >
                  <ProductItem
                    product={product}
                    edit={false}
                    delete={false}
                    description={false}
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
