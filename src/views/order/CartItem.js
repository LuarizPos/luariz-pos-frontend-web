import React, { useState } from "react";
import { Button, Col, Row } from "reactstrap";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { useDispatch } from "react-redux";
import { setOrderedItem } from "../../store/actions/ordersActions";

function CartItem(props) {
  const order = props.order;
  const [count, setCount] = useState(1);

  const dispatch = useDispatch();

  const handleIncrease = (order) => {
    setCount(count + 1);
    let orderData = { ...order, orderedItem: count + 1 };
    dispatch(setOrderedItem(orderData));
  };

  const handleDecrease = () => {
    if (count > 0) {
      setCount(count - 1);
    } else {
      return null;
    }
  };

  return (
    <React.Fragment>
      <Row className="d-flex align-items-center justify-content-between">
        <Col sm="6" md="6" lg="6">
          <label className="mb-0">{order.name}</label>
        </Col>
        <Col
          sm="6"
          md="6"
          lg="6"
          className="d-flex align-items-center justify-content-end"
        >
          <Button color="link" onClick={() => handleIncrease(order)}>
            <AddCircleOutlineIcon />
          </Button>
          <label className="mb-0 mx-1">{count}</label>
          <Button color="link" onClick={() => handleDecrease(order)}>
            <RemoveCircleOutlineIcon />
          </Button>
        </Col>
      </Row>
      <hr />
    </React.Fragment>
  );
}

export default CartItem;
