import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';

export default function PatientHistoryPage() {
  const { patientId } = useParams();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [patientName, setPatientName] = useState(`Patient ${patientId}`);

  const fetchHistory = useCallback(async () => {
    if (!patientId) {
      setError('Patient ID is missing.');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const res = await api.get(`/appointments/patient/${patientId}`); 
      setHistory(res.data.content || []);
      if (res.data.content.length > 0) setPatientName(res.data.content[0].patientEmailId || `Patient ${patientId}`);
      console.log(history)
    } catch (err) {
      console.error('Error fetching patient history:', err);
      setError('Failed to load patient history.');
    } finally {
      setLoading(false);
    }
  }, [patientId]);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  if (loading) return <div className="text-center mt-5 fs-5">Loading history for {patientName}...</div>;
  if (error) return <div className="alert alert-danger mt-4 p-3">{error}</div>;

  return (
    <div className="container mt-4 p-4 bg-white rounded shadow">
      <h2 className="h3 fw-bold text-dark mb-2">Appointment History</h2>
      <p className="fs-5 text-primary mb-4 fw-semibold">Viewing Records for: {patientName}</p>

      {history.length === 0 && (
        <div className="alert alert-info p-3">No past appointments found for this patient.</div>
      )}

      {history.length > 0 && (
        <div className="d-flex flex-column gap-3">
          {history.map((record, index) => (
            <div key={record.appointmentId} className="p-3 border rounded bg-light shadow-sm">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <p className="fs-6 fw-semibold text-dark mb-1">Appointment on {record.date}</p>
                  <p className="text-muted small mb-1">Treated by: {record.employeeEmailId}</p>
                  <p className="text-muted small mb-1">
                    Diagnosis/Report: <span className="fw-medium text-dark">{record.report}</span>
                  </p>
                  <p className="text-muted small mb-0">
                    Amount: <span className="fw-medium text-dark">₹{record.amount}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
