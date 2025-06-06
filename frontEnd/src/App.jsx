import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/header";
import Home from "./components/Book/Home";
import Book from "./components/Book/book";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.css";
import Login from "./components/Login/login";
import Footer from "./components/Footer/footer";
import SignUp from "./components/SignUp/SignUp";


//return-book
import ReturnBook from "./components/Book/ReturnBook";
import BorrowHistory from "./components/BorrowHistory/BorrowHistory";
import About from "./components/About/about";
import Favorites from "./components/Favorites/Favorites";
import UserProfile from "./components/Profile/profile";
// routes book detail <Route path="/book/:id" element={<BookDetail />} />

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
          {/* Halaman Navbar Book */}
          <Route path="/book" element={<Book />} />
          {/* Halaman Navbar About Perpus */}
          <Route path="/about" element={<About />} />
          {/* Halaman Sidebar Profile */}
          <Route path="/profile" element={<UserProfile />} />
          {/* Halaman Sidebar Borrow-History */}
          <Route path="/borrow-history" element={<BorrowHistory />} />
          {/* Halaman Sidebar Return-Book */}
          <Route path="/return-book/:id" element={<ReturnBook />} />
          {/* Halaman Sidebar Favorites */}
          <Route path="/favorites" element={<Favorites />} />


          <Route path="/signup" element={<SignUp />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
