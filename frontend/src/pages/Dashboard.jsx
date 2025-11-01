import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Dashboard() {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Welcome, {user?.emailId || 'Patient'}!</h2>
      <p>This is your personalized dashboard for the Dental Hospital Management System.</p>

      <div className="row mt-5">
        
        <div className="col-md-4 mb-4">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h5 className="card-title">Manage Appointments</h5>
              <p className="card-text">View status of past and future appointments, or request a new one.</p>
              <Link to="/patients/my-appointments" className="btn btn-primary">
                View Appointments
              </Link>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h5 className="card-title">My Profile</h5>
              <p className="card-text">Update your personal and contact information.</p>
              <Link to="/patients/profile" className="btn btn-primary">
                View/Edit Profile
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
