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
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useEffect, useState } from "react";
import LogoutModal from "../LogoutModal/LogoutModal";

const Navbar = () => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSearch = (event) => {
    event.preventDefault();
    if (search === "") {
      return;
    }
    navigate(`/search?value=${search}`);
  };

  useEffect(() => {
    setSearch(searchParams.get("value"));
  }, [searchParams.get("value")]);

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
              className="d-flex justify-content-center align-items-center text-decoration-none text-black"
              to="/"
            >
              <img
                src="/szn-profilepic-2025.png"
                alt="Store Logo"
                width="30"
                height="30"
                className="d-inline-block align-top rounded-circle me-2"
              />
              <span className="brand-name">SZN</span> {/* Brand name added here */}
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
                  src="/szn-profilepic-2025.png"
                  alt="Store Logo"
                  width="30"
                  height="30"
                  className="d-inline-block align-top rounded-circle me-2"
                />
                <span className="brand-name">SZN</span> {/* Brand name in the offcanvas */}
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
              <Form className="d-flex" onSubmit={handleSearch}>
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <Button type="submit" variant="transparent">
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
