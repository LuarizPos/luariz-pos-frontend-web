import React from "react";
import { Row, Col, Container, Button } from "reactstrap";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import CartItem from "./CartItem";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";

function Cart() {
  return (
    <div>
      <Container
        className="border border-info rounded p-3"
        style={{ height: "70vh", overflow: "scroll" }}
      >
        <Row className="mb-3">
          <Col>
            <div className="d-flex justify-content-between align-items-end">
              <h5>Current Order</h5>
              <HighlightOffIcon className="mb-1 text-dark" color="btn-link" />
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <CartItem />
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
    </div>
  );
}

export default Cart;
