import React from "react";
import { Card, Button } from "react-bootstrap";

function OrderSummary() {
  return (
    <Card style={{ width: "100%" }} className="mt-4">
      <Card.Body>
        <Card.Header className="fw-bold text-center fs-5">
          <Card.Title>ORDER SUMMARY</Card.Title>
        </Card.Header>
        <Card.Text>
          <div className="d-flex justify-content-between mt-3">
            <span>SUBTOTAL</span>
            <span>$10000</span>
          </div>
          <div className="d-flex justify-content-between">
            <span>SHIPPING FEE</span>
            <span>$10.00</span>
          </div>
          <div className="d-flex justify-content-between mt-5">
            <span className="fs-5 fw-bold">ORDER TOTAL</span>
            <span>$100000</span>
          </div>
        </Card.Text>
      </Card.Body>
      <Card.Footer className="text-center">
        <Button className="w-100" variant="dark">
          Checkout
        </Button>
      </Card.Footer>
    </Card>
  );
}

export default OrderSummary;
