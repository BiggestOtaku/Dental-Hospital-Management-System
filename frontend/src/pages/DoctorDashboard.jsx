import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

/**
 * Main landing page for authenticated doctors.
 */
export default function DoctorDashboard() {
  const { user } = useContext(AuthContext);

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-xl rounded-2xl">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
        Welcome, Doc!
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        Your current tasks and performance metrics are summarized below.
      </p>

      <div className="row mt-5">
        
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
