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
import AdminDashboard from './pages/AdminDashboard';
import ViewAppointmentsPage from './pages/ViewAppointmentsPage.jsx';
import AppointmentDetailPage from './pages/AppointmentDetailPage';
import AdminTransactionsPage from './pages/AdminTransactionsPage.jsx';
import AddTransactionPage from './pages/AddTransactionPage.jsx';
import TransactionDetailPage from './pages/TransactionDetailPage';
import AdminCampsPage from './pages/AdminCampsPage.jsx';
import CampDetailPage from './pages/CampDetailPage.jsx';
import AddCampPage from './pages/AddCampPage.jsx';  
import EditAppointmentPage from './pages/EditAppointmentPage.jsx';
import AdminImplantsPage from './pages/AdminImplantsPage.jsx';
import AddImplantPage from './pages/AddImplantPage.jsx';
import ImplantDetailPage from './pages/ImplantDetailPage.jsx';
import EditImplantPage from './pages/EditImplantPage.jsx';
import AdminEmployeesPage from './pages/AdminEmployeesPage.jsx';
import EmployeeDetailPage from './pages/EmployeeDetailPage.jsx';
import EditEmployeePage from './pages/EditEmployeePage.jsx';
import AdminRawMaterialsPage from './pages/AdminRawMaterialsPage.jsx';
import AddRawMaterialPage from './pages/AddRawMaterialPage.jsx';
import RawMaterialDetailPage from './pages/RawMaterialDetailPage.jsx';
import EditRawMaterialPage from './pages/EditRawMaterialPage.jsx';

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
        <Route path="admin/camps" element={<AdminCampsPage />} />
        <Route path="admin/camps/:id" element={<CampDetailPage />} />
        <Route path="admin/camps/add" element={<AddCampPage />} />
        <Route path="admin/appointments/edit/:id" element={<EditAppointmentPage />} />
        <Route path="admin/implants" element={<AdminImplantsPage />} />
        <Route path="admin/implants/add" element={<AddImplantPage />} />
        <Route path="admin/implants/:id" element={<ImplantDetailPage />} />
        <Route path="admin/implants/edit/:id" element={<EditImplantPage />} />
        <Route path="admin/employees" element={<AdminEmployeesPage />} />
        <Route path="admin/employees/edit/:email" element={<EditEmployeePage />} />
        <Route path="admin/employees/:email" element={<EmployeeDetailPage />} />
        <Route path="admin/raw-materials" element={<AdminRawMaterialsPage />} />
        <Route path="admin/raw-materials/add" element={<AddRawMaterialPage />} />
        <Route path="admin/raw-materials/:id" element={<RawMaterialDetailPage />} />
        <Route path="admin/raw-materials/edit/:id" element={<EditRawMaterialPage />} />


  


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
