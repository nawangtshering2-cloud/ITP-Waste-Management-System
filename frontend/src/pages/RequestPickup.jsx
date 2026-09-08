import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
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
    <div className="container-fluid px-4 py-4 w-100">
      {/* Navigation Breadcrumb */}
      <div className="mb-4">
        <Link to="/dashboard" className="text-decoration-none text-muted small fw-medium">
          <i className="bi bi-arrow-left me-1"></i> Back to Dashboard
        </Link>
      </div>

      <div className="row justify-content-center">
        <div className="col-12 col-md-10 col-lg-8 col-xl-6">
          <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
            <div className="card-header hero-gradient p-4 text-white border-0">
              <div className="d-flex align-items-center">
                <div className="fs-1 me-3">📦</div>
                <div>
                  <h3 className="fw-bold mb-1">Request E-Waste Pickup</h3>
                  <p className="mb-0 text-white-50 small">Fill out the form below to schedule a free e-waste collection</p>
                </div>
              </div>
            </div>

            <div className="card-body p-4 p-md-5 bg-white">
              {error && (
                <div className="alert alert-danger d-flex align-items-center rounded-3 mb-4" role="alert">
                  <i className="bi bi-exclamation-triangle-fill me-2 fs-5"></i>
                  <div>{error}</div>
                </div>
              )}

              {success && (
                <div className="alert alert-success d-flex align-items-center rounded-3 mb-4" role="alert">
                  <i className="bi bi-check-circle-fill me-2 fs-5"></i>
                  <div>{success}</div>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="form-label fw-semibold text-dark">
                    <i className="bi bi-card-text me-2 text-emerald"></i>Item Description
                  </label>
                  <textarea
                    className="form-control rounded-3 py-2 px-3"
                    rows="3"
                    required
                    placeholder="e.g., 2 Old Laptops, 1 CRT Monitor, 4 Smartphone Batteries, Charger Cables"
                    value={itemDescription}
                    onChange={(e) => setItemDescription(e.target.value)}
                  ></textarea>
                  <div className="form-text small text-muted">Include device types, brands, or condition details if possible.</div>
                </div>

                <div className="mb-4">
                  <label className="form-label fw-semibold text-dark">
                    <i className="bi bi-hash me-2 text-emerald"></i>Quantity (Number of Items)
                  </label>
                  <input
                    type="number"
                    min="1"
                    className="form-control rounded-3 py-2 px-3"
                    required
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </div>

                <div className="row g-3 mb-4">
                  <div className="col-md-6">
                    <label className="form-label fw-semibold text-dark">
                      <i className="bi bi-calendar-event me-2 text-emerald"></i>Preferred Pickup Date
                    </label>
                    <input
                      type="date"
                      className="form-control rounded-3 py-2 px-3"
                      required
                      value={pickupDate}
                      onChange={(e) => setPickupDate(e.target.value)}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-semibold text-dark">
                      <i className="bi bi-clock me-2 text-emerald"></i>Preferred Pickup Time
                    </label>
                    <input
                      type="time"
                      className="form-control rounded-3 py-2 px-3"
                      required
                      value={pickupTime}
                      onChange={(e) => setPickupTime(e.target.value)}
                    />
                  </div>
                </div>

                <div className="d-flex align-items-center justify-content-between pt-3 border-top">
                  <Link to="/dashboard" className="btn btn-light rounded-pill px-4 text-muted fw-semibold">
                    Cancel
                  </Link>
                  <button type="submit" className="btn btn-emerald rounded-pill px-5 fw-semibold shadow-sm" disabled={loading}>
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Submitting...
                      </>
                    ) : (
                      'Submit Pickup Request'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestPickup;
