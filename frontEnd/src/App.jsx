import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Book/Home";
import Book from "./components/Book/book";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.css";
import Login from "./components/Login/login";
import Footer from "./components/Footer/footer";
import SignUp from "./components/SignUp/SignUp";
import BorrowHistory from "./components/BorrowHistory/BorrowHistory";
import { useEffect, useState } from "react";




function App() {
  return (
    <Router>
      <div>
        {/* Navbar */}
        <Header />

        {/* Routing */}
        <Routes>
          {/* Halaman Utama */}
          <Route
            path="/"
            element={
              <>
                <Home/>
              </>
            }
          />

          {/* Halaman Home Buku */}
          <Route path="/home" element={<Home />} />

          {/* Halaman Book */}
          <Route path="/book" element={<Book />} />

          {/* Halaman Login */}
          <Route path="/login" element={<Login />} />

          {/* Halaman Sign Up */}
          <Route path="/signup" element={<SignUp />} />

          <Route path="/BorrowHistory" element={<BorrowHistory />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
