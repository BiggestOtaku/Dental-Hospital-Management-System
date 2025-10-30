import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';

export default function AdminImplantBusinessPage() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [sortBy, setSortBy] = useState('implantId'); // Default sort
  const [sortDir, setSortDir] = useState('DESC');


  async function fetchRecords(page = 0, currentSortBy = sortBy, currentSortDir = sortDir) {
    try {
      setLoading(true);
      setError(null);

      const sortParam = `${currentSortBy},${currentSortDir.toLowerCase()}`;
      const response = await api.get(`/admin/implant-business?page=${page}&sort=${sortParam}`);

      setRecords(response.data.content || []);
      setCurrentPage(response.data.number);
      setTotalPages(response.data.totalPages);

    } catch (err) {
      console.error("Error fetching implant business records:", err);
      setError(err.response?.data?.message || err.message || 'Failed to fetch business records.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchRecords(0, sortBy, sortDir);
  }, [sortBy, sortDir]); 

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) fetchRecords(currentPage + 1, sortBy, sortDir);
  };

  const handlePrevPage = () => {
    if (currentPage > 0) fetchRecords(currentPage - 1, sortBy, sortDir);
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
    return <div className="container"><h3>Loading implant business records...</h3></div>;
  }

  if (error) {
    return <div className="container alert alert-danger"><strong>Error:</strong> {error}</div>;
  }

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h2>Implant Business Transactions</h2>
        <div>
          <Link to="/admin/implant-business/add" className="btn btn-primary me-2">
            + Add Transaction
          </Link>
          <Link to="/admin" className="btn btn-secondary">&larr; Back to Admin</Link>
        </div>
      </div>

      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th onClick={() => handleSort('implantId')} style={{ cursor: 'pointer' }}>Implant ID{getSortIndicator('implantId')}</th>
            <th onClick={() => handleSort('transactionId')} style={{ cursor: 'pointer' }}>Transaction ID{getSortIndicator('transactionId')}</th>
            <th onClick={() => handleSort('quantity')} style={{ cursor: 'pointer' }}>Quantity{getSortIndicator('quantity')}</th>
            <th onClick={() => handleSort('soldBy')} style={{ cursor: 'pointer' }}>Sold By{getSortIndicator('soldBy')}</th>
            <th onClick={() => handleSort('broughtBy')} style={{ cursor: 'pointer' }}>Brought By{getSortIndicator('broughtBy')}</th>
          </tr>
        </thead>
        <tbody>
          {records.length > 0 ? (
            records.map(rec => (
              <tr key={`${rec.implantId}-${rec.transactionId}`}>
                <td>
                  <Link to={`/admin/implants/${rec.implantId}`}>{rec.implantId}</Link>
                </td>
                <td>
                  <Link to={`/admin/transactions/${rec.transactionId}`}>{rec.transactionId}</Link>
                </td>
                <td>{rec.quantity}</td>
                <td>{rec.soldBy || 'N/A'}</td>
                <td>{rec.broughtBy || 'N/A'}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">No business records found.</td>
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