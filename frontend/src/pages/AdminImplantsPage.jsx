import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';

export default function AdminImplantsPage() {
  const [implants, setImplants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [sortBy, setSortBy] = useState('implantID'); 
  const [sortDir, setSortDir] = useState('ASC');//Ascending isliye kiyonki IDs se h

  async function fetchImplants(page = 0, currentSortBy = sortBy, currentSortDir = sortDir) {
    try {
      setLoading(true);
      setError(null);

      const sortParam = `${currentSortBy},${currentSortDir.toLowerCase()}`;
      const response = await api.get(`/admin/implants?page=${page}&sort=${sortParam}`);

      setImplants(response.data.content || []);
      setCurrentPage(response.data.number);
      setTotalPages(response.data.totalPages);

    } catch (err) {
      console.error("Error fetching implants:", err);
      setError(err.response?.data?.message || err.message || 'Failed to fetch implants.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchImplants(0, sortBy, sortDir);
  }, [sortBy, sortDir]); // refetch hoga sort krne pe

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      fetchImplants(currentPage + 1, sortBy, sortDir);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      fetchImplants(currentPage - 1, sortBy, sortDir);
    }
  };

  const handleSort = (column) => {
    if (column === sortBy) {
      const newSortDir = sortDir === 'ASC' ? 'DESC' : 'ASC';
      setSortDir(newSortDir);
    } else {
      setSortBy(column);
      setSortDir(column === 'implantID' ? 'ASC' : 'DESC'); 
    }
  };

  const getSortIndicator = (column) => {
    if (column !== sortBy) return null;
    return sortDir === 'ASC' ? ' ▲' : ' ▼';
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
    return <div className="container"><h3>Loading implants...</h3></div>;
  }

  if (error) {
    return <div className="container alert alert-danger"><strong>Error:</strong> {error}</div>;
  }

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h2>Implant Inventory</h2>
        <div>
          <Link to="/admin/implants/add" className="btn btn-primary me-2">
            + Add Implant
          </Link>
          <Link to="/admin" className="btn btn-secondary">&larr; Back to Admin</Link>
        </div>
      </div>

      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th onClick={() => handleSort('implantID')} style={{ cursor: 'pointer' }}>
              ID{getSortIndicator('implantID')}
            </th>
            <th onClick={() => handleSort('type')} style={{ cursor: 'pointer' }}>
              Type{getSortIndicator('type')}
            </th>
            <th onClick={() => handleSort('size')} style={{ cursor: 'pointer' }}>
              Size{getSortIndicator('size')}
            </th>
            <th onClick={() => handleSort('price')} style={{ cursor: 'pointer' }}>
              Price{getSortIndicator('price')}
            </th>
             <th onClick={() => handleSort('available')} style={{ cursor: 'pointer' }}>
              Available{getSortIndicator('available')}
            </th>
             <th onClick={() => handleSort('maximumQuantity')} style={{ cursor: 'pointer' }}>
              Max Qty{getSortIndicator('maximumQuantity')}
            </th>
             <th onClick={() => handleSort('sterilizationDate')} style={{ cursor: 'pointer' }}>
              Sterilization Date{getSortIndicator('sterilizationDate')}
            </th>
            <th>Expiry Period</th> 
          </tr>
        </thead>
        <tbody>
          {implants.length > 0 ? (
            implants.map(implant => (
              <tr key={implant.implantID}>
                <td>
                  <Link to={`/admin/implants/${implant.implantID}`}>
                     {implant.implantID}
                  </Link>
                 </td>
                <td>{implant.type || 'N/A'}</td>
                <td>{implant.size || 'N/A'}</td>
                <td>{implant.price != null ? `$${Number(implant.price).toFixed(2)}` : 'N/A'}</td>
                <td>{implant.available ?? 'N/A'}</td>
                <td>{implant.maximumQuantity ?? 'N/A'}</td>
                <td>{formatDate(implant.sterilizationDate)}</td>
                <td>{implant.expiryPeriod != null ? `${implant.expiryPeriod} units` : 'N/A'}</td> 
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="text-center">No implants found.</td>
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