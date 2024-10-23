import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Col, Row } from "react-bootstrap";

const MyNavbar = () => {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Row className="w-100">
          <Col lg={4} className="d-flex align-items-center fw-bold">
            <Navbar.Brand href="#home">SZN</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
          </Col>
          <Col lg={8} className="d-flex justify-content-end align-items-center">
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button href="#search" variant="me-2 link">
                <i className="bi bi-search fs-5"></i>
              </Button>
            </Form>
            <Button href="#profile" variant="me-2 link">
              <i className="bi bi-person fs-5"></i>
            </Button>
            <Button href="#FAQ" variant="me-2 link">
              <i className="bi bi-question-circle fs-5"></i>
            </Button>
            <Button href="#shoppingbag" variant="me-2 link">
              <i className="bi bi-bag fs-5"></i>
            </Button>
          </Col>
        </Row>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
