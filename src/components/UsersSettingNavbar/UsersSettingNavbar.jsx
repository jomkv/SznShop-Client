import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card, Container, Row, Col } from "react-bootstrap";

function UsersSettingsNavbar() {
  const [selectedTab, setSelectedTab] = useState("profile");

  return (
    <Container
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Row>
        <Col>
          <Link
            to="/profile"
            className="sidebar-link"
            onClick={() => setSelectedTab("profile")}
            style={{ margin: "0 10px" }}
          >
            <Card
              className={`mb-2 ${selectedTab === "profile" ? "active" : ""}`}
              style={{ width: "100%", maxwidth: "300px", height: "150px" }}
            >
              <Card.Body className="d-flex align-items-center">
                <i
                  className="bi bi-person-circle me-3"
                  style={{ fontSize: "2.5rem" }}
                ></i>
                <div style={{ flex: 1 }}>
                  <Card.Title className="fw-bold">PROFILE</Card.Title>
                  <Card.Text style={{ fontSize: "0.9rem" }}>
                    View and update your name, phone number, and other profile.
                    details
                  </Card.Text>
                </div>
              </Card.Body>
            </Card>
          </Link>
        </Col>
        <Col>
          <Link
            to="/address"
            className="sidebar-link"
            onClick={() => setSelectedTab("address")}
            style={{ margin: "0 10px" }}
          >
            <Card
              className={`mb-2 ${selectedTab === "address" ? "active" : ""}`}
              style={{ width: "100%", maxwidth: "300px", height: "150px" }}
            >
              <Card.Body className="d-flex align-items-center mb-3">
                <i
                  className="bi bi-house me-3 mt-3"
                  style={{ fontSize: "2.5rem" }}
                ></i>
                <div style={{ flex: 1 }}>
                  <Card.Title className="fw-bold">ADDRESS</Card.Title>
                  <Card.Text style={{ fontSize: "0.9rem" }}>
                    Save, edit, remove or set default address on your account.
                  </Card.Text>
                </div>
              </Card.Body>
            </Card>
          </Link>
        </Col>
        <Col>
          <Link
            to="/usersorders"
            className="sidebar-link"
            onClick={() => setSelectedTab("orders")}
            style={{ margin: "0 10px" }}
          >
            <Card
              className={`mb-2 ${selectedTab === "orders" ? "active" : ""}`}
              style={{ width: "100%", maxwidth: "300px", height: "150px" }}
            >
              <Card.Body className="d-flex align-items-center">
                <i
                  className="bi bi-basket3 me-3"
                  style={{ fontSize: "2.5rem" }}
                ></i>
                <div style={{ flex: 1 }}>
                  <Card.Title className="fw-bold">ORDERS</Card.Title>
                  <Card.Text style={{ fontSize: "0.9rem" }}>
                    View current and past orders, track your current order or
                    file for a return.
                  </Card.Text>
                </div>
              </Card.Body>
            </Card>
          </Link>
        </Col>
      </Row>
    </Container>
  );
}

export default UsersSettingsNavbar;
