import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Centres = () => {
  const [centres, setCentres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCentres();
  }, []);

  const fetchCentres = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/centres');
      setCentres(response.data);
    } catch (err) {
      setError('Failed to fetch collection centres.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center text-success">🏢 E-Waste Collection Centres</h2>
      
      {error && <div className="alert alert-danger">{error}</div>}

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-success" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : centres.length === 0 ? (
        <div className="alert alert-warning text-center">No collection centres found.</div>
      ) : (
        <div className="row g-4">
          {centres.map((centre) => (
            <div className="col-md-4" key={centre._id}>
              <div className="card h-100 shadow-sm border-0 border-top border-4 border-success">
                <div className="card-body">
                  <h5 className="card-title text-success font-weight-bold">
                    📍 {centre.centreName}
                  </h5>
                  <p className="card-text mb-2">
                    <strong>Address:</strong> {centre.address}
                  </p>
                  <p className="card-text mb-2">
                    <strong>City:</strong> <span className="badge bg-secondary">{centre.city}</span>
                  </p>
                  <p className="card-text">
                    <strong>Phone:</strong> {centre.phone}
                  </p>
                </div>
                <div className="card-footer bg-transparent border-0 text-end">
                  <span className="text-muted small">Registered Facility</span>
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
