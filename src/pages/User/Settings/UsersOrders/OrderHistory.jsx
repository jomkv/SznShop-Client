import {
  Container,
  Card,
  Row,
  Col,
  ProgressBar,
  Button,
} from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./OrderHistory.css"; // Import the custom CSS file
import { useGetOrderQuery } from "../../../../libs/rtk/api/orderApiSlice";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Spinner from "../../../../components/Spinner/Spinner";
import { formatDate, getOrderTotal } from "../../../../utils/helper";
import ActionButtons from "./ActionButtons";

function OrderHistory() {
  const [progress, setProgress] = useState(10);
  const getIconColor = (step) => {
    return progress >= step ? "text-primary" : "text-muted";
  };

  const { id } = useParams();
  const navigate = useNavigate();

  const { data: order, isLoading, isSuccess, isError } = useGetOrderQuery(id);

  useEffect(() => {
    if (isError) {
      navigate("/UsersOrders");
      toast.warn("An error occurred, please try again later.");
    }
  }, [isError]);

  useEffect(() => {
    if (isSuccess && order) {
      let progress = 0;

      switch (order.status) {
        case "REVIEWING":
          progress = 10;
          break;
        case "SHIPPING":
          progress = 50;
          break;
        case "RECEIVED":
          progress = 70;
          break;
        case "COMPLETED":
          progress = 100;
          break;
        default:
          progress = 0;
          break;
      }

      setProgress(progress);
    }
  }, [isSuccess, order]);

  return (
    <Container>
      {isLoading && <Spinner large />}
      {isSuccess && (
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
                <Card.Text className="text-end">{order.status}</Card.Text>
              </Col>
            </Row>
          </Card.Header>
          <Card.Body>
            <ProgressBar now={progress} className="progress-bar-custom" />
            <Row className="progress-icons">
              <Col className="text-center">
                <i className={`bi bi-clipboard2 ${getIconColor(10)}`}></i>
                <div className="fw-bold">Order Placed</div>
                <div className="small">{formatDate(order.createdAt)}</div>
              </Col>
              <Col className="text-center">
                <i className={`bi bi-cash-stack ${getIconColor(30)}`}></i>
                <div className="fw-bold">Order Approved</div>
                {order.timestamps?.shippedAt && (
                  <div className="small">
                    {formatDate(order.timestamps.shippedAt)}
                  </div>
                )}
              </Col>
              <Col className="text-center">
                <i className={`bi bi-truck ${getIconColor(50)}`}></i>
                <div className="fw-bold">Order Shipped Out</div>
                {order.timestamps?.shippedAt && (
                  <div className="small">
                    {formatDate(order.timestamps.shippedAt)}
                  </div>
                )}
              </Col>
              <Col className="text-center">
                <i className={`bi bi-inbox ${getIconColor(70)}`}></i>
                <div className="fw-bold"> Order Received</div>
                {order.timestamps?.receivedAt && (
                  <div className="small">
                    {formatDate(order.timestamps.shippedAt)}
                  </div>
                )}
              </Col>
              <Col className="text-center">
                <i className={`bi bi-star ${getIconColor(100)}`}></i>
                <div className="fw-bold">Order Completed</div>
                {order.timestamps?.completedAt && (
                  <div className="small">
                    {formatDate(order.timestamps.completedAt)}
                  </div>
                )}
              </Col>
            </Row>
          </Card.Body>
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
                  <Card.Text className="small">
                    {order.address.address}
                  </Card.Text>
                </Card.Text>
              </Col>
              <Col>
                <div className="d-flex flex-column align-items-end">
                  <ActionButtons order={order} />
                </div>
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
                  <Card.Text>
                    Quantity: {op.quantity.toLocaleString()}
                  </Card.Text>
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
        </Card>
      )}
    </Container>
  );
}

export default OrderHistory;
