import { useState } from "react";
import { Container, Row, Col, Tab, Nav, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import OrderCard from "../../../../components/OrderCard/OrderCard";

function UsersOrders() {
  const [key, setKey] = useState("all");

  const renderOrdersTable = () => (
    <div>
      <Link to="/OrderHistory" style={{ textDecoration: "none" }}>
        <OrderCard />
      </Link>
    </div>
  );

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
                      <Nav.Link eventKey="toPay">To Pay</Nav.Link>
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
                  <Tab.Pane eventKey="all">{renderOrdersTable("all")}</Tab.Pane>
                  <Tab.Pane eventKey="toPay">
                    {renderOrdersTable("To Pay")}
                  </Tab.Pane>
                  <Tab.Pane eventKey="toShip">
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
                  </Tab.Pane>
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
