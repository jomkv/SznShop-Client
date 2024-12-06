import React from "react";
import ProductFilter from "../../../components/ProductFilter/ProductFilter";
import { Container, Row, Col } from "react-bootstrap";

function CategoryPage() {
  return (
    <Container fluid>
      <Row>
        <Col>
          <ProductFilter />
        </Col>
      </Row>
    </Container>
  );
}

export default CategoryPage;
