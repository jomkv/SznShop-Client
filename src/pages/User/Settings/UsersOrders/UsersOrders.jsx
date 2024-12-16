import { useEffect, useState } from "react";
import { Container, Row, Col, Tab, Nav, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import OrderCard from "../../../../components/OrderCard/OrderCard";
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
    return (
      <div>
        <Link to="/OrderHistory" style={{ textDecoration: "none" }}>
          {orders.map((order, index) => (
            <OrderCard order={order} key={index} />
          ))}
        </Link>
      </div>
    );
  };

  return (
    <Container style={{ marginTop: "20px" }}>
      <Row className="justify-content-center">
        <Col md={10}>
          <Card>
            <Card.Header>
              <h4>Order History</h4>
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
                      <Nav.Link eventKey="toShip">To Ship</Nav.Link>
                    </Nav.Item>
                  </Col>
                  <Col>
                    <Nav.Item>
                      <Nav.Link eventKey="toReceive">To Receive</Nav.Link>
                    </Nav.Item>
                  </Col>
                  <Col>
                    <Nav.Item>
                      <Nav.Link eventKey="complete">Complete</Nav.Link>
                    </Nav.Item>
                  </Col>
                  <Col>
                    <Nav.Item>
                      <Nav.Link eventKey="cancelled">Cancelled</Nav.Link>
                    </Nav.Item>
                  </Col>
                  <Col>
                    <Nav.Item>
                      <Nav.Link eventKey="returnRefund">Return/Refund</Nav.Link>
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
                      {/* <Tab.Pane eventKey="toShip">
                        {renderOrdersTable("To Ship")}
                      </Tab.Pane>
                      <Tab.Pane eventKey="toReceive">
                        {renderOrdersTable("To Receive")}
                      </Tab.Pane>
                      <Tab.Pane eventKey="complete">
                        {renderOrdersTable("Complete")}
                      </Tab.Pane>
                      <Tab.Pane eventKey="cancelled">
                        {renderOrdersTable("Cancelled")}
                      </Tab.Pane>
                      <Tab.Pane eventKey="returnRefund">
                        {renderOrdersTable("Return/Refund")}
                      </Tab.Pane> */}
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
