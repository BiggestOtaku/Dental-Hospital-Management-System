import React, { useState, useEffect } from 'react';
import api from '../services/api'; 
import { Link, useNavigate } from 'react-router-dom';

export default function ViewAppointmentsPage() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0); 
  const [totalPages, setTotalPages] = useState(0);

  const [sortBy, setSortBy] = useState('date');
  const [sortDir, setSortDir] = useState('DESC'); 

  const [searchId, setSearchId] = useState('');
  const navigate = useNavigate();
  const handleSearchSubmit = (e) => {
    e.preventDefault(); 
    const idToNavigate = searchId.trim(); 
    if (idToNavigate && !isNaN(idToNavigate)) { 
      navigate(`/admin/appointments/${idToNavigate}`);
    } else {
      alert('Please enter a valid Appointment ID (number).');
      setSearchId(''); 
    }
  };

  async function fetchAppointments(page = 0, currentSortBy = sortBy, currentSortDir = sortDir) {
    try {
      setLoading(true);
      setError(null);

      const sortParam = `${currentSortBy},${currentSortDir.toLowerCase()}`;
      
      const response = await api.get(`/admin/appointments?page=${page}&sort=${sortParam}`);
      
      setAppointments(response.data.content || []);
      setCurrentPage(response.data.number);
      setTotalPages(response.data.totalPages);
      
    } catch (err) {
      console.error("Error fetching appointments:", err);
      setError(err.message || 'Failed to fetch appointments. Check backend console.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchAppointments(0, sortBy, sortDir);
  }, [sortBy, sortDir]);

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      fetchAppointments(currentPage + 1, sortBy, sortDir);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      fetchAppointments(currentPage - 1, sortBy, sortDir);
    }
  };

  const handleSort = (column) => {
    if (column === sortBy) {
      const newSortDir = sortDir === 'ASC' ? 'DESC' : 'ASC';
      setSortDir(newSortDir);
    } else {
      setSortBy(column);
      setSortDir('DESC');
    }
  };


  if (loading) {
    return <div className="container"><h3>Loading appointments...</h3></div>;
  }

  if (error) {
    return <div className="container alert alert-danger">
      <strong>Error:</strong> {error}
    </div>;
  }

  const getSortIndicator = (column) => {
    if (column !== sortBy) return null; 
    return sortDir === 'ASC' ? ' ▲' : ' ▼';
  };

  return (
    <div className="container">
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h2>All Appointments</h2>
        <Link to="/admin" className="btn btn-secondary">
          &larr; Back to Admin
        </Link>
      </div>
      <form onSubmit={handleSearchSubmit} className="input-group mb-3">
        <input
          type="search" 
          className="form-control"
          placeholder="Search by Appointment ID..."
          aria-label="Search Appointment ID"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
        />
        <button className="btn btn-outline-secondary" type="submit">
          Go
        </button>
      </form>

      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th onClick={() => handleSort('appointmentId')} style={{ cursor: 'pointer' }}>
              Appt ID{getSortIndicator('appointmentId')}
            </th>
            <th>
              Patient Email ID
            </th>
            <th>
              Doctor Email ID
            </th>
            <th onClick={() => handleSort('date')} style={{ cursor: 'pointer' }}>
              Date{getSortIndicator('date')}
            </th>
            <th>Report</th> 
            <th onClick={() => handleSort('status')} style={{ cursor: 'pointer' }}>
              Status{getSortIndicator('status')}
            </th>
          </tr>
        </thead>
        <tbody>
          {appointments.length > 0 ? (
            appointments.map(app => (
              <tr key={app.appointmentId}>
                <td>
                  <Link to={`/admin/appointments/${app.appointmentId}`}>
                    {app.appointmentId}
                  </Link>
                </td>
                <td>{app.patientEmailId}</td>
                <td>{app.employeeEmailId}</td>
                <td>{app.date ? new Date(app.date).toLocaleString() : '-'}</td>
                <td>{app.report || '-'}</td>
                <td>{app.status || '-'}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">No appointments found.</td>
            </tr>
          )}
        </tbody>
      </table>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <p className="text-muted">
          Page <strong>{currentPage + 1}</strong> of <strong>{totalPages}</strong>
        </p>
        
        <nav>
          <ul className="pagination" style={{ margin: 0 }}>
            <li className={`page-item ${currentPage === 0 ? 'disabled' : ''}`}>
              <button className="page-link" onClick={handlePrevPage}>Previous</button>
            </li>
            <li className={`page-item ${currentPage >= totalPages - 1 ? 'disabled' : ''}`}>
              <button className="page-link" onClick={handleNextPage}>Next</button>
            </li>
          </ul>
        </nav>
      </div>
      
    </div>
  );
}