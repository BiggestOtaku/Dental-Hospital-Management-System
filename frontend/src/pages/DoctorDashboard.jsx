import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

/**
 * Main landing page for authenticated doctors.
 */
export default function DoctorDashboard() {
  const { user } = useContext(AuthContext);

  return (
    <div className="container mt-5 p-4 bg-white shadow rounded">
      <h1 className="display-5 fw-bold text-dark mb-3">
        Welcome, Doc!
      </h1>
      <p className="fs-5 text-muted mb-4">
        Your current tasks and performance metrics are summarized below.
      </p>

      <div className="row mt-4">
        <div className="col-md-4 mb-4">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h5 className="card-title">View Appointments</h5>
              <p className="card-text">View past and future appointments</p>
              <Link to="/doctor/appointments" className="btn btn-primary">
                My Appointments
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h5 className="card-title">My Assigned Camps</h5>
              <p className="card-text">Check dates and locations for upcoming camps.</p>
              <Link to="/doctor/camps" className="btn btn-success">
                View Camps
              </Link>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h5 className="card-title">My Profile</h5>
              <p className="card-text">Update your personal and contact information.</p>
              <Link to="/doctor/profile" className="btn btn-primary">
                View/Edit Profile
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
