import React from "react";
import { Container, Row, Col } from "react-bootstrap";

function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#f8f9fa",
        padding: "20px 0",
        marginTop: "30px",
      }}
    >
      <Container>
        <Row>
          <Col md={4}>
            <h5>About Us</h5>
            <p>
              We are a company dedicated to providing the best products and
              services to our customers.
            </p>
          </Col>
          <Col md={4}>
            <h5>Quick Links</h5>
            <ul style={{ listStyleType: "none", padding: 0 }}>
              <li>
                <a href="/home" style={{ color: "black" }}>
                  Home
                </a>
              </li>
              <li>
                <a href="/profile" style={{ color: "black" }}>
                  Profile
                </a>
              </li>
              <li>
                <a href="/address" style={{ color: "black" }}>
                  Address
                </a>
              </li>
              <li>
                <a href="/orders" style={{ color: "black" }}>
                  Orders
                </a>
              </li>
            </ul>
          </Col>
          <Col md={4}>
            <h5>Contact Us</h5>
            <p>
              Email: info@example.com
              <br />
              Phone: +123 456 7890
            </p>
            <div>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "black" }}
              >
                <i
                  className="bi bi-facebook"
                  style={{ fontSize: "1.5rem", marginRight: "10px" }}
                ></i>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "black" }}
              >
                <i
                  className="bi bi-twitter"
                  style={{ fontSize: "1.5rem", marginRight: "10px" }}
                ></i>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "black" }}
              >
                <i
                  className="bi bi-instagram"
                  style={{ fontSize: "1.5rem", marginRight: "10px" }}
                ></i>
              </a>
            </div>
          </Col>
        </Row>
        <Row>
          <Col className="text-center mt-3">
            <p>
              &copy; {new Date().getFullYear()} Your Company. All rights
              reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
