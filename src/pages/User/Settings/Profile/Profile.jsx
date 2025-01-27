import React from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();
  return (
    <Container className="mt-4">
      <Card className="p-4 shadow-lg rounded-3">
        <Card.Header className="d-flex align-items-center bg-light p-3 rounded-3">
          <Button
            onClick={() => navigate(-1)}
            variant="link"
            className="p-2 me-2 text-dark"
          >
            <i className="bi bi-chevron-left"></i>
          </Button>
          <Card.Title className="fs-3 fw-bold mb-0">Profile</Card.Title>
        </Card.Header>
        <Card.Body className="pt-4">
          <Form className="mt-4">
            <Row className="g-3">
              <Col md={6} sm={12}>
                <Form.Group controlId="formBasicFullName">
                  <Form.Label>
                    Full Name <span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Full Name"
                    required
                    className="shadow-sm"
                  />
                </Form.Group>
              </Col>
              <Col md={6} sm={12}>
                <Form.Group controlId="formBasicUsername">
                  <Form.Label>
                    Username <span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Username"
                    required
                    className="shadow-sm"
                  />
                </Form.Group>
              </Col>
              <Col md={6} sm={12}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    readOnly
                    className="shadow-sm"
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Card.Body>
        <div className="d-flex justify-content-center mb-4">
          <Button
            variant="dark"
            size="sm"
            style={{ width: "250px", height: "50px", borderRadius: "30px" }}
            className="shadow-sm"
          >
            Save Changes
          </Button>
        </div>
      </Card>
    </Container>
  );
}

export default Profile;
