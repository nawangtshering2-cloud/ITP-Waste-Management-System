import React from 'react';
import { useHistory } from 'react-router-dom';

const Dashboard = () => {
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    history.push('/login');
  };

  return (
    <div className="container mt-4">
      <div className="p-5 mb-4 bg-light rounded-3 border shadow-sm text-center">
        <h1 className="display-5 fw-bold text-success">Welcome to EcoDispose</h1>
        <p className="fs-4 text-secondary">
          Hello <strong>{user.name || 'User'}</strong>! Manage your electronic waste responsibly.
        </p>
        <hr className="my-4" />
        
        <div className="row g-3 justify-content-center mt-2">
          <div className="col-md-3">
            <button
              className="btn btn-success btn-lg w-100 py-3 shadow-sm"
              onClick={() => history.push('/request')}
            >
              📦 Request Pickup
            </button>
          </div>
          <div className="col-md-3">
            <button
              className="btn btn-primary btn-lg w-100 py-3 shadow-sm"
              onClick={() => history.push('/myrequests')}
            >
              📋 My Requests
            </button>
          </div>
          <div className="col-md-3">
            <button
              className="btn btn-info text-white btn-lg w-100 py-3 shadow-sm"
              onClick={() => history.push('/centres')}
            >
              🏢 Collection Centres
            </button>
          </div>
          <div className="col-md-3">
            <button
              className="btn btn-danger btn-lg w-100 py-3 shadow-sm"
              onClick={handleLogout}
            >
              🚪 Logout
            </button>
          </div>
        </div>

        {user.role === 'admin' && (
          <div className="mt-4">
            <button
              className="btn btn-warning btn-lg w-50 py-2 shadow-sm fw-bold"
              onClick={() => history.push('/admin')}
            >
              ⚙️ Admin Panel (Manage All Requests)
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
