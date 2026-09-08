import React, { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';

const MyRequests = () => {
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const history = useHistory();

  useEffect(() => {
    fetchMyRequests();
  }, []);

  useEffect(() => {
    filterData();
  }, [searchQuery, statusFilter, requests]);

  const fetchMyRequests = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get('http://localhost:5000/api/pickup/myrequests', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setRequests(response.data);
      setFilteredRequests(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch pickup requests.');
    } finally {
      setLoading(false);
    }
  };

  const filterData = () => {
    let result = [...requests];
    if (statusFilter !== 'all') {
      result = result.filter((item) => item.status === statusFilter);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (item) =>
          item.itemDescription.toLowerCase().includes(q) ||
          item.pickupTime.toLowerCase().includes(q)
      );
    }
    setFilteredRequests(result);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'completed':
        return <span className="badge-status badge-completed"><i className="bi bi-check-circle-fill me-1"></i> Completed</span>;
      case 'scheduled':
        return <span className="badge-status badge-scheduled"><i className="bi bi-calendar-check me-1"></i> Scheduled</span>;
      default:
        return <span className="badge-status badge-pending"><i className="bi bi-hourglass-split me-1"></i> Pending</span>;
    }
  };

  return (
    <div className="container-fluid px-4 py-4 w-100">
      {/* Header Bar */}
      <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between mb-4 gap-3">
        <div>
          <h2 className="fw-bold text-dark mb-1">📋 My Pickup Requests</h2>
          <p className="text-muted small mb-0">Track all your submitted e-waste pickup appointments and live status</p>
        </div>
        <button
          className="btn btn-emerald rounded-pill px-4 shadow-sm fw-semibold"
          onClick={() => history.push('/request')}
        >
          <i className="bi bi-plus-lg me-2"></i>Request New Pickup
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="card border-0 shadow-sm rounded-4 p-3 mb-4 bg-white">
        <div className="row g-3 align-items-center">
          <div className="col-md-6 col-lg-4">
            <div className="input-group">
              <span className="input-group-text bg-light border-end-0 text-muted">
                <i className="bi bi-search"></i>
              </span>
              <input
                type="text"
                className="form-control bg-light border-start-0"
                placeholder="Search item description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="col-md-6 col-lg-4 ms-auto d-flex align-items-center justify-content-md-end gap-2">
            <span className="text-muted small fw-semibold">Filter:</span>
            <div className="btn-group btn-group-sm" role="group">
              <button
                type="button"
                className={`btn ${statusFilter === 'all' ? 'btn-dark' : 'btn-outline-secondary'}`}
                onClick={() => setStatusFilter('all')}
              >
                All
              </button>
              <button
                type="button"
                className={`btn ${statusFilter === 'pending' ? 'btn-warning text-dark' : 'btn-outline-secondary'}`}
                onClick={() => setStatusFilter('pending')}
              >
                Pending
              </button>
              <button
                type="button"
                className={`btn ${statusFilter === 'scheduled' ? 'btn-info text-dark' : 'btn-outline-secondary'}`}
                onClick={() => setStatusFilter('scheduled')}
              >
                Scheduled
              </button>
              <button
                type="button"
                className={`btn ${statusFilter === 'completed' ? 'btn-success' : 'btn-outline-secondary'}`}
                onClick={() => setStatusFilter('completed')}
              >
                Completed
              </button>
            </div>
          </div>
        </div>
      </div>

      {error && <div className="alert alert-danger rounded-3">{error}</div>}

      {/* Requests Table */}
      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-emerald" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="text-muted mt-2 small">Fetching your requests...</p>
        </div>
      ) : filteredRequests.length === 0 ? (
        <div className="card border-0 shadow-sm rounded-4 p-5 text-center bg-white">
          <div className="display-3 text-muted opacity-50 mb-3">📦</div>
          <h5 className="fw-bold text-dark">No pickup requests found</h5>
          <p className="text-muted small mb-4">You haven't requested any e-waste pickup matching your search criteria yet.</p>
          <div>
            <Link to="/request" className="btn btn-emerald rounded-pill px-4">
              Schedule Your First Pickup
            </Link>
          </div>
        </div>
      ) : (
        <div className="card border-0 shadow-sm rounded-4 overflow-hidden bg-white">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-dark">
                <tr>
                  <th className="py-3 px-4">#</th>
                  <th className="py-3 px-4">Item Description</th>
                  <th className="py-3 px-4">Qty</th>
                  <th className="py-3 px-4">Pickup Date</th>
                  <th className="py-3 px-4">Pickup Time</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Submitted On</th>
                </tr>
              </thead>
              <tbody>
                {filteredRequests.map((req, index) => (
                  <tr key={req._id}>
                    <td className="px-4 fw-semibold text-muted">{index + 1}</td>
                    <td className="px-4">
                      <span className="fw-semibold text-dark">{req.itemDescription}</span>
                    </td>
                    <td className="px-4">
                      <span className="badge bg-light text-dark border px-2 py-1">{req.quantity} pcs</span>
                    </td>
                    <td className="px-4 text-secondary">
                      <i className="bi bi-calendar-event me-2 text-muted"></i>
                      {new Date(req.pickupDate).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                    </td>
                    <td className="px-4 text-secondary">
                      <i className="bi bi-clock me-2 text-muted"></i>
                      {req.pickupTime}
                    </td>
                    <td className="px-4">{getStatusBadge(req.status)}</td>
                    <td className="px-4 text-muted small">
                      {new Date(req.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyRequests;
