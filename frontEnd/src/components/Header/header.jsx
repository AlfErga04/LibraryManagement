// Header.jsx
import React, { useState } from "react";
import NavbarComponent from "./navbar";
import Sidebar from "./sidebar";

function Header({ isLoggedIn, setIsLoggedIn, user }) {
  const [showSidebar, setShowSidebar] = useState(false);

  const handleSidebarClose = () => setShowSidebar(false);
  const handleSidebarShow = () => setShowSidebar(true);

  return (
    <>
      {/* Navbar utama */}
      <NavbarComponent handleSidebarShow={handleSidebarShow} />

      {/* Sidebar (Offcanvas) */}
      <Sidebar
        showSidebar={showSidebar}
        handleSidebarClose={handleSidebarClose}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        user={user}
      />
    </>
  );
}

export default Header;
