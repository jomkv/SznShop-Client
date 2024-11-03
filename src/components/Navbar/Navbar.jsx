import {
  Navbar as BootstrapNavbar,
  Container,
  Col,
  Form,
  Button,
  Row,
} from "react-bootstrap";
import "./Navbar.css";

const Navbar = () => {
  return (
    <BootstrapNavbar bg="light" expand="lg">
      <Container>
        <Row className="w-100">
          <Col lg={4} className="d-flex align-items-center fw-bold">
            <BootstrapNavbar.Brand
              href="#home"
              className="d-flex align-items-center"
            >
              <img
                src="public/szn-logo-3.jpg"
                alt="Store Logo"
                width="30"
                height="30"
                className="d-inline-block align-top rounded-circle me-2"
              />
              <span className="brand-text">SZN</span>
            </BootstrapNavbar.Brand>
            <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
          </Col>
          <Col lg={8} className="d-flex justify-content-end align-items-center">
            <BootstrapNavbar.Collapse
              id="basic-navbar-nav"
              className="d-flex justify-content-end"
            >
              <Form className="d-flex me-3">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                />
                <Button href="#search" variant="link" className="me-2">
                  <i className="bi bi-search fs-5 icon-black"></i>
                </Button>
              </Form>
              <Button href="#profile" variant="link" className="me-2">
                <i className="bi bi-person fs-5 icon-black"></i>
              </Button>
              <Button href="#FAQ" variant="link" className="me-2">
                <i className="bi bi-question-circle fs-5 icon-black"></i>
              </Button>
              <Button href="/cart" variant="link" className="me-2">
                <i className="bi bi-bag fs-5 icon-black"></i>
              </Button>
            </BootstrapNavbar.Collapse>
          </Col>
        </Row>
      </Container>
    </BootstrapNavbar>
  );
};

export default Navbar;
