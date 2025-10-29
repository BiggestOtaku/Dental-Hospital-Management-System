import React, { useState, useEffect } from 'react';
import api from '../services/api'; // Your configured Axios instance
import { Link, useNavigate } from 'react-router-dom';

export default function ViewAppointmentsPage() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- Pagination State ---
  const [currentPage, setCurrentPage] = useState(0); // Spring Page is 0-indexed
  const [totalPages, setTotalPages] = useState(0);

  // --- 1. ADD STATE FOR SORTING ---
  const [sortBy, setSortBy] = useState('date'); // Default sort column
  const [sortDir, setSortDir] = useState('DESC'); // Default sort direction

  const [searchId, setSearchId] = useState('');
  const navigate = useNavigate();
  const handleSearchSubmit = (e) => {
    e.preventDefault(); // Prevent form submission from reloading page
    const idToNavigate = searchId.trim(); // Remove leading/trailing spaces
    if (idToNavigate && !isNaN(idToNavigate)) { // Check if it's a non-empty number
      navigate(`/admin/appointments/${idToNavigate}`);
    } else {
      alert('Please enter a valid Appointment ID (number).');
      setSearchId(''); // Clear invalid input
    }
  };

  // 2. UPDATE fetchAppointments TO ACCEPT SORT PARAMETERS
  async function fetchAppointments(page = 0, currentSortBy = sortBy, currentSortDir = sortDir) {
    try {
      setLoading(true);
      setError(null);

      // Construct the sort parameter string (e.g., "date,desc")
      const sortParam = `${currentSortBy},${currentSortDir.toLowerCase()}`;
      
      // Add both page and sort parameters to the URL
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

  // Fetch data on initial load and whenever sort changes
  useEffect(() => {
    // We pass the current sort state here
    fetchAppointments(0, sortBy, sortDir);
  }, [sortBy, sortDir]); // 👈 3. RE-FETCH WHEN SORT CHANGES

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      // Pass current sort state when changing page
      fetchAppointments(currentPage + 1, sortBy, sortDir);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      // Pass current sort state when changing page
      fetchAppointments(currentPage - 1, sortBy, sortDir);
    }
  };

  // --- 4. ADD HANDLER FOR SORTING ---
  const handleSort = (column) => {
    // If clicking the same column, toggle direction
    if (column === sortBy) {
      const newSortDir = sortDir === 'ASC' ? 'DESC' : 'ASC';
      setSortDir(newSortDir);
      // setSortBy(column); // Not needed as it's the same column
      // useEffect will trigger the fetch
    } else {
      // If clicking a new column, sort by it descending by default
      setSortBy(column);
      setSortDir('DESC');
      // useEffect will trigger the fetch
    }
  };

  // --- Render Logic ---

  if (loading) {
    return <div className="container"><h3>Loading appointments...</h3></div>;
  }

  if (error) {
    return <div className="container alert alert-danger">
      <strong>Error:</strong> {error}
    </div>;
  }

  // Helper function to show sort indicators
  const getSortIndicator = (column) => {
    if (column !== sortBy) return null; // No indicator if not sorted by this column
    return sortDir === 'ASC' ? ' ▲' : ' ▼'; // Up or down arrow
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
          type="search" // Use type="search" for better semantics
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
            {/* Make headers clickable for sorting */}
            <th onClick={() => handleSort('appointmentId')} style={{ cursor: 'pointer' }}>
              Appt ID{getSortIndicator('appointmentId')}
            </th>
            <th onClick={() => handleSort('patientId')} style={{ cursor: 'pointer' }}>
              Patient ID{getSortIndicator('patientId')}
            </th>
            <th onClick={() => handleSort('employeeId')} style={{ cursor: 'pointer' }}>
              Doctor ID{getSortIndicator('employeeId')}
            </th>
            {/* 5. MAKE DATE HEADER CLICKABLE */}
            <th onClick={() => handleSort('date')} style={{ cursor: 'pointer' }}>
              Date{getSortIndicator('date')}
            </th>
            <th>Report</th> {/* Not sortable in this example */}
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
                <td>{app.patientId}</td>
                <td>{app.employeeId}</td>
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

      {/* Pagination controls (unchanged) */}
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