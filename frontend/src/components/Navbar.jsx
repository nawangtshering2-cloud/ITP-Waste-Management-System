import React from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';

const Navbar = () => {
  const history = useHistory();
  const location = useLocation();
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    history.push('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4 py-3 shadow-sm sticky-top w-100">
      <div className="container-fluid px-2">
        <Link className="navbar-brand d-flex align-items-center fw-bold fs-4 text-emerald me-4" to={token ? '/dashboard' : '/'}>
          <span className="fs-3 me-2">♻️</span>
          <span style={{ color: '#10b981', letterSpacing: '-0.5px' }}>Eco</span>
          <span className="text-white">Dispose</span>
        </Link>

        {token && (
          <button
            className="navbar-toggler border-0 ms-auto"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarContent"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        )}

        {token && (
          <div className="collapse navbar-collapse" id="navbarContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 gap-2">
              <li className="nav-item">
                <Link
                  className={`nav-link px-3 rounded-3 fw-medium ${isActive('/dashboard') ? 'bg-success text-white active' : 'text-light'}`}
                  to="/dashboard"
                >
                  <i className="bi bi-speedometer2 me-2"></i>Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link px-3 rounded-3 fw-medium ${isActive('/request') ? 'bg-success text-white active' : 'text-light'}`}
                  to="/request"
                >
                  <i className="bi bi-plus-circle me-2"></i>Request Pickup
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link px-3 rounded-3 fw-medium ${isActive('/myrequests') ? 'bg-success text-white active' : 'text-light'}`}
                  to="/myrequests"
                >
                  <i className="bi bi-clock-history me-2"></i>My Requests
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link px-3 rounded-3 fw-medium ${isActive('/centres') ? 'bg-success text-white active' : 'text-light'}`}
                  to="/centres"
                >
                  <i className="bi bi-geo-alt me-2"></i>Collection Centres
                </Link>
              </li>
              {user.role === 'admin' && (
                <li className="nav-item">
                  <Link
                    className={`nav-link px-3 rounded-3 fw-bold ${isActive('/admin') ? 'bg-warning text-dark active' : 'text-warning'}`}
                    to="/admin"
                  >
                    <i className="bi bi-shield-lock me-2"></i>Admin Panel
                  </Link>
                </li>
              )}
            </ul>
          </div>
        )}

        <div className="d-flex align-items-center gap-3 ms-auto">
          {token ? (
            <>
              <div className="d-none d-md-flex align-items-center bg-secondary bg-opacity-25 px-3 py-1.5 rounded-pill border border-secondary border-opacity-50">
                <i className="bi bi-person-circle me-2 text-emerald"></i>
                <span className="text-light small fw-medium">
                  {user.name || 'User'} {user.role === 'admin' && <span className="badge bg-warning text-dark ms-1">Admin</span>}
                </span>
              </div>
              <button className="btn btn-outline-danger btn-sm rounded-pill px-3 py-1.5 fw-semibold" onClick={handleLogout}>
                <i className="bi bi-box-arrow-right me-1.5"></i>Logout
              </button>
            </>
          ) : (
            <>
              <Link className="btn btn-outline-light btn-sm rounded-pill px-3 py-1.5 fw-medium me-1" to="/login">
                Login
              </Link>
              <Link className="btn btn-emerald btn-sm rounded-pill px-3 py-1.5 fw-semibold" to="/register">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
