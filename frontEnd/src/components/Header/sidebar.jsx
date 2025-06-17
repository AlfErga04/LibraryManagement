import React from "react";
import { Offcanvas, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

function Sidebar({ showSidebar, handleSidebarClose, isLoggedIn, setIsLoggedIn, user }) {

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    handleSidebarClose();
    window.location.pathname = '/';
  };

  return (
    <Offcanvas show={showSidebar} onHide={handleSidebarClose} placement="end" className="bg-light">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title className="fw-bold">
          {isLoggedIn ? "Profile" : "Account"}
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Nav className="flex-column">
          {!isLoggedIn ? (
            <>
              <Nav.Link as={Link} to="/login" onClick={handleSidebarClose}>Login</Nav.Link>
              <Nav.Link as={Link} to="/register" onClick={handleSidebarClose}>Sign Up</Nav.Link>
            </>
          ) : (
            <>
              <div className="d-flex align-items-center mb-3">
                <img
                  src={user?.profile_picture || "https://via.placeholder.com/40"}
                  alt="Profile"
                  className="rounded-circle"
                  style={{ width: "40px", height: "40px", marginRight: "10px" }}
                />
                <div>
                  <div className="fw-bold">{user?.name}</div>
                  <div className="text-muted">Email: {user?.email}</div>
                </div>
              </div>

              <Nav.Link as={Link} to="/profile" onClick={handleSidebarClose}>👤 Profil</Nav.Link>
              <Nav.Link as={Link} to="/borrow-history" onClick={handleSidebarClose} className="text-primary fw-semibold">
                📚 Riwayat Peminjaman
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/return-book/102"
                onClick={handleSidebarClose}
                className="text-primary fw-semibold"
              >
                ⏰ Jadwal Pengembalian
              </Nav.Link>
              <Nav.Link as={Link} to="/favorites" onClick={handleSidebarClose}>⭐ Favorit</Nav.Link>

              <Nav.Link
                onClick={() => {
                  handleLogout();
                }}
                className="text-danger fw-semibold"
              >
                🚪 Logout
              </Nav.Link>
            </>
          )}
        </Nav>
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default Sidebar;
