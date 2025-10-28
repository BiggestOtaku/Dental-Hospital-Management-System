import React, { useState, useEffect } from 'react';
import api from '../services/api'; 
import { Link } from 'react-router-dom';

export default function AdminCampsPage() {
  const [camps, setCamps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [sortBy, setSortBy] = useState('date'); 
  const [sortDir, setSortDir] = useState('DESC'); 

  async function fetchCamps(page = 0, currentSortBy = sortBy, currentSortDir = sortDir) {
    try {
      setLoading(true);
      setError(null);

      const sortParam = `${currentSortBy},${currentSortDir.toLowerCase()}`;
      const response = await api.get(`/admin/camps?page=${page}&sort=${sortParam}`);

      setCamps(response.data.content || []);
      setCurrentPage(response.data.number);
      setTotalPages(response.data.totalPages);

    } catch (err) {
      console.error("Error fetching camps:", err);
      setError(err.response?.data?.message || err.message || 'Failed to fetch camps.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCamps(0, sortBy, sortDir);
  }, [sortBy, sortDir]);//yeh isliye needed h kyunki usestate change hone pr firse fetch krna h data

  
  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      fetchCamps(currentPage + 1, sortBy, sortDir);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      fetchCamps(currentPage - 1, sortBy, sortDir);
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

  const getSortIndicator = (column) => {
    if (column !== sortBy) return null;
    return sortDir === 'ASC' ? ' ▲' : ' ▼';
  };

   const formatDateTime = (dateTimeString) => {
    if (!dateTimeString) return 'N/A';
    try {
      return new Date(dateTimeString).toLocaleString();
    } catch (e) {
      console.error("Error formatting date time:", dateTimeString, e);
      return 'Invalid Date';
    }
  };
   const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      
      return new Date(dateString + 'T00:00:00Z').toLocaleDateString();
    } catch (e) {
       console.error("Error formatting date:", dateString, e);
      return 'Invalid Date';
    }
  };

  if (loading) {
    return <div className="container"><h3>Loading camps...</h3></div>;
  }

  if (error) {
    return <div className="container alert alert-danger"><strong>Error:</strong> {error}</div>;
  }

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h2>All Camps</h2>
        <div>
          <Link to="/admin/camps/add" className="btn btn-primary me-2">
            + Add Camp
          </Link>
          <Link to="/admin" className="btn btn-secondary">&larr; Back to Admin</Link>
        </div>
      </div>

      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th onClick={() => handleSort('campId')} style={{ cursor: 'pointer' }}>
              ID{getSortIndicator('campId')}
            </th>
            <th onClick={() => handleSort('date')} style={{ cursor: 'pointer' }}>
              Date{getSortIndicator('date')}
            </th>
            <th onClick={() => handleSort('startTime')} style={{ cursor: 'pointer' }}>
              Start Time{getSortIndicator('startTime')}
            </th>
             <th onClick={() => handleSort('endTime')} style={{ cursor: 'pointer' }}>
              End Time{getSortIndicator('endTime')}
            </th>
            <th onClick={() => handleSort('city')} style={{ cursor: 'pointer' }}>
              City{getSortIndicator('city')}
            </th>
             <th onClick={() => handleSort('state')} style={{ cursor: 'pointer' }}>
              State{getSortIndicator('state')}
            </th>
            <th > 
              Transaction ID
            </th>
          </tr>
        </thead>
        <tbody>
          {camps.length > 0 ? (
            camps.map(camp => (
              <tr key={camp.campId}>
                <td>
                  <Link to={`/admin/camps/${camp.campId}`}>
                     {camp.campId}
                  </Link>
                 </td>
                <td>{formatDate(camp.date)}</td>
                <td>{formatDateTime(camp.startTime)}</td>
                <td>{formatDateTime(camp.endTime)}</td>
                <td>{camp.city || 'N/A'}</td>
                <td>{camp.state || 'N/A'}</td>
                <td>{camp.transaction?.transactionId || 'N/A'}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center">No camps found.</td>
            </tr>
          )}
        </tbody>
      </table>
      {/*pagination ke liye*/}
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