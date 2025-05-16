import React, { useState } from "react";
import NavbarComponent from "./navbar";
import Sidebar from "./sidebar";

function Header() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // status login

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
      />
    </>
  );
}

export default Header;
