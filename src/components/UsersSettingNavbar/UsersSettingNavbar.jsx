import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card, Container } from "react-bootstrap";

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
      <Link
        to="/profile"
        className="sidebar-link"
        onClick={() => setSelectedTab("profile")}
        style={{ margin: "0 10px" }}
      >
        <Card
          className={`mb-2 ${selectedTab === "profile" ? "active" : ""}`}
          style={{ width: "300px" }}
        >
          <Card.Body className="d-flex align-items-center">
            <i className="bi bi-person me-3" style={{ fontSize: "2rem" }}></i>
            <div style={{ textAlign: "center", flex: 1 }}>
              <Card.Title className="fw-bold">PROFILE</Card.Title>
              <Card.Text style={{ fontSize: "0.8rem" }}>
                Manage your personal information
              </Card.Text>
            </div>
          </Card.Body>
        </Card>
      </Link>

      <Link
        to="/address"
        className="sidebar-link"
        onClick={() => setSelectedTab("address")}
        style={{ margin: "0 10px" }}
      >
        <Card
          className={`mb-2 ${selectedTab === "address" ? "active" : ""}`}
          style={{ width: "300px" }}
        >
          <Card.Body className="d-flex align-items-center">
            <i className="bi bi-house me-3" style={{ fontSize: "2rem" }}></i>
            <div style={{ textAlign: "center", flex: 1 }}>
              <Card.Title className="fw-bold">ADDRESS</Card.Title>
              <Card.Text style={{ fontSize: "0.8rem" }}>
                Update your address details
              </Card.Text>
            </div>
          </Card.Body>
        </Card>
      </Link>

      <Link
        to="/usersorders"
        className="sidebar-link"
        onClick={() => setSelectedTab("orders")}
        style={{ margin: "0 10px" }}
      >
        <Card
          className={`mb-2 ${selectedTab === "orders" ? "active" : ""}`}
          style={{ width: "300px" }}
        >
          <Card.Body className="d-flex align-items-center">
            <i className="bi bi-basket3 me-3" style={{ fontSize: "2rem" }}></i>
            <div style={{ textAlign: "center", flex: 1 }}>
              <Card.Title className="fw-bold">ORDERS</Card.Title>
              <Card.Text style={{ fontSize: "0.8rem" }}>
                View your order history
              </Card.Text>
            </div>
          </Card.Body>
        </Card>
      </Link>
    </Container>
  );
}

export default UsersSettingsNavbar;
