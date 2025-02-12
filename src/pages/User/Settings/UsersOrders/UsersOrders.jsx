import { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Tab,
  Nav,
  Card,
  Alert,
  Button,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import OrderCard from "./OrderCard";
import { useGetMyOrdersQuery } from "../../../../libs/rtk/api/orderApiSlice";
import { toast } from "react-toastify";
import Spinner from "../../../../components/Spinner/Spinner";

function UsersOrders() {
  const [key, setKey] = useState("all");
  const { data: orders, isLoading, isSuccess, isError } = useGetMyOrdersQuery();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      toast.warn("Something went wrong, please try again later.");
      navigate("/");
    }
  }, [isError, navigate]);

  const renderOrdersTable = (orders) => {
    if (!orders || orders.length === 0) {
      return (
        <Alert variant="dark" className="text-center">
          No orders available for this status.
        </Alert>
      );
    }
    return (
      <div>
        {orders.map((order, index) => (
          <OrderCard order={order} key={index} />
        ))}
      </div>
    );
  };

  return (
    <Container style={{ marginTop: "20px" }}>
      <Row className="justify-content-center">
        <Col md={10}>
          <Card>
            <Card.Header>
              <Card.Title className="fw-bold fs-3">
                {" "}
                <Link to="/settings">
                  <Button variant="link" className="me-2 text-dark">
                    <i className="bi bi-chevron-left"></i>
                  </Button>
                </Link>
                Order History
              </Card.Title>
            </Card.Header>
            <Card.Body>
              <Tab.Container activeKey={key} onSelect={(k) => setKey(k)}>
                <Nav variant="pills" className="mb-3 text-center">
                  <Col>
                    <Nav.Item>
                      <Nav.Link eventKey="all">All</Nav.Link>
                    </Nav.Item>
                  </Col>
                  <Col>
                    <Nav.Item>
                      <Nav.Link eventKey="InReview">In Review</Nav.Link>
                    </Nav.Item>
                  </Col>
                  <Col>
                    <Nav.Item>
                      <Nav.Link eventKey="toShip">Shipping</Nav.Link>
                    </Nav.Item>
                  </Col>
                  <Col>
                    <Nav.Item>
                      <Nav.Link eventKey="toReceive">Received</Nav.Link>
                    </Nav.Item>
                  </Col>
                  <Col>
                    <Nav.Item>
                      <Nav.Link eventKey="complete">Completed</Nav.Link>
                    </Nav.Item>
                  </Col>
                  <Col>
                    <Nav.Item>
                      <Nav.Link eventKey="cancelled">Cancelled</Nav.Link>
                    </Nav.Item>
                  </Col>
                  <Col>
                    <Nav.Item>
                      <Nav.Link eventKey="returnRefund">Return</Nav.Link>
                    </Nav.Item>
                  </Col>
                </Nav>
                <Tab.Content>
                  {isLoading && <Spinner large />}
                  {isSuccess && (
                    <>
                      <Tab.Pane eventKey="all">
                        {renderOrdersTable(orders.all)}
                      </Tab.Pane>
                      <Tab.Pane eventKey="InReview">
                        {renderOrdersTable(orders.reviewing)}
                      </Tab.Pane>
                      <Tab.Pane eventKey="toShip">
                        {renderOrdersTable(orders.shipping)}
                      </Tab.Pane>
                      <Tab.Pane eventKey="toReceive">
                        {renderOrdersTable(orders.received)}
                      </Tab.Pane>
                      <Tab.Pane eventKey="complete">
                        {renderOrdersTable(orders.completed)}
                      </Tab.Pane>
                      <Tab.Pane eventKey="cancelled">
                        {renderOrdersTable(orders.cancelled)}
                      </Tab.Pane>
                      <Tab.Pane eventKey="returnRefund">
                        {renderOrdersTable([
                          ...orders.returned,
                          ...orders.refunded,
                        ])}
                      </Tab.Pane>
                    </>
                  )}
                </Tab.Content>
              </Tab.Container>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default UsersOrders;
