import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminPanel = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updateMsg, setUpdateMsg] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchAllRequests();
  }, []);

  const fetchAllRequests = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get('http://localhost:5000/api/pickup/all', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setRequests(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch all requests. Admin privileges required.');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (requestId, newStatus) => {
    const token = localStorage.getItem('token');
    setUpdateMsg('');
    setError('');

    try {
      const response = await axios.put(
        `http://localhost:5000/api/pickup/${requestId}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setRequests((prev) =>
        prev.map((req) => (req._id === requestId ? response.data.request : req))
      );
      setUpdateMsg(`Updated request status to "${newStatus}"!`);
      setTimeout(() => setUpdateMsg(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update status.');
    }
  };

  const filteredRequests = requests.filter((req) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      req.itemDescription?.toLowerCase().includes(q) ||
      req.userId?.name?.toLowerCase().includes(q) ||
      req.userId?.email?.toLowerCase().includes(q) ||
      req.status?.toLowerCase().includes(q)
    );
  });

  const countPending = requests.filter((r) => r.status === 'pending').length;
  const countScheduled = requests.filter((r) => r.status === 'scheduled').length;
  const countCompleted = requests.filter((r) => r.status === 'completed').length;

  return (
    <div className="container-fluid px-4 py-4 w-100">
      {/* Header Banner */}
      <div className="bg-dark text-white p-4 p-md-5 rounded-4 shadow-sm mb-4 border border-warning border-opacity-25">
        <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3">
          <div>
            <span className="badge bg-warning text-dark px-3 py-1.5 rounded-pill fw-bold mb-2">
              <i className="bi bi-shield-lock-fill me-1"></i> Admin Portal
            </span>
            <h2 className="fw-bold mb-1">⚙️ E-Waste Pickup Request Management</h2>
            <p className="text-light opacity-75 mb-0 small">
              Review user pickup submissions and update operational order statuses in real time.
            </p>
          </div>
          <button className="btn btn-outline-light rounded-pill px-3 py-2 btn-sm align-self-start" onClick={fetchAllRequests}>
            <i className="bi bi-arrow-clockwise me-1"></i> Refresh List
          </button>
        </div>
      </div>

      {/* Admin Stat Cards */}
      <div className="row g-3 mb-4">
        <div className="col-6 col-md-3">
          <div className="card border-0 shadow-sm rounded-4 p-3 bg-white">
            <span className="text-muted small fw-semibold">Total Requests</span>
            <h3 className="fw-bold text-dark mb-0 mt-1">{requests.length}</h3>
          </div>
        </div>
        <div className="col-6 col-md-3">
          <div className="card border-0 shadow-sm rounded-4 p-3 bg-white border-start border-warning border-4">
            <span className="text-warning fw-semibold small">Pending</span>
            <h3 className="fw-bold text-dark mb-0 mt-1">{countPending}</h3>
          </div>
        </div>
        <div className="col-6 col-md-3">
          <div className="card border-0 shadow-sm rounded-4 p-3 bg-white border-start border-info border-4">
            <span className="text-info fw-semibold small">Scheduled</span>
            <h3 className="fw-bold text-dark mb-0 mt-1">{countScheduled}</h3>
          </div>
        </div>
        <div className="col-6 col-md-3">
          <div className="card border-0 shadow-sm rounded-4 p-3 bg-white border-start border-success border-4">
            <span className="text-success fw-semibold small">Completed</span>
            <h3 className="fw-bold text-dark mb-0 mt-1">{countCompleted}</h3>
          </div>
        </div>
      </div>

      {/* Notifications */}
      {error && <div className="alert alert-danger rounded-3">{error}</div>}
      {updateMsg && <div className="alert alert-success rounded-3">{updateMsg}</div>}

      {/* Search Bar */}
      <div className="card border-0 shadow-sm rounded-4 p-3 mb-4 bg-white">
        <div className="row g-3">
          <div className="col-md-6 col-lg-4">
            <div className="input-group">
              <span className="input-group-text bg-light border-end-0 text-muted">
                <i className="bi bi-search"></i>
              </span>
              <input
                type="text"
                className="form-control bg-light border-start-0"
                placeholder="Search user, email, or item description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Requests Table */}
      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-warning" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="text-muted mt-2 small">Fetching system requests...</p>
        </div>
      ) : filteredRequests.length === 0 ? (
        <div className="card border-0 shadow-sm rounded-4 p-5 text-center bg-white">
          <div className="display-4 text-muted opacity-50 mb-3">📋</div>
          <h5 className="fw-bold text-dark">No pickup requests found</h5>
        </div>
      ) : (
        <div className="card border-0 shadow-sm rounded-4 overflow-hidden bg-white">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-dark">
                <tr>
                  <th className="py-3 px-3">#</th>
                  <th className="py-3 px-3">User</th>
                  <th className="py-3 px-3">Email</th>
                  <th className="py-3 px-3">Item Description</th>
                  <th className="py-3 px-3">Qty</th>
                  <th className="py-3 px-3">Date</th>
                  <th className="py-3 px-3">Time</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3 text-center">Action Dropdown</th>
                </tr>
              </thead>
              <tbody>
                {filteredRequests.map((req, index) => (
                  <tr key={req._id}>
                    <td className="px-3 text-muted fw-semibold">{index + 1}</td>
                    <td className="px-3 fw-bold text-dark">{req.userId?.name || 'N/A'}</td>
                    <td className="px-3 text-muted small">{req.userId?.email || 'N/A'}</td>
                    <td className="px-3 text-dark">{req.itemDescription}</td>
                    <td className="px-3">
                      <span className="badge bg-light text-dark border">{req.quantity}</span>
                    </td>
                    <td className="px-3 text-secondary small">
                      {new Date(req.pickupDate).toLocaleDateString()}
                    </td>
                    <td className="px-3 text-secondary small">{req.pickupTime}</td>
                    <td className="px-3">
                      <span
                        className={`badge-status ${
                          req.status === 'completed'
                            ? 'badge-completed'
                            : req.status === 'scheduled'
                            ? 'badge-scheduled'
                            : 'badge-pending'
                        }`}
                      >
                        {req.status}
                      </span>
                    </td>
                    <td className="px-3 text-center" style={{ minWidth: '160px' }}>
                      <select
                        className="form-select form-select-sm rounded-pill fw-semibold"
                        value={req.status}
                        onChange={(e) => handleStatusChange(req._id, e.target.value)}
                      >
                        <option value="pending">⏳ pending</option>
                        <option value="scheduled">📅 scheduled</option>
                        <option value="completed">✅ completed</option>
                      </select>
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

export default AdminPanel;
