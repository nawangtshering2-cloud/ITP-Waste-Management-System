import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminPanel = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updateMsg, setUpdateMsg] = useState('');

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
      setUpdateMsg(`Status updated to "${newStatus}"!`);
      setTimeout(() => setUpdateMsg(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update status.');
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-warning">⚙️ Admin Panel - Manage All E-Waste Pickup Requests</h2>

      {error && <div className="alert alert-danger">{error}</div>}
      {updateMsg && <div className="alert alert-success">{updateMsg}</div>}

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-warning" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : requests.length === 0 ? (
        <div className="alert alert-info text-center py-4">No pickup requests in system.</div>
      ) : (
        <div className="table-responsive shadow-sm rounded">
          <table className="table table-bordered table-hover align-middle mb-0">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>User Name</th>
                <th>User Email</th>
                <th>Item Description</th>
                <th>Quantity</th>
                <th>Pickup Date</th>
                <th>Pickup Time</th>
                <th>Current Status</th>
                <th>Update Status</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req, index) => (
                <tr key={req._id}>
                  <td>{index + 1}</td>
                  <td>{req.userId?.name || 'N/A'}</td>
                  <td>{req.userId?.email || 'N/A'}</td>
                  <td>{req.itemDescription}</td>
                  <td>{req.quantity}</td>
                  <td>{new Date(req.pickupDate).toLocaleDateString()}</td>
                  <td>{req.pickupTime}</td>
                  <td>
                    <span
                      className={`badge ${
                        req.status === 'completed'
                          ? 'bg-success'
                          : req.status === 'scheduled'
                          ? 'bg-info text-dark'
                          : 'bg-warning text-dark'
                      }`}
                    >
                      {req.status}
                    </span>
                  </td>
                  <td>
                    <select
                      className="form-select form-select-sm"
                      value={req.status}
                      onChange={(e) => handleStatusChange(req._id, e.target.value)}
                    >
                      <option value="pending">pending</option>
                      <option value="scheduled">scheduled</option>
                      <option value="completed">completed</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
