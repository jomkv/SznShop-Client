import React from "react";
import { Container, Row, Col } from "react-bootstrap";

function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "white",
        padding: "20px 0",
        marginTop: "30px",
        borderTop: "2px solid #dee2e6", // Add a border-top
      }}
    >
      <Container>
        <Row>
          {/* About Us Section */}
          <Col xs={12} md={4}>
            <h5 className="fw-bold">About Us</h5>
            <p style={{ fontSize: "0.9rem", lineHeight: "1.6" }}>
              SZN is more than a brand—it's a canvas for creativity. Since 2020,
              we've been crafting quality products that inspire and add value to
              everyday life. Built on honesty and passion, SZN connects with a
              community that values originality and self-expression. Together,
              let’s keep creating something extraordinary.
            </p>
          </Col>

          {/* Quick Links Section */}
          <Col xs={12} md={4}>
            <h5 className="fw-bold">Quick Links</h5>
            <ul
              style={{
                listStyleType: "none",
                padding: 0,
                fontSize: "0.9rem",
              }}
            >
              <li>
                <a
                  href="/home"
                  style={{
                    color: "black",
                    textDecoration: "none",
                  }}
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/profile"
                  style={{
                    color: "black",
                    textDecoration: "none",
                  }}
                >
                  Profile
                </a>
              </li>
              <li>
                <a
                  href="/address"
                  style={{
                    color: "black",
                    textDecoration: "none",
                  }}
                >
                  Address
                </a>
              </li>
              <li>
                <a
                  href="/orders"
                  style={{
                    color: "black",
                    textDecoration: "none",
                  }}
                >
                  Orders
                </a>
              </li>
            </ul>
          </Col>

          {/* Contact Us Section */}
          <Col xs={12} md={4}>
            <h5 className="fw-bold">Contact Us</h5>
            <p style={{ fontSize: "0.9rem", lineHeight: "1.6" }}>
              Email: szn2020szn@gmail.com
              <br />
              Phone: +639 4935 42200
            </p>
            <div>
              <a
                href="https://www.facebook.com/szn2020szn"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "black" }}
              >
                <i
                  className="bi bi-facebook"
                  style={{
                    fontSize: "1.5rem",
                    marginRight: "10px",
                  }}
                ></i>
              </a>
              <a
                href="https://x.com/szn2020szn"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "black" }}
              >
                <i
                  className="bi bi-twitter"
                  style={{
                    fontSize: "1.5rem",
                    marginRight: "10px",
                  }}
                ></i>
              </a>
              <a
                href="https://www.instagram.com/sznworldsfinest/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "black" }}
              >
                <i
                  className="bi bi-instagram"
                  style={{
                    fontSize: "1.5rem",
                    marginRight: "10px",
                  }}
                ></i>
              </a>
            </div>
          </Col>
        </Row>

        {/* Copyright Section */}
        <Row>
          <Col className="text-center mt-3">
            <p style={{ fontSize: "0.8rem", color: "#6c757d", margin: 0 }}>
              &copy; {new Date().getFullYear()} SZN. All rights reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
