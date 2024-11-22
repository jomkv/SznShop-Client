import React from "react";
import { Button, Card, Col, Row } from "react-bootstrap";

function OrderCard() {
  return (
    <Card className="mt-5">
      <Card.Header className="text-end">
        <div className="fw-bold">ORDER STATUS</div>
      </Card.Header>
      <Card.Body>
        <Row>
          <Col md={2}>
            <Card.Img
              style={{ width: "100px", height: "100px" }}
              variant="top"
              src="https://image-cdn.hypb.st/https%3A%2F%2Fs3.store.hypebeast.com%2Fmedia%2Fimage%2F52%2F94%2FlongTshirt-1-1-90e40.jpg?fit=max&w=2160&q=90"
            />
          </Col>
          <Col md={7}>
            <Card.Title>PTC Basic Long Sleeve T-shirt</Card.Title>
            <Card.Text>Size: M</Card.Text>
          </Col>
          <Col md={3} className="text-end fs-4">
            <Card.Text> $100</Card.Text>
          </Col>
        </Row>
      </Card.Body>
      <Card.Footer>
        <div className="text-end">
          <Card.Text className="fw-bold">
            Order Total: <span className="fs-4">$100</span>
          </Card.Text>
        </div>
        <div className="text-end">
          <Button style={{ width: "150px" }} variant="dark" className="me-2">
            Rate
          </Button>
          <Button variant="light" style={{ width: "150px" }}>
            Buy Again
          </Button>
        </div>
      </Card.Footer>
    </Card>
  );
}

export default OrderCard;
