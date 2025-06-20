import React, { useState } from "react";
import './login.css';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Login({ setIsLoggedIn, setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login gagal.");
      }

      // Simpan token dan user
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setIsLoggedIn(true);
      setUser(data.user);

      setMessage("Login berhasil!");
      navigate("/");

    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <p><Link to="/forgot-password">Forgot password?</Link></p>
        {message && <div className="alert alert-info">{message}</div>}
        <button type="submit" className="btn btn-primary">Login</button>
        <p style={{ marginTop: "10px" }}>Don't have an account? <Link to="/register">Sign Up</Link></p>
      </form>
    </div>
  );
}

export default Login;
