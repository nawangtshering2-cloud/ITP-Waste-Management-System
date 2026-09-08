import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Centres = () => {
  const [centres, setCentres] = useState([]);
  const [filteredCentres, setFilteredCentres] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCentres();
  }, []);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredCentres(centres);
    } else {
      const q = searchQuery.toLowerCase();
      setFilteredCentres(
        centres.filter(
          (c) =>
            c.centreName.toLowerCase().includes(q) ||
            c.city.toLowerCase().includes(q) ||
            c.address.toLowerCase().includes(q)
        )
      );
    }
  }, [searchQuery, centres]);

  const fetchCentres = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/centres');
      setCentres(response.data);
      setFilteredCentres(response.data);
    } catch (err) {
      setError('Failed to fetch collection centres.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid px-4 py-4 w-100">
      {/* Header Banner */}
      <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between mb-4 gap-3">
        <div>
          <h2 className="fw-bold text-dark mb-1">🏢 E-Waste Collection Facilities</h2>
          <p className="text-muted small mb-0">Authorized recycling centers and drop-off depots near you</p>
        </div>
        <div className="col-12 col-md-4">
          <div className="input-group">
            <span className="input-group-text bg-white border-end-0 text-muted">
              <i className="bi bi-search"></i>
            </span>
            <input
              type="text"
              className="form-control bg-white border-start-0 py-2"
              placeholder="Search by city or centre name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {error && <div className="alert alert-danger rounded-3">{error}</div>}

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-emerald" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="text-muted mt-2 small">Loading collection facilities...</p>
        </div>
      ) : filteredCentres.length === 0 ? (
        <div className="card border-0 shadow-sm rounded-4 p-5 text-center bg-white">
          <div className="display-4 text-muted opacity-50 mb-3">🏢</div>
          <h5 className="fw-bold text-dark">No collection centres found</h5>
          <p className="text-muted small">Try searching for a different city or location name.</p>
        </div>
      ) : (
        <div className="row g-4">
          {filteredCentres.map((centre) => (
            <div className="col-12 col-md-6 col-lg-4" key={centre._id}>
              <div className="card h-100 border-0 shadow-sm rounded-4 hover-lift overflow-hidden bg-white">
                <div className="card-header bg-emerald-light border-0 py-3 px-4 d-flex align-items-center justify-content-between">
                  <span className="badge bg-emerald text-white px-3 py-1.5 rounded-pill fw-semibold">
                    <i className="bi bi-geo-alt-fill me-1"></i> {centre.city}
                  </span>
                  <span className="text-muted small fw-medium">Authorized Hub</span>
                </div>
                <div className="card-body p-4">
                  <h5 className="card-title fw-bold text-dark mb-3 d-flex align-items-start">
                    <i className="bi bi-buildings text-emerald me-2 fs-5"></i>
                    {centre.centreName}
                  </h5>

                  <div className="mb-3 text-secondary small">
                    <i className="bi bi-pin-map text-danger me-2"></i>
                    <strong>Address:</strong> {centre.address}
                  </div>

                  <div className="mb-3 text-secondary small">
                    <i className="bi bi-telephone text-primary me-2"></i>
                    <strong>Contact Phone:</strong>{' '}
                    <a href={`tel:${centre.phone}`} className="text-emerald text-decoration-none fw-semibold">
                      {centre.phone}
                    </a>
                  </div>
                </div>
                <div className="card-footer bg-light border-0 py-3 px-4 text-end">
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(centre.centreName + ' ' + centre.address)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-sm btn-outline-emerald rounded-pill px-3 fw-semibold"
                  >
                    <i className="bi bi-box-arrow-up-right me-1"></i>Directions
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Centres;
