import React from "react";
import { Button, Card, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

function Address() {
  return (
    <Container
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="fw-bold fs-3">ADD ADDRESS</div>
      <p>Manage your shipping addresses for a faster checkout.</p>
      <Link to="/addnewaddress" className="text-decoration-none">
        <Button
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "200px",
            height: "200px",
            padding: "10px",
            marginTop: "20px",
          }}
          variant="light"
          className="text-decoration-none"
        >
          <i className="bi bi-plus-lg" style={{ fontSize: "2rem" }}></i>
          <span style={{ marginTop: "10px" }}>CREATE A NEW ADDRESS</span>
        </Button>
      </Link>
    </Container>
  );
}

export default Address;
