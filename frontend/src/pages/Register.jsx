import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      await axios.post('http://localhost:5000/api/auth/register', {
        name,
        email,
        password,
      });

      setSuccess('Account created successfully! Redirecting to login...');
      setTimeout(() => {
        history.push('/login');
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center py-5" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #064e3b 50%, #022c22 100%)' }}>
      <div className="row w-100 justify-content-center">
        <div className="col-11 col-sm-9 col-md-7 col-lg-5 col-xl-4">
          <div className="card border-0 shadow-lg rounded-4 p-4 p-md-5 glass-card">
            <div className="text-center mb-4">
              <div className="display-4 mb-2">🌱</div>
              <h2 className="fw-bold text-dark mb-1">Create Account</h2>
              <p className="text-muted small">Join EcoDispose to recycle your electronics</p>
            </div>

            {error && (
              <div className="alert alert-danger d-flex align-items-center rounded-3 py-2 px-3 mb-4" role="alert">
                <i className="bi bi-exclamation-triangle-fill me-2 fs-5"></i>
                <div className="small">{error}</div>
              </div>
            )}

            {success && (
              <div className="alert alert-success d-flex align-items-center rounded-3 py-2 px-3 mb-4" role="alert">
                <i className="bi bi-check-circle-fill me-2 fs-5"></i>
                <div className="small">{success}</div>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label fw-semibold text-secondary small">Full Name</label>
                <div className="input-group">
                  <span className="input-group-text bg-light border-end-0 rounded-start-3 text-muted">
                    <i className="bi bi-person"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control bg-light border-start-0 rounded-end-3 py-2"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold text-secondary small">Email Address</label>
                <div className="input-group">
                  <span className="input-group-text bg-light border-end-0 rounded-start-3 text-muted">
                    <i className="bi bi-envelope"></i>
                  </span>
                  <input
                    type="email"
                    className="form-control bg-light border-start-0 rounded-end-3 py-2"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="form-label fw-semibold text-secondary small">Password</label>
                <div className="input-group">
                  <span className="input-group-text bg-light border-end-0 rounded-start-3 text-muted">
                    <i className="bi bi-lock"></i>
                  </span>
                  <input
                    type="password"
                    className="form-control bg-light border-start-0 rounded-end-3 py-2"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Choose a password"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-emerald w-100 py-2.5 rounded-3 mb-3 fw-semibold fs-6 shadow-sm"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Creating Account...
                  </>
                ) : (
                  'Register'
                )}
              </button>
            </form>

            <div className="text-center mt-3">
              <span className="text-muted small">Already have an account? </span>
              <Link to="/login" className="text-success fw-bold text-decoration-none small">
                Sign in here
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
