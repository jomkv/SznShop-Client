import { Button, Card, Col, Row, Container } from "react-bootstrap";
import { getOrderTotal } from "../../../../utils/helper";
import { Link } from "react-router-dom";
import ActionButtons from "./ActionButtons";

function OrderCard({ order }) {
  return (
    <Container>
      <Card className="mt-4 shadow-sm border-0 rounded-3">
        <Card.Header className="text-end bg-dark text-white rounded-top">
          <span className="fw-bold fs-5">{order.status}</span>
        </Card.Header>

        <Link
          to={`/order/${order._id}`}
          className="text-decoration-none text-dark"
        >
          <Card.Body className="p-4">
            {order.orderProducts.map((op, index) => (
              <Row key={index} className="align-items-center mb-3">
                <Col md={2} className="text-center">
                  <Card.Img
                    className="rounded border"
                    style={{
                      width: "90px",
                      height: "90px",
                      objectFit: "cover",
                    }}
                    variant="top"
                    src={
                      op.productId.images[0].url ||
                      "https://via.placeholder.com/500"
                    }
                  />
                </Col>
                <Col md={7}>
                  <Card.Title className="fw-semibold text-truncate">
                    {op.name}
                  </Card.Title>
                  <Card.Text className="text-muted mb-1">
                    <strong>Size:</strong> {op.size.toUpperCase()}
                  </Card.Text>
                  <Card.Text className="text-muted">
                    <strong>Quantity:</strong> {op.quantity}
                  </Card.Text>
                </Col>
                <Col md={3} className="text-end">
                  <Card.Text className="fw-bold fs-5 text-dark">
                    ₱{(op.price * op.quantity).toLocaleString()}
                  </Card.Text>
                </Col>
              </Row>
            ))}
          </Card.Body>
        </Link>

        <Card.Footer className="bg-light border-0 rounded-bottom p-3">
          <Row className="align-items-center">
            <Col className="text-end mb-2">
              <Card.Text className="fw-bold fs-5 mb-0">
                Order Total:{" "}
                <span className="text-dark fs-4">
                  ₱{getOrderTotal(order).toLocaleString()}
                </span>
              </Card.Text>
            </Col>
          </Row>
          <Row>
            <Col className="text-end">
              <ActionButtons order={order} />
            </Col>
          </Row>
        </Card.Footer>
      </Card>
    </Container>
  );
}

export default OrderCard;
