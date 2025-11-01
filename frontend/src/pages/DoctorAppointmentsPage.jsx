import React, { useState, useContext, useEffect, useCallback } from 'react';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { useParams, Link } from 'react-router-dom';

export default function DoctorAppointmentsPage() {
  const { user } = useContext(AuthContext);
  const doctorId = user?.userId || '456'; 
  
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const fetchAppointments = useCallback(async (pageNumber) => {
    if (!doctorId) return;

    setLoading(true);
    setError(null);
    try {
      // Backend fetches appointments by doctorId
      const res = await api.get(`/appointments/doctor/${doctorId}`, {
        params: { page: pageNumber, size: 5 } 
      });
      setAppointments(res.data.content || []);
      setTotalPages(res.data.totalPages || 0);
      setPage(pageNumber);

    } catch (err) {
      console.error('Error fetching appointments:', err);
      setError('Failed to load appointments. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [doctorId]);

  useEffect(() => {
    fetchAppointments(0);
  }, [fetchAppointments]);
//   console.log(appointments);
  if (loading) return <div className="text-center mt-10 text-lg">Loading appointments...</div>;
  if (error) return <div className="alert alert-danger p-4 bg-red-100 text-red-700 mt-10">{error}</div>;

  return (
    <div className="max-w-7xl mx-auto mt-5 p-6 bg-gray-50 rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">My Appointments</h2>
      
      {appointments.length === 0 && (
        <div className="alert alert-info p-4 bg-blue-100 text-blue-700 rounded-lg">You have no appointments scheduled.</div>
      )}

      {appointments.length > 0 && (
        <div className="overflow-x-auto shadow-md rounded-lg">
          <table className="min-w-full table-auto bg-white">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">ID</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Date/Time</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Patient</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Status</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Actions</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">History</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map(app => (
                <tr key={app.appointmentId} className="border-b hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 text-sm text-gray-800">{app.appointmentId}</td>
                  <td className="px-4 py-3 text-sm text-gray-800">{app.date} @ {app.startTime}</td>
                  <td className="px-4 py-3 text-sm text-gray-800">{app.patientEmailId}</td>
                  <td className="px-4 py-3">
                    <span className={`badge rounded-pill ${
                        app.status === 'CONFIRMED' ? 'bg-success text-dark' :
                        app.status === 'PENDING' ? 'bg-warning text-dark' :
                        app.status === 'COMPLETED' ? 'bg-primary text-white' :
                        'bg-danger text-white'
                        }`}>
                      {app.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    
                  </td>
                  <td className="px-4 py-3 text-sm">
                     <a href={`/doctor/patients/${app.patientId}/history`} className="text-blue-500 hover:underline">
                        Patient History 
                     </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {/* Pagination Controls (Placeholder logic) */}
          <div className="flex justify-center mt-4">
            <button className="px-3 py-1 mx-1 bg-gray-300 rounded" disabled={page === 0} onClick={() => fetchAppointments(page - 1)}>&laquo;</button>
            <span className="px-3 py-1 mx-1">Page {page + 1} of {totalPages}</span>
            <button className="px-3 py-1 mx-1 bg-gray-300 rounded" disabled={page >= totalPages - 1} onClick={() => fetchAppointments(page + 1)}>&raquo;</button>
          </div>
        </div>
      )}
    </div>
  );
}
