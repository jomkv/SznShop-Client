import { Card, Button } from "react-bootstrap";

function OrderSummary({ isCart, total }) {
  return (
    <Card style={{ width: "100%" }} className="mt-4">
      <Card.Body>
        <Card.Header className="fw-bold text-center fs-5">
          <Card.Title>ORDER SUMMARY</Card.Title>
        </Card.Header>
        <Card.Text>
          {!isCart && (
            <>
              <div className="d-flex justify-content-between mt-3">
                <span>SUBTOTAL</span>
                <span>$10000</span>
              </div>
              <div className="d-flex justify-content-between">
                <span>SHIPPING FEE</span>
                <span>$10.00</span>
              </div>
            </>
          )}

          <div
            className={`d-flex justify-content-between ${
              isCart ? "mt-3" : "mt-5"
            }`}
          >
            <span className="fs-5 fw-bold">ORDER TOTAL</span>
            <span>₱{total}</span>
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
