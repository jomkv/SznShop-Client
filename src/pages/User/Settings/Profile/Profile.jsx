import React from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  Breadcrumb,
} from "react-bootstrap";

function Profile() {
  return (
    <Container className="mt-4">
      <Card className="p-3">
        <Card.Header>
          <Card.Title className="fs-2 fw-bold">PROFILE</Card.Title>
        </Card.Header>
        <Card.Body>
          <Form className="mt-4">
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>
                    FIRST NAME<span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="First Name"
                    required
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>
                    LAST NAME<span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Form.Control type="text" placeholder="Last Name" required />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicFirstName">
                  <Form.Label>
                    USERNAME<span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Form.Control type="text" placeholder="Username" required />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicLastName">
                  <Form.Label>EMAIL</Form.Label>
                  <Form.Control type="email" placeholder="Email" />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
                  <Form.Label>
                    PHONE NUMBER<span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Phone Number"
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Card.Body>
        <Button
          variant="dark"
          className="mt-3"
          style={{ width: "200px", height: "50px" }}
        >
          SAVE CHANGES
        </Button>
      </Card>
    </Container>
  );
}

export default Profile;
