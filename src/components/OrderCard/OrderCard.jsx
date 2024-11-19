import React from "react";
import { Button, Card, Col, Row } from "react-bootstrap";

function OrderCard() {
  return (
    <Card className="mb-3">
      <Card.Header className="d-flex justify-content-between align-items-center">
        <div className="fw-bold text-end">ORDER STATUS</div>
      </Card.Header>
      <Card.Body>
        <Row>
          <Col md={2}>
            <Card.Img
              style={{ width: "100px", height: "100px" }}
              variant="top"
              src="https://via.placeholder.com/150"
            />
          </Col>
          <Col md={7}>
            <Card.Title>Product Name</Card.Title>
            <Card.Text>Size: M</Card.Text>
          </Col>
          <Col md={3} className="text-end">
            <Card.Text>Price: $100</Card.Text>
          </Col>
        </Row>
      </Card.Body>
      <Card.Footer className="d-flex justify-content-between align-items-center">
        <div>
          <Button variant="dark" className="me-2">
            Rate
          </Button>
          <Button variant="light">Buy Again</Button>
        </div>
        <div className="text-end">
          <Card.Text className="fw-bold">Order Total: $100</Card.Text>
        </div>
      </Card.Footer>
    </Card>
  );
}

export default OrderCard;
