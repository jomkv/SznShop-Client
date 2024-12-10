import React from "react";
import ProductFilter from "../../../components/ProductFilter/ProductFilter";
import { Container, Row, Col, Card } from "react-bootstrap";

function CategoryPage() {
  return (
    <Container fluid>
      <div className="fs-2 fw-bold">Category Name</div>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit porro
        earum enim atque veniam illo veritatis totam animi possimus, minima
        inventore expedita illum id delectus voluptatibus dicta recusandae
        dignissimos aspernatur!
      </p>
      <Row className="mt-3">
        <Col lg={2} md={3} sm={3}>
          <ProductFilter />
        </Col>
        <Col>
          <Card className="w-100">
            <Card.Img
              variant="top"
              style={{ height: "24rem", objectFit: "cover" }}
              src="https://via.placeholder.com/500"
            />
            <Card.Body className="text-center d-flex flex-column justify-content-center align-items-center">
              <p>Product name</p>
              <p>Product Description</p>
              <p>Product Price</p>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className="w-100">
            <Card.Img
              variant="top"
              style={{ height: "24rem", objectFit: "cover" }}
              src="https://via.placeholder.com/500"
            />
            <Card.Body className="text-center d-flex flex-column justify-content-center align-items-center">
              <p>Product name</p>
              <p>Product Description</p>
              <p>Product Price</p>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className="w-100">
            <Card.Img
              variant="top"
              style={{ height: "24rem", objectFit: "cover" }}
              src="https://via.placeholder.com/500"
            />
            <Card.Body className="text-center d-flex flex-column justify-content-center align-items-center">
              <p>Product name</p>
              <p>Product Description</p>
              <p>Product Price</p>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className="w-100">
            <Card.Img
              variant="top"
              style={{ height: "24rem", objectFit: "cover" }}
              src="https://via.placeholder.com/500"
            />
            <Card.Body className="text-center d-flex flex-column justify-content-center align-items-center">
              <p>Product name</p>
              <p>Product Description</p>
              <p>Product Price</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default CategoryPage;
