import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';

export default function PatientCampsPage() {
  const [camps, setCamps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [sortBy, setSortBy] = useState('date');
  const [sortDir, setSortDir] = useState('DESC'); 

  const formatDateTime = (dateTimeString) => {
    if (!dateTimeString) return 'N/A';
    try {
      return new Date(dateTimeString).toLocaleString();
    } catch (e) { return 'Invalid Date'; }
  };
   const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString + 'T00:00:00Z').toLocaleDateString();
    } catch (e) { return 'Invalid Date'; }
  };

  async function fetchCamps(page = 0, currentSortBy = sortBy, currentSortDir = sortDir) {
    try {
      setLoading(true);
      setError(null);

      const sortParam = `${currentSortBy},${currentSortDir.toLowerCase()}`;
      const response = await api.get(`/patients/camps?page=${page}&sort=${sortParam}`);

      setCamps(response.data.content || []);
      setCurrentPage(response.data.number);
      setTotalPages(response.data.totalPages);

    } catch (err) {
      console.error("Error fetching general camps:", err);
      setError(err.response?.data?.message || err.message || 'Failed to fetch camp list.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCamps(0, sortBy, sortDir);
  }, [sortBy, sortDir]); 

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) fetchCamps(currentPage + 1, sortBy, sortDir);
  };

  const handlePrevPage = () => {
    if (currentPage > 0) fetchCamps(currentPage - 1, sortBy, sortDir);
  };

  const handleSort = (column) => {
    if (column === sortBy) {
      setSortDir(sortDir === 'ASC' ? 'DESC' : 'ASC');
    } else {
      setSortBy(column);
      setSortDir('ASC'); 
    }
  };

  const getSortIndicator = (column) => {
    if (column !== sortBy) return null;
    return sortDir === 'ASC' ? ' ▲' : ' ▼';
  };


  if (loading) {
    return <div className="container"><h3>Loading available camps...</h3></div>;
  }

  if (error) {
    return <div className="container alert alert-danger"><strong>Error:</strong> {error}</div>;
  }

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h2>Available Health Camps</h2>
        <Link to="/" className="btn btn-secondary">&larr; Back to Dashboard</Link>
      </div>

      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th onClick={() => handleSort('date')} style={{ cursor: 'pointer' }}>Date{getSortIndicator('date')}</th>
            <th>Time</th>
            <th onClick={() => handleSort('city')} style={{ cursor: 'pointer' }}>City{getSortIndicator('city')}</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {camps.length > 0 ? (
            camps.map(camp => (
              <tr key={camp.campId}>
                <td>{formatDate(camp.date)}</td>
                <td>{formatDateTime(camp.startTime)} - {formatDateTime(camp.endTime)}</td>
                <td>{camp.city || 'N/A'}, {camp.state || 'N/A'}</td>
                <td>{camp.addressDescription || 'N/A'} (PIN: {camp.pin || 'N/A'})</td>
               
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">No upcoming camps found.</td>
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
              <button className="page-link" onClick={handlePrevPage} disabled={currentPage === 0}>Previous</button>
            </li>
            <li className={`page-item ${currentPage >= totalPages - 1 ? 'disabled' : ''}`}>
              <button className="page-link" onClick={handleNextPage} disabled={currentPage >= totalPages - 1}>Next</button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}