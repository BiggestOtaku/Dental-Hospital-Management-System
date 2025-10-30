import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function AdminRoute({ children }) {
  const { user } = useContext(AuthContext);
      if(!user.role.includes('ADMIN'))
        return <Navigate to="/" replace />;
  return children;
}
