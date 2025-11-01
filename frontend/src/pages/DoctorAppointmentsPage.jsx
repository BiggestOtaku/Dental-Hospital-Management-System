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
  const [search, setSearch] = useState('');
  const [sortField, setSortField] = useState('date');
  const [sortDir, setSortDir] = useState('asc');

  const fetchAppointments = useCallback(async (pageNumber) => {
    if (!doctorId) return;

    setLoading(true);
    setError(null);
    try {
      const res = await api.get(`/appointments/doctor/${doctorId}`, {
        params: { 
          page: pageNumber, 
          size: 5,
          sort: `${sortField},${sortDir}`,
          search: search.trim() || undefined
        } 
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
  }, [doctorId, sortField, sortDir]);

  useEffect(() => {
    fetchAppointments(0);
  }, [fetchAppointments]);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDir('asc');
    }
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    if (!doctorId) return;

    setLoading(true);
    setError(null);
    try {
      const res = await api.get(`/appointments/doctor/${doctorId}`, {
        params: { 
          page: 0, 
          size: 5,
          sort: undefined,
          search: search.trim() || undefined
        } 
      });
      setAppointments(res.data.content || []);
      setTotalPages(res.data.totalPages || 0);
      setPage(0);
      console.log(res.data);
    } catch (err) {
      console.error('Error fetching appointments:', err);
      setError('Failed to load appointments. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center mt-4 fs-5">Loading appointments...</div>;
  if (error) return <div className="alert alert-danger mt-4 p-3">{error}</div>;

  return (
    <div className="container mt-4 p-4 bg-light rounded shadow">
      <h2 className="h3 fw-bold text-dark mb-4">My Appointments</h2>

      {/* Search Bar */}
      <div className="input-group mb-3">
        <input
          type="search" 
          className="form-control"
          placeholder="Search by Patient's Email ID..."
          aria-label="Search Patient email ID"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSearchSubmit(e);
            }
          }}
        />
        <button
          className="btn btn-outline-secondary"
          type="button" // prevent default form submission
          onClick={(e) => handleSearchSubmit(e)}
        >
          Go
        </button>
      </div>

      
      {appointments.length === 0 && (
        <div className="alert alert-info p-3">You have no appointments scheduled.</div>
      )}

      {appointments.length > 0 && (
        <div className="table-responsive shadow-sm rounded">
          <table className="table table-bordered bg-white">
            <thead className="table-secondary">
              <tr>
                <th className="py-2" onClick={() => handleSort('appointmentId')} style={{cursor: 'pointer'}}>
                  ID {sortField === 'appointmentId' && (sortDir === 'asc' ? '▲' : '▼')}
                </th>
                <th className="py-2" onClick={() => handleSort('date')} style={{cursor: 'pointer'}}>
                  Date/Time {sortField === 'date' && (sortDir === 'asc' ? '▲' : '▼')}
                </th>
                <th className="py-2" onClick={() => handleSort('patientEmailId')} style={{cursor: 'pointer'}}>
                  Patient {sortField === 'patientEmailId' && (sortDir === 'asc' ? '▲' : '▼')}
                </th>
                <th className="py-2" onClick={() => handleSort('status')} style={{cursor: 'pointer'}}>
                  Status {sortField === 'status' && (sortDir === 'asc' ? '▲' : '▼')}
                </th>
                <th className="py-2">Actions</th>
                <th className="py-2">History</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map(app => (
                <tr key={app.appointmentId} className="align-middle">
                  <td className="py-2">{app.appointmentId}</td>
                  <td className="py-2">{app.date} @ {app.startTime}</td>
                  <td className="py-2">{app.patientEmailId}</td>
                  <td className="py-2">
                    <span
                      className={`badge rounded-pill ${
                        app.status === 'CONFIRMED'
                          ? 'bg-success text-dark'
                          : app.status === 'PENDING'
                          ? 'bg-warning text-dark'
                          : app.status === 'COMPLETED'
                          ? 'bg-primary text-white'
                          : 'bg-danger text-white'
                      }`}
                    >
                      {app.status}
                    </span>
                  </td>
                  <td className="py-2"></td>
                  <td className="py-2">
                    <a href={`/doctor/patients/${app.patientId}/history`} className="text-primary text-decoration-underline">
                      Patient History
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination Controls */}
          <div className="d-flex justify-content-center align-items-center mt-3">
            <button
              className="btn btn-secondary btn-sm mx-1"
              disabled={page === 0}
              onClick={() => fetchAppointments(page - 1)}
            >
              &laquo;
            </button>
            <span className="mx-2">Page {page + 1} of {totalPages}</span>
            <button
              className="btn btn-secondary btn-sm mx-1"
              disabled={page >= totalPages - 1}
              onClick={() => fetchAppointments(page + 1)}
            >
              &raquo;
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
