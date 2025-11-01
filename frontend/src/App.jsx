import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Dashboard from './pages/Dashboard';
import DoctorDashboard from './pages/DoctorDashboard.jsx';
import DoctorAppointmentsPage from './pages/DoctorAppointmentsPage.jsx';
import PatientHistoryPage from './pages/PatientHistoryPage.jsx';
import PatientsPage from './pages/PatientsPage';
import ProfilePage from './pages/ProfilePage';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import Header from './components/Header';
import LogoutPage from './pages/LogoutPage';
import AdminDashboard from './pages/AdminDashboard';
import ViewAppointmentsPage from './pages/ViewAppointmentsPage.jsx';
import PatientAppointmentsPage from './pages/PatientAppointmentsPage.jsx';
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
import AddEmployeePage from './pages/AddEmployeePage.jsx';
import AdminImplantBusinessPage from './pages/AdminImplantBusinessPage.jsx';
import AddImplantBusinessPage from './pages/AddImplantBusinessPage.jsx';
import AdminCampEmployeePage from './pages/AdminCampEmployeePage.jsx';
import DoctorRoute from './components/DoctorRoute.jsx';
import DoctorCampsPage from './pages/DoctorCampsPage.jsx';
import AddCampPatientPage from './pages/AddCampPatientPage.jsx';
import PatientCampsPage from './pages/PatientCampsPage.jsx';


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

        <Route
        path="/"
        element={
          <AdminRoute>
            <Outlet />
          </AdminRoute>
        }
        >
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
       

          <Route path="admin/employees/add" element={<AddEmployeePage />} />
          <Route path="admin/implant-business" element={<AdminImplantBusinessPage />} />
          <Route path="admin/implant-business/add" element={<AddImplantBusinessPage />} />
          <Route path="admin/camp-employees" element={<AdminCampEmployeePage />} />
          <Route path="admin/camp-patients/add" element={<AddCampPatientPage />} />
        </Route>        


        {/* --- DOCTOR ROUTES (Protected by DoctorRoute) --- */}
        <Route
          path="/"
          element={
            <DoctorRoute>
              <Outlet />
            </DoctorRoute>
          }
        >
          <Route path="doctor" element={<DoctorDashboard />} /> 
          <Route path="doctor/appointments" element={<DoctorAppointmentsPage />} />
          <Route path="doctor/appointments/:id" element={<AppointmentDetailPage />} />
          <Route path="doctor/profile" element={<ProfilePage />} />
          <Route path="/doctor/patients/:patientId/history" element={<PatientHistoryPage />} />
          <Route path="doctor/camps" element={<DoctorCampsPage />} />

        </Route>


        {/* /patients and nested create */}
        <Route path="patients/my-appointments" element={<PatientAppointmentsPage />} /> 
        <Route path="patients" element={<PatientsPage />} />
        <Route path="patients/profile" element={<ProfilePage />} />
        <Route path="patients/camps" element={<PatientCampsPage />} />

      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
