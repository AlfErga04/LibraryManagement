import React, { useState } from "react";
import {
  Navbar,
  Nav,
  NavDropdown,
  Container,
  Offcanvas,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../../assets/book-logo.png";

function Header() {
  const [showSidebar, setShowSidebar] = useState(false);

  const handleSidebarClose = () => setShowSidebar(false);
  const handleSidebarShow = () => setShowSidebar(true);

  return (
    <>
      <Navbar
        bg="light"
        variant="light"
        expand="lg"
        fixed="top"
        className="shadow-sm py-3"
      >
        <Container fluid>
          <Navbar.Brand
            as={Link}
            to="/"
            className="fw-bold text-primary d-flex align-items-center"
          >
            <img
              src={logo}
              alt="Logo"
              className="d-inline-block align-text-top me-2"
              style={{
                maxHeight: "40px", 
                width: "auto", 
                borderRadius: "8px",
              }}
            />
            Repository.io
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarNav" />
          <Navbar.Collapse id="navbarNav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/" className="mx-2">
                Home
              </Nav.Link>
              <NavDropdown
                title="Repository"
                id="repositoryDropdown"
                className="mx-2"
              >
                <NavDropdown.Item as={Link} to="#">
                  Submenu 1
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="#">
                  Submenu 2
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link as={Link} to="/book" className="mx-2">
                My Book
              </Nav.Link>
              <Nav.Link as={Link} to="#" className="mx-2">
                More
              </Nav.Link>
              <Nav.Link
                onClick={handleSidebarShow}
                className="btn btn-outline-primary rounded-pill px-3 mx-2"
              >
                Account
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Offcanvas
        show={showSidebar}
        onHide={handleSidebarClose}
        placement="end"
        className="bg-light"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className="fw-bold">Account</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
            <Nav.Link
              as={Link}
              to="/login"
              onClick={handleSidebarClose}
              className="text-primary fw-semibold"
            >
              Login
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/signup"
              onClick={handleSidebarClose}
              className="text-primary fw-semibold"
            >
              Sign Up
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/BorrowHistory"
              onClick={handleSidebarClose}
              className="text-primary fw-semibold"
            >
              Borrow History
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/return-history"
              onClick={handleSidebarClose}
              className="text-primary fw-semibold"
            >
              Return History
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/favorites"
              onClick={handleSidebarClose}
              className="text-primary fw-semibold"
            >
              Favorites
            </Nav.Link>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Header;
