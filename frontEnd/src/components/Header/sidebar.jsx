import React from "react";
import { Offcanvas, Nav } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

function Sidebar({ showSidebar, handleSidebarClose, isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate();

  const userProfile = {
    name: "John Doe",
    userId: "12345",
    profilePicture: "https://randomuser.me/api/portraits/men/45.jpg",
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
              <Nav.Link
                onClick={() => {
                  // Simulasi login dummy
                  localStorage.setItem("token", "dummy-token");
                  setIsLoggedIn(true);
                  handleSidebarClose();
                  navigate("/return-book/102"); // langsung ke halaman pengembalian buku dengan id 102
                }}
                className="text-primary fw-semibold"
              >
                Login (Dummy)
              </Nav.Link>

              <Nav.Link as={Link} to="/signup" onClick={handleSidebarClose} className="text-primary fw-semibold">
                Sign Up
              </Nav.Link>
            </>
          ) : (
            <>
              <div className="d-flex align-items-center mb-3">
                <img
                  src={userProfile.profilePicture}
                  alt="Profile"
                  className="rounded-circle"
                  style={{ width: "40px", height: "40px", marginRight: "10px" }}
                />
                <div>
                  <div className="fw-bold">{userProfile.name}</div>
                  <div className="text-muted">ID: {userProfile.userId}</div>
                </div>
              </div>

              <Nav.Link as={Link} to="/profile" onClick={handleSidebarClose} className="text-primary fw-semibold">
                👤 Profil
              </Nav.Link>
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

              <Nav.Link as={Link} to="/favorites" onClick={handleSidebarClose} className="text-primary fw-semibold">
                ⭐ Favorit
              </Nav.Link>

              <Nav.Link
                onClick={() => {
                  localStorage.removeItem("token");
                  setIsLoggedIn(false);
                  handleSidebarClose();
                  navigate("/"); // redirect ke homepage setelah logout
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
