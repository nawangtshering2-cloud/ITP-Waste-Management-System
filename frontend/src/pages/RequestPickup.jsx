import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const RequestPickup = () => {
  const [itemDescription, setItemDescription] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [pickupDate, setPickupDate] = useState('');
  const [pickupTime, setPickupTime] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    const token = localStorage.getItem('token');

    try {
      await axios.post(
        'http://localhost:5000/api/pickup/request',
        {
          itemDescription,
          quantity: Number(quantity),
          pickupDate,
          pickupTime,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccess('Pickup request submitted successfully!');
      setTimeout(() => {
        history.push('/myrequests');
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit pickup request.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4" style={{ maxWidth: '600px' }}>
      <div className="card shadow border-0">
        <div className="card-header bg-success text-white">
          <h4 className="mb-0">📦 Request E-Waste Pickup</h4>
        </div>
        <div className="card-body p-4">
          {error && <div className="alert alert-danger">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}
          
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label font-weight-bold">Item Description</label>
              <textarea
                className="form-control"
                rows="3"
                required
                placeholder="e.g., Old Laptop, 2 Broken Phones, CRT Monitor"
                value={itemDescription}
                onChange={(e) => setItemDescription(e.target.value)}
              ></textarea>
            </div>

            <div className="mb-3">
              <label className="form-label">Quantity</label>
              <input
                type="number"
                min="1"
                className="form-control"
                required
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Preferred Pickup Date</label>
                <input
                  type="date"
                  className="form-control"
                  required
                  value={pickupDate}
                  onChange={(e) => setPickupDate(e.target.value)}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Preferred Pickup Time</label>
                <input
                  type="time"
                  className="form-control"
                  required
                  value={pickupTime}
                  onChange={(e) => setPickupTime(e.target.value)}
                />
              </div>
            </div>

            <div className="d-flex justify-content-between mt-3">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => history.push('/dashboard')}
              >
                Back to Dashboard
              </button>
              <button
                type="submit"
                className="btn btn-success"
                disabled={loading}
              >
                {loading ? 'Submitting...' : 'Submit Request'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RequestPickup;
