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


  if (loading) return <div className="text-center mt-10 text-lg">Loading history for {patientName}...</div>;
  if (error) return <div className="alert alert-danger p-4 bg-red-100 text-red-700 mt-10">{error}</div>;

  return (
    <div className="max-w-6xl mx-auto mt-5 p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-2">Appointment History</h2>
      <p className="text-xl text-indigo-600 mb-6 font-medium">Viewing Records for: {patientName}</p>

      {history.length === 0 && (
        <div className="alert alert-info p-4 bg-blue-100 text-blue-700 rounded-lg">No past appointments found for this patient.</div>
      )}

      {history.length > 0 && (
        <div className="space-y-4">
          {history.map((record, index) => (
            <div key={record.appointmentId} className="p-4 border border-gray-200 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-lg font-semibold text-gray-900 mb-1">Appointment on {record.date}</p>
                  <p className="text-sm text-gray-600">Treated by: {record.employeeEmailId}</p>
                  <p className="text-sm text-gray-600">Diagnosis/Report: <span className="font-medium text-gray-800">{record.report}</span></p>
                  <p className="text-sm text-gray-600">Amount: <span className="font-medium text-gray-800">₹{record.amount}</span></p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
