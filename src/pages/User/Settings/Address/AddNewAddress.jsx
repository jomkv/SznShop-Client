import React from "react";
import { Container, Button, Col, Form, Row, Card } from "react-bootstrap";

function AddNewAddress() {
  return (
    <Container
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card style={{ width: "100%", maxWidth: "600px" }}>
        <Card.Header>
          <div className="fw-bold fs-2">CREATE A NEW ADDRESS</div>
        </Card.Header>
        <Card.Body>
          <Form className="mt-3">
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>FIRST NAME</Form.Label>
                <Form.Control type="email" placeholder="First Name" />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>LAST NAME</Form.Label>
                <Form.Control type="password" placeholder="Last Name" />
              </Form.Group>
            </Row>

            <Form.Group className="mb-3" controlId="formGridAddress1">
              <Form.Label>ADDRESS LINE</Form.Label>
              <Form.Control placeholder="Apartment, building, street adress, etc" />
              <p style={{ opacity: "0.5" }}>
                Please ensure to provide a complete address (including apartment
                number, building name, and street addresses) in the provided
                address field to avoid delivery delays or order cancellations.
              </p>
            </Form.Group>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridAddress2">
                <Form.Label>TOWN/CITY</Form.Label>
                <Form.Control placeholder="Town/City" />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridAddress3">
                <Form.Label>PROVINCE/STATE</Form.Label>
                <Form.Control placeholder="Province/State" />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridCity">
                <Form.Label>ZIP/POSTAL CODE</Form.Label>
                <Form.Control placeholder="Zip/Postal Code" />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridZip">
                <Form.Label>CONTACT NUMBER</Form.Label>
                <Form.Control placeholder="+63-" />
              </Form.Group>
            </Row>

            <Form.Group className="mb-3" id="formGridCheckbox">
              <Form.Label>ADD A LABEL</Form.Label>
              <Form.Control type="text" placeholder="Home, Office, etc" />
            </Form.Group>

            <Button
              style={{
                width: "200px",
                height: "50px",
              }}
              variant="dark"
            >
              SAVE
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default AddNewAddress;
