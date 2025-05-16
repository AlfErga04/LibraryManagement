import React from "react";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../../assets/book-logo.png";

function NavbarComponent({ handleSidebarShow }) {
  return (
    <Navbar bg="light" variant="light" expand="lg" fixed="top" className="shadow-sm py-3">
      <Container fluid>
        <Navbar.Brand as={Link} to="/" className="fw-bold text-primary d-flex align-items-center">
          <img
            src={logo}
            alt="Logo"
            className="d-inline-block align-text-top me-2"
            style={{ maxHeight: "40px", width: "auto", borderRadius: "8px" }}
          />
          Repository.io
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarNav" />
        <Navbar.Collapse id="navbarNav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/" className="mx-2">Home</Nav.Link>
            <NavDropdown title="Repository" id="repositoryDropdown" className="mx-2">
              <NavDropdown.Item as={Link} to="#">Submenu 1</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="#">Submenu 2</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link as={Link} to="/book" className="mx-2">My Book</Nav.Link>
            <Nav.Link as={Link} to="#" className="mx-2">More</Nav.Link>
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
  );
}

export default NavbarComponent;
