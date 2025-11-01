import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function DoctorRoute({ children }) {
  const { user } = useContext(AuthContext);

    if(!user.role.includes('DOCTOR'))
      return <Navigate to="/" replace />;
    return children;
}
