import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthService from "../Services/AuthService";
import { AuthContext } from "../Context/AuthContext";

const Navbar = (props) => {
  const { isAuthenticated, user, setIsAuthenticated, setUser } =
    useContext(AuthContext);
  const role = String(user && user.role ? user.role : "").toLowerCase();

  const onClickLogoutHandler = () => {
    AuthService.logout().then((data) => {
      if (data.success) {
        setUser(data.user || { _id: "", username: "", name: "", role: "" });
        setIsAuthenticated(false);
      }
    });
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark ewaste-navbar">
      <div className="container-fluid px-4">
        <Link to="/" className="navbar-brand ewaste-brand">
          <span>E-Waste Management System</span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#ewasteNavbar"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="ewasteNavbar">
          <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-3">
            {!isAuthenticated ? (
              <>
                <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/awareness">Awareness</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/recyclers">Recyclers</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
                <li className="nav-item"><Link className="btn btn-outline-light btn-sm ms-lg-2" to="/register">Register</Link></li>
              </>
            ) : (
              <>
                <li className="nav-item"><Link className="nav-link" to="/dashboard">Dashboard</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/pickup/new">Request Pickup</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/pickup/track">Track Pickup</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/recyclers">Recyclers</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/awareness">Awareness</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/notifications">Notifications</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/chatbot">EcoBot</Link></li>
                {role === 'admin' ? <li className="nav-item"><Link className="nav-link" to="/admin/dashboard">Admin</Link></li> : null}
                <li className="nav-item text-white small d-none d-lg-block">{user.name ? `Hi, ${user.name}` : 'Account'}</li>
                <li className="nav-item"><button type="button" className="btn btn-light btn-sm" onClick={onClickLogoutHandler}>Logout</button></li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
