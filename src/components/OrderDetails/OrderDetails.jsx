import { Card, Col, Row } from "react-bootstrap";
import { getOrderTotal } from "../../utils/helper";
import ActionButtons from "../../pages/User/Settings/UsersOrders/ActionButtons";

function OrderDetails({ order, showActions }) {
  console.log(order);
  return (
    <Card className="shadow-sm rounded-4 overflow-hidden">
      <Card.Footer className="bg-light">
        <Row className="g-3 align-items-center">
          <Col xs={12} md={6}>
            <Card.Text className="text-start delivery-address">
              <Card.Title className="fw-bold text-primary">
                Delivery Address
              </Card.Title>
              <Card.Text className="small mb-1">
                {order.address.firstName} {order.address.lastName}
              </Card.Text>
              <Card.Text className="small mb-1">
                {order.address.phoneNumber}
              </Card.Text>
              <Card.Text className="small">
                {order.address.address} {order.address.municipality},
                {order.address.province}
              </Card.Text>
              <Card.Text className="small">
                {" "}
                {order.address.postalCode}
                <Card.Text className="small">{order.address.region}</Card.Text>
              </Card.Text>
            </Card.Text>
          </Col>
          {showActions && (
            <Col xs={12} md={6} className="text-md-end">
              <ActionButtons order={order} />
            </Col>
          )}
        </Row>
      </Card.Footer>
      <Card.Body className="mt-2">
        {order.orderProducts.map((op, index) => (
          <Row key={index} className="align-items-center py-2 border-bottom">
            <Col xs={4} md={2} className="text-center">
              <Card.Img
                className="img-fluid rounded"
                style={{ maxWidth: "100px", maxHeight: "100px" }}
                src={op.productId.images[0].url}
              />
            </Col>
            <Col xs={8} md={7}>
              <Card.Title className="mb-1 text-truncate fw-bold">
                {op.name}
              </Card.Title>
              <Card.Text className="small">
                Size: {op.size.toUpperCase()}
              </Card.Text>
              <Card.Text className="small">
                Quantity: {op.quantity.toLocaleString()}
              </Card.Text>
            </Col>
            <Col
              xs={12}
              md={3}
              className="text-md-end fs-5 fw-bold text-primary"
            >
              ₱{(op.price * op.quantity).toLocaleString()}
            </Col>
          </Row>
        ))}
      </Card.Body>
      <Card.Footer className="bg-light">
        <div className="text-end">
          <Card.Text className="fw-bold">
            <Row>
              <Col xs={8}>Merchandise Subtotal</Col>
              <Col className="fs-5">
                ₱{getOrderTotal(order, true).toLocaleString()}
              </Col>
            </Row>
          </Card.Text>
        </div>
        <div className="text-end">
          <Card.Text className="fw-bold">
            <Row>
              <Col xs={8}>Shipping</Col>
              <Col className="fs-5">₱{order.shippingFee}</Col>
            </Row>
          </Card.Text>
        </div>
        <div className="text-end">
          <Card.Text className="fw-bold text-success">
            <Row>
              <Col xs={8}>Order Total</Col>
              <Col className="fs-3">
                ₱{getOrderTotal(order).toLocaleString()}
              </Col>
            </Row>
          </Card.Text>
        </div>
      </Card.Footer>
    </Card>
  );
}

export default OrderDetails;
