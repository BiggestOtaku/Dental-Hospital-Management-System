import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Dashboard from './pages/Dashboard';
import PatientsPage from './pages/PatientsPage';
import NewPatientPage from './pages/NewPatientPage';
import PrivateRoute from './components/PrivateRoute';
import Header from './components/Header';
import LogoutPage from './pages/LogoutPage';
import AdminDashboard from './pages/AdminDashboard';
import ViewAppointmentsPage from './pages/ViewAppointmentsPage.jsx';
import AppointmentDetailPage from './pages/AppointmentDetailPage';
import AdminTransactionsPage from './pages/AdminTransactionsPage.jsx';
import AddTransactionPage from './pages/AddTransactionPage.jsx';
import TransactionDetailPage from './pages/TransactionDetailPage';
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

        {/* /admin route */}
        <Route path="admin" element={<AdminDashboard />} />
      
        <Route path="admin/appointments" element={<ViewAppointmentsPage />} />
        <Route path="admin/appointments/:id" element={<AppointmentDetailPage />} />

        <Route path="admin/transactions" element={<AdminTransactionsPage />} />
        <Route path="admin/transactions/add" element={<AddTransactionPage />} />
        <Route path="admin/transactions/:id" element={<TransactionDetailPage />} />


  


        {/* /patients and nested create */}
        <Route path="patients" element={<PatientsPage />} />
        <Route path="patients/new" element={<NewPatientPage />} />

        {/* Add more protected routes here as you implement them */}
      </Route>

      {/* Fallback: redirect unknown paths to login (or to / if you prefer) */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
