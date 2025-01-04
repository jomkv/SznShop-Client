import { Card, Col, Row } from "react-bootstrap";
import { getOrderTotal } from "../../../../utils/helper";
import { Link } from "react-router-dom";
import ActionButtons from "./ActionButtons";

function OrderCard({ order }) {
  return (
    <>
      <Card className="mt-3">
        <Card.Header className="text-end">
          <div className="fw-bold">{order.status}</div>
        </Card.Header>
        <Link
          to={`/order/${order._id}`}
          className="text-decoration-none"
          style={{ color: "black" }}
        >
          <Card.Body style={{ cursor: "pointer" }}>
            {order.orderProducts.map((op, index) => (
              <Row key={index}>
                <Col md={2}>
                  <Card.Img
                    style={{ width: "100px", height: "100px" }}
                    variant="top"
                    src={
                      op.productId.images[0].url ||
                      "https://via.placeholder.com/500"
                    }
                  />
                </Col>
                <Col md={7}>
                  <Card.Title>{op.name}</Card.Title>
                  <Card.Text>Size: {op.size.toUpperCase()}</Card.Text>
                </Col>
                <Col md={3} className="text-end fs-4">
                  <Card.Text>
                    ₱{(op.price * op.quantity).toLocaleString()}
                  </Card.Text>
                </Col>
              </Row>
            ))}
          </Card.Body>
        </Link>
        <Card.Footer>
          <div className="text-end">
            <Card.Text className="fw-bold">
              Order Total:{" "}
              <span className="fs-4">
                ₱{getOrderTotal(order).toLocaleString()}
              </span>
            </Card.Text>
          </div>
          <div className="text-end">
            <ActionButtons order={order} />
          </div>
        </Card.Footer>
      </Card>
    </>
  );
}

export default OrderCard;
