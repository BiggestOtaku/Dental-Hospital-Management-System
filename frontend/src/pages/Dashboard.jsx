import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Dashboard() {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="container">
      <hr />
      <ul>
        <li><Link to="/patients">Patients</Link></li>
        <li><Link to="/appointments">Appointments (add later)</Link></li>
        {/* add other links as you implement pages */}
      </ul>
    </div>
  );
}
