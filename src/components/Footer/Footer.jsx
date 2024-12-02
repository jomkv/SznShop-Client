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
            SZN is more than a brand—it's a canvas for creativity. Since 2020, we've been crafting quality products that inspire and add value to everyday life. Built on honesty and passion, SZN connects with a community that values originality and self-expression. Together, let’s keep creating something extraordinary.
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
                  style={{ fontSize: "1.5rem", marginRight: "10px" }}
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
                  style={{ fontSize: "1.5rem", marginRight: "10px" }}
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
