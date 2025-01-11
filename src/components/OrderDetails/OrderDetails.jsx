import { Card, Col, Row } from "react-bootstrap";
import { getOrderTotal } from "../../utils/helper";
import ActionButtons from "../../pages/User/Settings/UsersOrders/ActionButtons";

function OrderDetails({ order, showActions }) {
  return (
    <>
      <Card.Footer>
        <Row>
          <Col>
            <Card.Text className="text-start delivery-address">
              <Card.Title className="fw-bold">Delivery Address</Card.Title>
              <Card.Text className="small">
                {order.address.firstName} {order.address.lastName}
              </Card.Text>
              <Card.Text className="small">
                {order.address.phoneNumber}
              </Card.Text>
              <Card.Text className="small">{order.address.address}</Card.Text>
            </Card.Text>
          </Col>
          <Col>
            {showActions && (
              <div className="d-flex flex-column align-items-end">
                <ActionButtons order={order} />
              </div>
            )}
          </Col>
        </Row>
      </Card.Footer>
      <Card.Body className="mt-2">
        {order.orderProducts.map((op, index) => (
          <Row key={index}>
            <Col md={2}>
              <Card.Img
                style={{ width: "100px", height: "100px" }}
                variant="top"
                src={op.productId.images[0].url}
              />
            </Col>
            <Col md={7}>
              <Card.Title>{op.name}</Card.Title>
              <Card.Text>Size: {op.size.toUpperCase()}</Card.Text>
              <Card.Text>Quantity: {op.quantity.toLocaleString()}</Card.Text>
            </Col>
            <Col md={3} className="text-end fs-4">
              <Card.Text>
                ₱{(op.price * op.quantity).toLocaleString()}
              </Card.Text>
            </Col>
          </Row>
        ))}
      </Card.Body>
      <Card.Footer>
        <div className="text-end">
          <Card.Text className="fw-bold">
            <Row>
              <Col md={9}>Merchandise Subtotal</Col>
              <Col>
                <span className="fs-4">
                  ₱{getOrderTotal(order, true).toLocaleString()}
                </span>
              </Col>
            </Row>
          </Card.Text>
        </div>
        <div className="text-end">
          <Card.Text className="fw-bold">
            <Row>
              <Col md={9}>Shipping</Col>
              <Col>
                <span className="fs-4">₱{order.shippingFee}</span>
              </Col>
            </Row>
          </Card.Text>
        </div>
        <div className="text-end">
          <Card.Text>
            <Row>
              <Col md={9}>Order Total</Col>
              <Col>
                <span className="fs-2">
                  ₱{getOrderTotal(order).toLocaleString()}
                </span>
              </Col>
            </Row>
          </Card.Text>
        </div>
      </Card.Footer>
    </>
  );
}

export default OrderDetails;
