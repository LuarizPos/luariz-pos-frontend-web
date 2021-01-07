import React from "react";
import { Row, Col, Container, Button } from "reactstrap";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import CartItem from "./CartItem";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../../store/actions/ordersActions";
import { getProducts } from "../../store/actions/productsActions";

function Cart() {
  const orders = useSelector((state) => state.orders.orders);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(clearCart())
    dispatch(getProducts())
  }

  return (
    <React.Fragment>
      <Container
        className="border border-info rounded p-3"
        style={{ height: "70vh", overflow: "scroll" }}
      >
        <Row className="mb-3">
          <Col>
            <div className="d-flex justify-content-between align-items-end">
              <h5>Current Order</h5>
              <HighlightOffIcon
                className="mb-1 text-dark"
                onClick={() => handleClick()}
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            {orders.map((order) => (
              <CartItem order={order} key={order.id} />
            ))}
          </Col>
        </Row>
      </Container>
      <Container>
        <Row className="mt-3">
          <Col>
            <Button className="btn-block" color="primary">
              Proceed to checkout <NavigateNextIcon />
            </Button>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
}

export default Cart;
