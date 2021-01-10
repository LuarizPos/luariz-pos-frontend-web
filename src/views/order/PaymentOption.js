import React from "react";
import { Row, Col, Label, Input } from "reactstrap";

function PaymentOption() {
  return (
    <React.Fragment>
      <Row className="shadow-sm p-3 mb-1 bg-white rounded d-flex flex-row">
        <Col className="col-4 d-flex align-items-center">
          <Label>Pay using :</Label>
        </Col>
        <Col>
          <Input type="select" name="select" id="exampleSelect">
            <option>Cash</option>
          </Input>
        </Col>
      </Row>
    </React.Fragment>
  );
}

export default PaymentOption;
