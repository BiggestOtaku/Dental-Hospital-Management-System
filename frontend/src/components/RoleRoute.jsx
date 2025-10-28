// src/components/RoleRoute.jsx
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

/**
 * RoleRoute restricts children to a user with one of allowedRoles.
 * allowedRoles: array of strings e.g. ['DOCTOR'] or ['PATIENT']
 */
export default function RoleRoute({ allowedRoles = [], children }) {
  const { user } = useContext(AuthContext);

  if (!user) return <Navigate to="/login" replace />;

  // user.role might be string or nested, adapt if necessary
  const role = (user.role || user.authorities || user.roles || '').toString().toUpperCase();

  // if allowedRoles empty => allow any authenticated user
  if (allowedRoles.length === 0) return children;

  // check membership (case-insensitive)
  const matches = allowedRoles.some(r => role.includes(r.toString().toUpperCase()));
  if (!matches) return <Navigate to="/" replace />;

  return children;
}
