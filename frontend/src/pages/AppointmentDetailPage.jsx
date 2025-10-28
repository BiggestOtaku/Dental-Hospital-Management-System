import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useParams, Link } from 'react-router-dom';

export default function AppointmentDetailPage() {
  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    async function fetchAppointmentDetails() {
      if (!id) return;

      try {
        setLoading(true);
        setError(null);

        const response = await api.get(`/admin/get-appointment/${id}`);
        setAppointment(response.data);
      } catch (err) {
        console.error("Error fetching appointment details:", err);
        setError(err.response?.data?.message || err.message || 'Failed to fetch appointment details.');
      } finally {
        setLoading(false);
      }
    }

    fetchAppointmentDetails();
  }, [id]);


  if (loading) {
    return <div className="container"><h3>Loading appointment details...</h3></div>;
  }

  if (error) {
    return <div className="container alert alert-danger">
      <strong>Error:</strong> {error}
      <br />
      <Link to="/admin/appointments" className="alert-link">Back to list</Link>
    </div>;
  }

  if (!appointment) {
    return (
      <div className="container alert alert-warning">
        Appointment not found or data is missing.
        <br />
        <Link to="/admin/appointments" className="alert-link">Back to list</Link>
      </div>
    );
  }

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h2>Appointment Details (ID: {appointment.appointmentId})</h2>
        <div>
        <Link to={`/admin/appointments/edit/${appointment.appointmentId}`} className="btn btn-warning me-2">
          Edit
        </Link>

        <Link to="/admin/appointments" className="btn btn-secondary">
          &larr; Back to List
        </Link>
        </div>
        
      </div>

      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Details</h5>
          <ul className="list-group list-group-flush">
            <li className="list-group-item"><strong>Date:</strong> {appointment.date ? new Date(appointment.date).toLocaleDateString() : 'N/A'}</li>
            <li className="list-group-item"><strong>Time:</strong> {appointment.startTime || 'N/A'} - {appointment.endTime || 'N/A'}</li>
            <li className="list-group-item"><strong>Status:</strong> {appointment.status || 'N/A'}</li>
            <li className="list-group-item"><strong>Patient ID:</strong> {appointment.patientId}</li>
            <li className="list-group-item"><strong>Patient Email:</strong> {appointment.patientEmailId || 'N/A'}</li>
            <li className="list-group-item"><strong>Doctor ID:</strong> {appointment.employeeId}</li>
            <li className="list-group-item"><strong>Doctor Email:</strong> {appointment.employeeEmailId || 'N/A'}</li>
            <li className="list-group-item"><strong>Amount:</strong> {appointment.amount != null ? `$${Number(appointment.amount).toFixed(2)}` : 'N/A'}</li>
            <li className="list-group-item"><strong>Payment Mode:</strong> {appointment.paymentMode || 'N/A'}</li>
            <li className="list-group-item"><strong>Report:</strong> <pre style={{ whiteSpace: 'pre-wrap', margin: 0, fontFamily: 'inherit' }}>{appointment.report || 'No report available.'}</pre></li>
          </ul>
        </div>
      </div>
    </div>
  );
}