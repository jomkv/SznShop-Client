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
import { formatDate } from "../../../../utils/helper";
import OrderDetails from "../../../../components/OrderDetails/OrderDetails";

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
    <Container className="mt-3">
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
                    {formatDate(order.timestamps.receivedAt)}
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
          <OrderDetails order={order} showActions={true} />
        </Card>
      )}
    </Container>
  );
}

export default OrderHistory;
