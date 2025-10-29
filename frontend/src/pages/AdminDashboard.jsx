import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

export default function AdminDashboardPage() {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <h2>Admin Dashboard</h2>
      {user && (
        <p className="lead">
          Welcome, <strong>{user.emailId || 'Admin'}</strong>!
        </p>
      )}

      <p>This is the central control panel. You can manage users, view system statistics, and access all administrative functions from here.</p>

      <hr />

      <h3>Admin Tools</h3>
      <div className="list-group">
        {/* These links are just examples. To make them work, you must:
          1. Create a component for each page (e.g., AdminDoctorsPage)
          2. Add the routes in your App.jsx (e.g., <Route path="admin/doctors" ... />)
        */}
        <Link
          to="/admin/employees"
          className="list-group-item list-group-item-action"
        >
          Manage Employees
        </Link>
        
        <Link
          to="/admin/appointments"
          className="list-group-item list-group-item-action"
        >
          View All Appointments
        </Link>
        <Link
          to="/admin/transactions"
          className="list-group-item list-group-item-action"
        >
          Manage Transactions
        </Link>
        <Link
          to="/admin/camps"
          className="list-group-item list-group-item-action"
        >
          Manage Camps
        </Link>
        <Link
          to="/admin/implants"
          className="list-group-item list-group-item-action"
        >
          Manage Implants
        </Link>
      </div>
    </div>
  );
}