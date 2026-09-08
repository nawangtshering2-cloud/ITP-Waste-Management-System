import React, { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const [stats, setStats] = useState({ requestsCount: 0, centresCount: 0 });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    const token = localStorage.getItem('token');
    try {
      const [reqRes, centreRes] = await Promise.all([
        axios.get('http://localhost:5000/api/pickup/myrequests', {
          headers: { Authorization: `Bearer ${token}` },
        }).catch(() => ({ data: [] })),
        axios.get('http://localhost:5000/api/centres').catch(() => ({ data: [] })),
      ]);
      setStats({
        requestsCount: reqRes.data.length || 0,
        centresCount: centreRes.data.length || 0,
      });
    } catch (e) {
      console.error(e);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    history.push('/login');
  };

  return (
    <div className="container-fluid px-4 py-4 w-100">
      {/* Welcome Hero Banner */}
      <div className="hero-gradient p-4 p-md-5 rounded-4 shadow-sm mb-4 position-relative overflow-hidden">
        <div className="row align-items-center position-relative z-1">
          <div className="col-lg-8">
            <span className="badge bg-white bg-opacity-25 text-white mb-3 px-3 py-2 rounded-pill fw-normal">
              🌿 Student PBL Project • E-Waste Management
            </span>
            <h1 className="display-5 fw-bold mb-2">Welcome back, {user.name || 'User'}!</h1>
            <p className="fs-5 opacity-90 mb-4 max-w-2xl">
              Dispose of electronic waste safely and sustainably. Schedule pickups or locate certified recycling collection centres in your city.
            </p>
            <div className="d-flex flex-wrap gap-3">
              <Link to="/request" className="btn btn-light btn-lg rounded-pill fw-semibold text-emerald shadow-sm px-4">
                <i className="bi bi-box-seam me-2"></i>Schedule Pickup Now
              </Link>
              <Link to="/centres" className="btn btn-outline-light btn-lg rounded-pill fw-semibold px-4">
                <i className="bi bi-geo-alt me-2"></i>Explore Centres
              </Link>
            </div>
          </div>
          <div className="col-lg-4 text-center d-none d-lg-block">
            <div className="display-1 opacity-25">♻️</div>
          </div>
        </div>
      </div>

      {/* Overview Stat Badges */}
      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <div className="card border-0 shadow-sm rounded-4 p-3 bg-white d-flex flex-row align-items-center">
            <div className="rounded-3 p-3 bg-emerald-light me-3 text-success fs-3">
              <i className="bi bi-journal-check"></i>
            </div>
            <div>
              <h3 className="fw-bold mb-0 text-dark">{stats.requestsCount}</h3>
              <span className="text-muted small">My Pickup Requests</span>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card border-0 shadow-sm rounded-4 p-3 bg-white d-flex flex-row align-items-center">
            <div className="rounded-3 p-3 bg-primary bg-opacity-10 me-3 text-primary fs-3">
              <i className="bi bi-buildings"></i>
            </div>
            <div>
              <h3 className="fw-bold mb-0 text-dark">{stats.centresCount}</h3>
              <span className="text-muted small">Collection Facilities</span>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card border-0 shadow-sm rounded-4 p-3 bg-white d-flex flex-row align-items-center">
            <div className="rounded-3 p-3 bg-warning bg-opacity-10 me-3 text-warning fs-3">
              <i className="bi bi-shield-check"></i>
            </div>
            <div>
              <h3 className="fw-bold mb-0 text-dark">{user.role === 'admin' ? 'Admin' : 'Standard User'}</h3>
              <span className="text-muted small">Account Type</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Main Action Cards */}
      <h4 className="fw-bold text-dark mb-3">Quick Actions</h4>
      <div className="row g-4 mb-4">
        <div className="col-12 col-md-6 col-xl-3">
          <div
            className="card border-0 shadow-sm rounded-4 h-100 hover-lift cursor-pointer p-4 text-center bg-white"
            onClick={() => history.push('/request')}
            style={{ cursor: 'pointer' }}
          >
            <div className="display-4 text-success mb-3">📦</div>
            <h5 className="fw-bold text-dark mb-2">Request Pickup</h5>
            <p className="text-muted small mb-4">Submit a request to pick up old laptops, phones, cables, or appliances.</p>
            <button className="btn btn-emerald rounded-pill w-100">Schedule Pickup</button>
          </div>
        </div>

        <div className="col-12 col-md-6 col-xl-3">
          <div
            className="card border-0 shadow-sm rounded-4 h-100 hover-lift cursor-pointer p-4 text-center bg-white"
            onClick={() => history.push('/myrequests')}
            style={{ cursor: 'pointer' }}
          >
            <div className="display-4 text-primary mb-3">📋</div>
            <h5 className="fw-bold text-dark mb-2">My Requests</h5>
            <p className="text-muted small mb-4">View and track the live status of your submitted pickup requests.</p>
            <button className="btn btn-outline-emerald rounded-pill w-100">View Requests</button>
          </div>
        </div>

        <div className="col-12 col-md-6 col-xl-3">
          <div
            className="card border-0 shadow-sm rounded-4 h-100 hover-lift cursor-pointer p-4 text-center bg-white"
            onClick={() => history.push('/centres')}
            style={{ cursor: 'pointer' }}
          >
            <div className="display-4 text-info mb-3">🏢</div>
            <h5 className="fw-bold text-dark mb-2">Collection Centres</h5>
            <p className="text-muted small mb-4">Find verified e-waste collection points and drop-off hubs nearby.</p>
            <button className="btn btn-outline-emerald rounded-pill w-100">Explore Facilities</button>
          </div>
        </div>

        <div className="col-12 col-md-6 col-xl-3">
          <div
            className="card border-0 shadow-sm rounded-4 h-100 hover-lift cursor-pointer p-4 text-center bg-white"
            onClick={handleLogout}
            style={{ cursor: 'pointer' }}
          >
            <div className="display-4 text-danger mb-3">🚪</div>
            <h5 className="fw-bold text-dark mb-2">Logout</h5>
            <p className="text-muted small mb-4">Safely sign out of your EcoDispose user account on this device.</p>
            <button className="btn btn-outline-danger rounded-pill w-100">Sign Out</button>
          </div>
        </div>
      </div>

      {/* Admin Panel Banner if Admin */}
      {user.role === 'admin' && (
        <div className="card border-0 bg-dark text-white rounded-4 shadow-sm p-4 mt-2">
          <div className="d-flex flex-column flex-md-row align-items-center justify-content-between">
            <div className="d-flex align-items-center mb-3 mb-md-0">
              <div className="fs-1 text-warning me-3">⚙️</div>
              <div>
                <h4 className="fw-bold text-warning mb-1">Administrator Control Panel</h4>
                <p className="text-light opacity-75 mb-0">View all customer pickup requests across the system and update order statuses.</p>
              </div>
            </div>
            <Link to="/admin" className="btn btn-warning btn-lg rounded-pill fw-bold text-dark px-4 shadow">
              Open Admin Panel <i className="bi bi-arrow-right ms-2"></i>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
