import React from "react";
import { Row, Col, Container, Button } from "reactstrap";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import CartItem from "./CartItem";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../../store/actions/ordersActions";
import { getProducts } from "../../store/actions/productsActions";
import EmptyOrdersListIcon from "../../svg/empty_order_list.svg";

function Cart() {
  const orders = useSelector((state) => state.orders.orders);
  const dispatch = useDispatch();

  const handleClick = () => {
    if (orders.length !== 0) {
      dispatch(clearCart());
      dispatch(getProducts());
    }
  };

  const EmptyOrders = (
    <div className="d-flex justify-content-center p-5 flex-column align-items-center">
      <img
        src={EmptyOrdersListIcon}
        alt="Orders is empty"
        width="100"
        height="100"
        style={{ opacity: "50%" }}
      />
      <h4 className="text-muted my-3">Empty</h4>
    </div>
  );
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
            {orders.length === 0
              ? EmptyOrders
              : orders.map((order) => (
                  <CartItem order={order} key={order.id} />
                ))}
          </Col>
        </Row>
      </Container>

      <div className="mt-3">
        <div className="w-100">
          <Button
            className="btn-block"
            color="primary"
            disabled={orders.length === 0 ? true : false}
          >
            Proceed to checkout <NavigateNextIcon />
          </Button>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Cart;
