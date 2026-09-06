import React from 'react';
import { Link, useHistory } from 'react-router-dom';

const Navbar = () => {
  const history = useHistory();
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    history.push('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3 mb-4 shadow">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold text-success" to={token ? '/dashboard' : '/'}>
          ♻️ EcoDispose
        </Link>
        {token && (
          <div className="d-flex align-items-center me-auto ms-3">
            <Link className="nav-link text-light me-3" to="/dashboard">
              Dashboard
            </Link>
            <Link className="nav-link text-light me-3" to="/request">
              Request Pickup
            </Link>
            <Link className="nav-link text-light me-3" to="/myrequests">
              My Requests
            </Link>
            <Link className="nav-link text-light me-3" to="/centres">
              Collection Centres
            </Link>
            {user.role === 'admin' && (
              <Link className="nav-link text-warning fw-bold me-3" to="/admin">
                Admin Panel
              </Link>
            )}
          </div>
        )}
        <div className="d-flex align-items-center ms-auto">
          {token ? (
            <>
              <span className="navbar-text me-3 text-light">
                Hello, <strong>{user.name || 'User'}</strong> {user.role === 'admin' && '(Admin)'}
              </span>
              <button className="btn btn-outline-danger btn-sm" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="btn btn-outline-light btn-sm me-2" to="/">
                Login
              </Link>
              <Link className="btn btn-success btn-sm" to="/register">
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
