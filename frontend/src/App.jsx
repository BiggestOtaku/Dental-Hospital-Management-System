// src/App.jsx
import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Dashboard from './pages/Dashboard';
import PatientsPage from './pages/PatientsPage';
import ProfilePage from './pages/ProfilePage';
import PrivateRoute from './components/PrivateRoute';
import Header from './components/Header';
import LogoutPage from './pages/LogoutPage';

/**
 * Layout component used for all protected pages.
 * Header is shown and the page content is rendered inside .container
 */
function Layout() {
  return (
    <div className="app-shell">
      <Header />
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/logout" element={<LogoutPage />} />
      {/* Protected routes: wrap the Layout with PrivateRoute so all children require auth */}
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Layout />
          </PrivateRoute>
        }
      >
        {/* index route => /  */}
        <Route index element={<Dashboard />} />

        {/* /patients and nested create */}
        <Route path="patients" element={<PatientsPage />} />
        <Route path="patients/profile" element={<ProfilePage />} />

        {/* Add more protected routes here as you implement them */}
      </Route>

      {/* Fallback: redirect unknown paths to login (or to / if you prefer) */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
