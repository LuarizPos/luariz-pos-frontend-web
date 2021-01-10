import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { Button, Col, Form, FormGroup, Row } from "reactstrap";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { useSelector } from "react-redux";
import Alert from "@material-ui/lab/Alert";
import { rupiahCoverter } from "../../helper/textHelper";
import PaymentOption from "./PaymentOption";

function Checkout() {
  //   const dispatch = useDispatch();
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);

  const error = useSelector((state) => state.orders.error);
  const orders = useSelector((state) => state.orders.orders);

  const totalOrderPrice = orders.reduce(function (accumulator, currentValue) {
    return accumulator + currentValue.price * currentValue.orderedItem;
  }, 0);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {};

  const body = (
    <div style={modalStyle} className={classes.paper}>
      {error === "" ? null : (
        <Alert severity="error" className="error-product mb-2">
          {error}
        </Alert>
      )}
      <h2 id="simple-modal-title">Checkout</h2>
      <p id="simple-modal-description"></p>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <PaymentOption />
        </FormGroup>

        {orders.map((order) => (
          <FormGroup key={order.id}>
            <Row className="shadow-sm p-3 mb-1 bg-white rounded">
              <Col className="col-8">
                <img
                  src={order.image}
                  width={100}
                  height={40}
                  alt={order.name}
                  className="mr-2 rounded"
                />
                {order.orderedItem} x {order.name}
              </Col>
              <Col className="col-4 text-right align-self-center">
                {rupiahCoverter(order.price * order.orderedItem)}
              </Col>
            </Row>
          </FormGroup>
        ))}
        <FormGroup>
          <div className="shadow p-3 mb-5 bg-white rounded">
            <table className="table table-sm">
              <tbody>
                <tr>
                  <td colSpan="2">
                    <strong>Subtotal</strong>
                  </td>
                  <td>{rupiahCoverter(totalOrderPrice)}</td>
                </tr>
                <tr>
                  <td colSpan="2">
                    <strong>Tax</strong>
                  </td>
                  <td>{rupiahCoverter(0)}</td>
                </tr>
                <tr>
                  <td colSpan="2">
                    <h4>Total</h4>
                  </td>
                  <td>
                    <strong>{rupiahCoverter(totalOrderPrice)}</strong>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </FormGroup>
        <FormGroup className="d-flex justify-content-between">
          {/* <Button color="primary" type="submit" disabled={disabledButton}> */}
          {/* <Button color="primary" type="submit">
            Simpan
          </Button> */}
          {/* {loading ? <CircularProgress className="ml-2" /> : null} */}
          <Button
            color="danger"
            type="button"
            onClick={handleClose}
            // disabled={disabledButton}
          >
            Tutup
          </Button>
        </FormGroup>
      </Form>
    </div>
  );

  return (
    <React.Fragment>
      <div className="mt-3">
        <div className="w-100">
          <Button
            className="btn-block"
            color="primary"
            disabled={orders.length === 0 ? true : false}
            onClick={() => handleOpen()}
          >
            Proceed to checkout <NavigateNextIcon />
          </Button>
        </div>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        disableBackdropClick={true}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </React.Fragment>
  );
}

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 600,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default Checkout;
