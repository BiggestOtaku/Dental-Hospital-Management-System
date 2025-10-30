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
          to="/admin/raw-materials"
          className="list-group-item list-group-item-action"
        >
          Manage Raw Materials
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
        <Link
          to="/admin/implant-business"
          className="list-group-item list-group-item-action"
        >
          Manage Implant Businesses
        </Link>
      </div>
    </div>
  );
}