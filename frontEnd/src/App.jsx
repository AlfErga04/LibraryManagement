import React, { useState, useEffect } from "react";
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
import BookDetail from "./components/Book/book-detail";
import UserProfile from "./components/Profile/profile";
import ReturnBook from "./components/Book/ReturnBook";
import BorrowHistory from "./components/BorrowHistory/BorrowHistory";
import Favorites from "./components/Favorites/Favorites";
import About from "./components/About/about";
import PaymentCallback from "./components/BorrowHistory/PaymentCallback";
import SendEmail from "./components/ResetPassword/sendEmail";
import ResetPassword from "./components/ResetPassword/ResetPassword";
import AccountActivation from "./components/Login/aktivasi";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");
    if (token && userData) {
      setIsLoggedIn(true);
      setUser(JSON.parse(userData));
    }
  }, []);

  return (
    <Router>
      <div>
        {/* Navbar / Header */}
        <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} user={user} />

        {/* Routing */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/book" element={<Book />} />
          <Route path="/book/:id" element={<BookDetail />} />

          <Route
            path="/login"
            element={<Login setIsLoggedIn={setIsLoggedIn} setUser={setUser} />}
          />
          <Route path="/register" element={<SignUp />} />
          <Route path="/login/activate/:token" element={<AccountActivation />} />

          <Route path="/forgot-password" element={<SendEmail />} />
          <Route path="/login/reset-password" element={<ResetPassword />} />
          {/* Halaman Navbar About Perpus */}
          <Route path="/about" element={<About />} />
          {/* Halaman Sidebar Profile */}
          <Route path="/profile" element={<UserProfile />} />
          {/* Halaman Sidebar Return-Book */}
          <Route path="/return-book/:id" element={<ReturnBook />} />
          {/* Halaman Sidebar Borrow-History */}
          <Route path="/borrow-history" element={<BorrowHistory />} />
          {/* Halaman Sidebar Favorites */}
          <Route path="/favorites" element={<Favorites />} />

            <Route path="/payment-callback" element={<PaymentCallback />} />
        </Routes>

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
