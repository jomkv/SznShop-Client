import React from "react";
import { Container, Form, Button, Row, Col, Card } from "react-bootstrap";

function FAQ() {
  return (
    <Container>
      <div style={{ backgroundColor: "black" }} className="p-5">
        <div
          className="text-center fw-bold"
          style={{ color: "white", fontSize: "2.5rem" }}
        >
          HELLO, HOW CAN WE HELP YOU?
        </div>
        <div className="d-flex justify-content-center my-3">
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              style={{ width: "500px" }}
            />
            <Button variant="dark">
              <i className="bi bi-search"></i>
            </Button>
          </Form>
        </div>
      </div>
      <Row className="mt-4 text-center">
        <Col md={4}>
          <Card>
            <Card.Body>
              <i className="bi bi-person-circle fs-1"></i>
              <Card.Title>Account</Card.Title>
              <Card.Text>
                Manage your account settings, change your password, and update
                your personal information.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <i className="bi bi-box fs-1"></i>
              <Card.Title>Order</Card.Title>
              <Card.Text>
                Track your orders, view order history, and manage your order
                preferences.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <i className="bi bi-credit-card fs-1"></i>
              <Card.Title>Payment</Card.Title>
              <Card.Text>
                Learn about payment methods, billing issues, and how to update
                your payment information.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="mt-4 text-center">
        <Col md={4}>
          <Card>
            <Card.Body>
              <i className="bi bi-truck fs-1"></i>
              <Card.Title>Delivery and Shipping</Card.Title>
              <Card.Text>
                Find out about shipping options, delivery times, and how to
                track your shipment.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <i className="bi bi-chat-left fs-1"></i>
              <Card.Title>Return and Exchange</Card.Title>
              <Card.Text>
                Learn about our return policy, how to return or exchange items,
                and get help with returns.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default FAQ;
