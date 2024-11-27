import React from "react";
import {
  Container,
  Card,
  Row,
  Col,
  ProgressBar,
  Button,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import "./OrderHistory.css"; // Import the custom CSS file

function OrderHistory() {
  const progress = 100;
  const getIconColor = (step) => {
    return progress >= step ? "text-primary" : "text-muted";
  };

  return (
    <Container>
      <Card>
        <Card.Header>
          <Row>
            <Col>
              <Link to="/UsersOrders">
                <Button variant="light" className="back-button">
                  <i className="bi bi-chevron-left"></i> Back
                </Button>
              </Link>
            </Col>
            <Col>
              <Card.Text className="text-end">ORDER STATUS</Card.Text>
            </Col>
          </Row>
        </Card.Header>
        <Card.Body>
          <ProgressBar now={progress} className="progress-bar-custom" />
          <Row className="progress-icons">
            <Col className="text-center">
              <i className={`bi bi-clipboard2 ${getIconColor(10)}`}></i>
              <div className="fw-bold">Order Placed</div>
              <div className="small">2021-10-10</div>
            </Col>
            <Col className="text-center">
              <i className={`bi bi-cash-stack ${getIconColor(30)}`}></i>
              <div className="fw-bold">Payment Info Confirmed</div>
              <div className="small">2021-10-11</div>
            </Col>
            <Col className="text-center">
              <i className={`bi bi-truck ${getIconColor(50)}`}></i>
              <div className="fw-bold">Order Shipped Out</div>
              <div className="small">2021-10-12</div>
            </Col>
            <Col className="text-center">
              <i className={`bi bi-inbox ${getIconColor(70)}`}></i>
              <div className="fw-bold"> Order Received</div>
              <div className="small">2021-10-13</div>
            </Col>
            <Col className="text-center">
              <i className={`bi bi-star ${getIconColor(100)}`}></i>
              <div className="fw-bold">Order Completed</div>
              <div className="small">2021-10-14</div>
            </Col>
          </Row>
        </Card.Body>
        <Card.Footer>
          <Row>
            <Col>
              <Card.Text className="text-start delivery-address">
                <Card.Title className="fw-bold">Delivery Address</Card.Title>
                <Card.Text className="small">John Doe</Card.Text>
                <Card.Text className="small">Contact Number</Card.Text>
                <Card.Text className="small">Address</Card.Text>
              </Card.Text>
            </Col>
            <Col>
              <div className="text-end">
                <Button
                  style={{ width: "150px" }}
                  variant="dark"
                  className="me-2"
                >
                  Rate
                </Button>
              </div>
              <div className="text-end">
                <Button
                  variant="light"
                  style={{ width: "150px" }}
                  className="me-2 mt-2"
                >
                  Buy Again
                </Button>
              </div>
            </Col>
          </Row>
        </Card.Footer>
        <Card.Body className="mt-2">
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
              <Card.Text>Quantity: 1</Card.Text>
            </Col>
            <Col md={3} className="text-end fs-4">
              <Card.Text> $100</Card.Text>
            </Col>
          </Row>
        </Card.Body>
        <Card.Footer>
          <div className="text-end">
            <Card.Text className="fw-bold">
              <Row>
                <Col md={9}>Merchandise Subtotal</Col>
                <Col>
                  <span className="fs-4">$100</span>
                </Col>
              </Row>
            </Card.Text>
          </div>
          <div className="text-end">
            <Card.Text className="fw-bold">
              <Row>
                <Col md={9}>Shipping</Col>
                <Col>
                  <span className="fs-4">$10</span>
                </Col>
              </Row>
            </Card.Text>
          </div>
          <div className="text-end">
            <Card.Text>
              <Row>
                <Col md={9}>Order Total</Col>
                <Col>
                  <span className="fs-2">$5</span>
                </Col>
              </Row>
            </Card.Text>
          </div>
        </Card.Footer>
      </Card>
    </Container>
  );
}

export default OrderHistory;
