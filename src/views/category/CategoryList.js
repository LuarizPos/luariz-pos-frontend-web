import React from "react";
import { Col, ListGroup, ListGroupItem, Row } from "reactstrap";
import CreateIcon from "@material-ui/icons/Create";
import DeleteIcon from "@material-ui/icons/Delete";
import { Button } from "reactstrap";

function CategoryList() {
  return (
    <div
      style={{
        height: "70vh",
        overflow: "scroll",
      }}
    >
      <ListGroup>
        <ListGroupItem className="shadow-sm p-3 mb-3 bg-white rounded">
          <Row>
            <Col className="text-left">
              <label className="d-block font-weight-bold">Makanan</label>
              <small>4 Products</small>
            </Col>
            <Col className="text-right align-self-center">
              <Button className="border bg-warning rounded-circle m-2">
                <CreateIcon />
              </Button>
              <Button className="border bg-danger rounded-circle m-2">
                <DeleteIcon />
              </Button>
            </Col>
          </Row>
        </ListGroupItem>
        <ListGroupItem className="shadow-sm p-3 mb-3 bg-white rounded">
          <Row>
            <Col className="text-left">
              <label className="d-block font-weight-bold">Minuman</label>
              <small>6 Products</small>
            </Col>
            <Col className="text-right align-self-center">
              <Button className="border bg-warning rounded-circle m-2">
                <CreateIcon />
              </Button>
              <Button className="border bg-danger rounded-circle m-2">
                <DeleteIcon />
              </Button>
            </Col>
          </Row>
        </ListGroupItem>
      </ListGroup>
    </div>
  );
}

export default CategoryList;
