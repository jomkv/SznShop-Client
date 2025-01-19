import {
  Navbar as BootstrapNavbar,
  Container,
  Form,
  Button,
  Nav,
  Offcanvas,
  NavDropdown,
} from "react-bootstrap";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useState } from "react";
import LogoutModal from "../LogoutModal/LogoutModal";

const Navbar = () => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const { user, isLoading } = useAuth();

  return (
    <>
      <BootstrapNavbar
        sticky="top"
        expand="md"
        bg="light"
        className="border-bottom border-black"
        style={{ "--bs-border-opacity": ".2" }}
      >
        <Container>
          <BootstrapNavbar.Brand>
            <Link
              className="d-fle justify-content-center align-items-center text-decoration-none text-black"
              to="/"
            >
              <img
                src="szn-logo-3.jpg"
                alt="Store Logo"
                width="30"
                height="30"
                className="d-inline-block align-top rounded-circle me-2"
              />
              <span className="brand-text">SZN</span>
            </Link>
          </BootstrapNavbar.Brand>
          <BootstrapNavbar.Toggle aria-controls="homeNav" />
          <BootstrapNavbar.Offcanvas
            id="homeNav"
            aria-labelledby="homeNavLabel"
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title
                id="homeNavLabel"
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
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <NavDropdown
                  title={<i className="bi bi-person fs-5 icon-black" />}
                  id="profileDropdown"
                  className="me-2"
                  disabled={isLoading}
                >
                  {user ? (
                    <>
                      <NavDropdown.Item href="/settings">
                        Profile
                      </NavDropdown.Item>
                      <NavDropdown.Item
                        onClick={() => {
                          setShowLogoutModal(true);
                        }}
                      >
                        Logout
                      </NavDropdown.Item>
                    </>
                  ) : (
                    <NavDropdown.Item href="/login">Login</NavDropdown.Item>
                  )}
                </NavDropdown>
                <Nav.Item className="d-flex align-items-center me-3">
                  <Link to="/faq">
                    <i className="bi bi-question-circle fs-5 icon-black" />
                  </Link>
                </Nav.Item>
                {user && (
                  <Nav.Item className="d-flex align-items-center me-1">
                    <Link to="/cart" className="p-0 m-0">
                      <i className="bi bi-bag fs-5 icon-black" />
                    </Link>
                  </Nav.Item>
                )}
              </Nav>
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                />
                <Button href="#search" variant="link">
                  <i className="bi bi-search fs-5 icon-black"></i>
                </Button>
              </Form>
            </Offcanvas.Body>
          </BootstrapNavbar.Offcanvas>
        </Container>
      </BootstrapNavbar>
      <LogoutModal show={showLogoutModal} setShow={setShowLogoutModal} />
    </>
  );
};

export default Navbar;
