import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function UsersSettingsNavbar() {
  const [selectedTab, setSelectedTab] = useState("profile");

  return (
    <Container
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "250px",
      }}
    >
      <Link
        to="/profile"
        className="sidebar-link"
        onClick={() => setSelectedTab("profile")}
        style={{ margin: "0 10px" }}
      >
        <Card className={`mb-2 ${selectedTab === "profile" ? "active" : ""}`}>
          <Card.Body className="d-flex align-items-center">
            <i className="bi bi-person me-3"></i>
            <span>Profile</span>
          </Card.Body>
        </Card>
      </Link>

      <Link
        to="/address"
        className="sidebar-link"
        onClick={() => setSelectedTab("address")}
        style={{ margin: "0 10px" }}
      >
        <Card className={`mb-2 ${selectedTab === "address" ? "active" : ""}`}>
          <Card.Body className="d-flex align-items-center">
            <i className="bi bi-house me-3"></i>
            <span>Address</span>
          </Card.Body>
        </Card>
      </Link>

      <Link
        to="/usersorders"
        className="sidebar-link"
        onClick={() => setSelectedTab("orders")}
        style={{ margin: "0 10px" }}
      >
        <Card className={`mb-2 ${selectedTab === "orders" ? "active" : ""}`}>
          <Card.Body className="d-flex align-items-center">
            <i className="bi bi-basket3 me-3"></i>
            <span>Orders</span>
          </Card.Body>
        </Card>
      </Link>
    </Container>
  );
}

export default UsersSettingsNavbar;
