import React from "react";
import {
  Card,
  CardTitle,
  CardText,
  CardImg,
  Col,
  Row,
  CardImgOverlay,
} from "reactstrap";
import data from "../../static_data/productData.json";

function OrderingProduct() {
  return (
    <Row
      style={{
        height: "60vh",
        overflow: "scroll",
        textShadow:
          "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000",
      }}
    >
      {data.map((obj) => {
        // obj.price = Helpers.convertToRupiah(obj.price);
        return (
          <Col md="4" sm="4" xs="4" className="pt-0 pb-3" key={obj.id}>
            <Card
              inverse
              key={obj.key}
              id={obj.id}
              className="shadow mb-5 bg-white rounded border border-dark"
            >
              <CardImg
                width="100%"
                src={obj.image}
                alt={obj.title}
                style={{ objectFit: "cover", filter: "blur(3px)" }}
              />
              <CardImgOverlay>
                <CardTitle tag="h5">{obj.title}</CardTitle>
                <CardText>{obj.description}</CardText>
                <CardText>
                  <small className="text-white">{obj.price}</small>
                </CardText>
              </CardImgOverlay>
            </Card>
          </Col>

          // <Col md="4" sm="4" xs="4" className="pt-0 pb-3" key={obj.id}>
          //   <Card key={obj.key} id={obj.id}>
          //     <CardImg
          //       top
          //       src={obj.image}
          //       style={{ objectFit: "cover", width: "100%" }}
          //       alt="Card image cap"
          //     />
          //     <CardBody>
          //       <CardTitle tag="h5">{obj.title}</CardTitle>
          //       <CardText>{obj.description}</CardText>
          //     </CardBody>
          //     <CardFooter>{obj.price}</CardFooter>
          //   </Card>
          // </Col>
        );
      })}
    </Row>
  );
}

export default OrderingProduct;
