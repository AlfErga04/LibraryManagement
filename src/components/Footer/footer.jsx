import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="w-100 border-top bg-light shadow-sm mt-5">
      <div className="container py-5 px-4">
        <div className="row">
          <div className="col-md-3 mb-4">
            <div className="d-flex align-items-center mb-2">
              <div
                className="bg-primary text-white rounded-circle d-flex justify-content-center align-items-center"
                style={{ width: "40px", height: "40px" }}
              >
                R
              </div>
              <span className="ms-2 fw-bold">Repository.io</span>
            </div>
            <p className="text-muted small">
              Your digital library solution. Search, borrow, and manage books
              with ease.
            </p>
          </div>

          <div className="col-md-3 mb-4">
            <h6 className="fw-bold">Explore</h6>
            <ul className="list-unstyled text-muted small">
              <li>
                <Link to="/" className="text-muted text-decoration-none">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/book" className="text-muted text-decoration-none">
                  My Book
                </Link>
              </li>
              <li>
                <Link
                  to="/BorrowHistory"
                  className="text-muted text-decoration-none"
                >
                  Borrow History
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-md-3 mb-4">
            <h6 className="fw-bold">Account</h6>
            <ul className="list-unstyled text-muted small">
              <li>
                <Link to="/login" className="text-muted text-decoration-none">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/signup" className="text-muted text-decoration-none">
                  Sign Up
                </Link>
              </li>
              <li>
                <Link
                  to="/favorites"
                  className="text-muted text-decoration-none"
                >
                  Favorites
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-md-3 mb-4">
            <h6 className="fw-bold">Legal</h6>
            <ul className="list-unstyled text-muted small">
              <li>
                <Link to="#" className="text-muted text-decoration-none">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="#" className="text-muted text-decoration-none">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="#" className="text-muted text-decoration-none">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="d-flex justify-content-between pt-4 border-top mt-4 small text-muted">
          <p className="mb-0">
            &copy; {new Date().getFullYear()} Repository.io. All rights
            reserved.
          </p>
          <div>
            <Link to="#" className="text-muted text-decoration-none me-3">
              Privacy Policy
            </Link>
            <Link to="#" className="text-muted text-decoration-none me-3">
              Terms
            </Link>
            <Link to="#" className="text-muted text-decoration-none">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
