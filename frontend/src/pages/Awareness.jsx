import React from 'react';

const Awareness = () => {
  const commonItems = [
    { icon: 'bi-phone', title: 'Mobile Phones', text: 'Old smartphones, chargers and accessories should be collected separately for responsible recycling.' },
    { icon: 'bi-laptop', title: 'Computers & Laptops', text: 'Devices can contain recoverable metals and components that should not be sent to regular waste.' },
    { icon: 'bi-tv', title: 'Televisions & Monitors', text: 'Screens and electronic components require proper handling and specialized recycling.' },
    { icon: 'bi-keyboard', title: 'Accessories', text: 'Keyboards, mice, cables, headphones and other electronic accessories can also become e-waste.' },
  ];

  const steps = [
    { number: '01', title: 'Identify', text: 'Separate electronic items that are no longer useful from your regular household waste.' },
    { number: '02', title: 'Store Safely', text: 'Keep old devices in a dry, secure place and avoid damaging batteries or other components.' },
    { number: '03', title: 'Request Collection', text: 'Use EcoDispose to schedule a pickup or find a suitable collection centre.' },
    { number: '04', title: 'Recycle Responsibly', text: 'Ensure the e-waste reaches an authorized facility for safe processing and recovery.' },
  ];

  return (
    <div className="container-fluid px-4 py-4 w-100">
      <section className="rounded-4 p-4 p-md-5 mb-4 bg-emerald-light border-0 shadow-sm">
        <div className="row align-items-center g-4">
          <div className="col-lg-8">
            <span className="badge bg-emerald text-white rounded-pill px-3 py-2 mb-3">
              <i className="bi bi-lightbulb me-2"></i>Awareness & Education
            </span>
            <h1 className="fw-bold text-dark mb-3">Make every electronic device count.</h1>
            <p className="text-secondary mb-0 fs-5">
              Electronic waste should not end up in ordinary garbage. Learn how to handle,
              store and dispose of unwanted electronics responsibly through authorized recycling channels.
            </p>
          </div>
          <div className="col-lg-4 text-center">
            <div className="display-1">♻️</div>
            <div className="fw-bold text-emerald">Reduce • Reuse • Recycle</div>
          </div>
        </div>
      </section>

      <div className="row g-4 mb-4">
        <div className="col-lg-7">
          <div className="card h-100 border-0 shadow-sm rounded-4 p-4">
            <h4 className="fw-bold text-dark mb-3">
              <i className="bi bi-exclamation-triangle text-warning me-2"></i>Why proper e-waste disposal matters
            </h4>
            <p className="text-secondary">
              Electronic products can contain valuable materials as well as substances that may be
              harmful when waste is handled incorrectly. Responsible collection helps keep e-waste
              out of uncontrolled disposal and allows useful materials to be recovered.
            </p>
            <div className="row g-3 mt-1">
              <div className="col-sm-4">
                <div className="p-3 rounded-3 bg-light h-100">
                  <i className="bi bi-globe2 fs-3 text-success"></i>
                  <h6 className="fw-bold mt-2">Protect the environment</h6>
                  <p className="small text-muted mb-0">Reduce improper disposal of electronic waste.</p>
                </div>
              </div>
              <div className="col-sm-4">
                <div className="p-3 rounded-3 bg-light h-100">
                  <i className="bi bi-arrow-repeat fs-3 text-success"></i>
                  <h6 className="fw-bold mt-2">Recover resources</h6>
                  <p className="small text-muted mb-0">Enable useful materials and components to be recovered.</p>
                </div>
              </div>
              <div className="col-sm-4">
                <div className="p-3 rounded-3 bg-light h-100">
                  <i className="bi bi-people fs-3 text-success"></i>
                  <h6 className="fw-bold mt-2">Build awareness</h6>
                  <p className="small text-muted mb-0">Encourage safer and more responsible disposal habits.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-5">
          <div className="card h-100 border-0 shadow-sm rounded-4 p-4">
            <h4 className="fw-bold text-dark mb-3">
              <i className="bi bi-shield-check text-success me-2"></i>Safe disposal tips
            </h4>
            <ul className="list-group list-group-flush">
              <li className="list-group-item px-0">Do not mix e-waste with normal household garbage.</li>
              <li className="list-group-item px-0">Keep damaged batteries away from heat and moisture.</li>
              <li className="list-group-item px-0">Back up and remove personal data before handing over a device.</li>
              <li className="list-group-item px-0">Prefer authorized collection and recycling facilities.</li>
              <li className="list-group-item px-0">Reuse or repair working devices where practical.</li>
            </ul>
          </div>
        </div>
      </div>

      <section className="mb-4">
        <div className="d-flex justify-content-between align-items-end mb-3">
          <div>
            <h3 className="fw-bold text-dark mb-1">Common e-waste items</h3>
            <p className="text-muted small mb-0">Examples of electronics that may require responsible disposal.</p>
          </div>
        </div>
        <div className="row g-4">
          {commonItems.map((item) => (
            <div className="col-12 col-md-6 col-lg-3" key={item.title}>
              <div className="card h-100 border-0 shadow-sm rounded-4 p-4 hover-lift">
                <i className={`bi ${item.icon} fs-2 text-emerald mb-3`}></i>
                <h5 className="fw-bold">{item.title}</h5>
                <p className="text-muted small mb-0">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="card border-0 shadow-sm rounded-4 p-4 p-md-5 mb-4">
        <h3 className="fw-bold text-dark text-center mb-2">A simple responsible-disposal journey</h3>
        <p className="text-muted text-center mb-4">From identifying old electronics to sending them for recycling.</p>
        <div className="row g-4">
          {steps.map((step) => (
            <div className="col-12 col-md-6 col-lg-3" key={step.number}>
              <div className="text-center h-100">
                <div className="rounded-circle bg-emerald text-white d-inline-flex align-items-center justify-content-center fw-bold mb-3" style={{ width: 54, height: 54 }}>
                  {step.number}
                </div>
                <h5 className="fw-bold">{step.title}</h5>
                <p className="text-muted small mb-0">{step.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="alert alert-success border-0 rounded-4 shadow-sm d-flex align-items-start gap-3" role="alert">
        <i className="bi bi-info-circle-fill fs-4"></i>
        <div>
          <strong>Use EcoDispose responsibly.</strong>
          <div className="small mt-1">Find collection facilities and schedule an e-waste pickup instead of throwing electronics into regular waste.</div>
        </div>
      </div>
    </div>
  );
};

export default Awareness;
