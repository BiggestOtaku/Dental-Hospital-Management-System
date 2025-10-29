import React, { useState, useEffect } from 'react';
import api from '../services/api'; 
import { Link } from 'react-router-dom';

export default function AdminRawMaterialsPage() {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

 
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [sortBy, setSortBy] = useState('materialName');
  const [sortDir, setSortDir] = useState('ASC');

  const [searchTerm, setSearchTerm] = useState('');

  async function fetchRawMaterials(page = 0, currentSortBy = sortBy, currentSortDir = sortDir, currentSearchTerm = '') {
    try {
      setLoading(true);
      setError(null);

      const sortParam = `${currentSortBy},${currentSortDir.toLowerCase()}`;
      let apiUrl = `/admin/raw-materials?page=${page}&sort=${sortParam}`;
      
      // If a search term is present, list wala h ye
      if (currentSearchTerm.trim()) {
          const response = await api.get(`/admin/get-raw-material/${currentSearchTerm.trim()}`);
          
          setMaterials(response.data || []); 
          setCurrentPage(0);
          setTotalPages(1);
          
          return; 
      }
      
      const response = await api.get(apiUrl);

      setMaterials(response.data.content || []);
      setCurrentPage(response.data.number);
      setTotalPages(response.data.totalPages);

    } catch (err) {
      console.error("Error fetching raw materials:", err);
      if (err.response?.status === 404 && currentSearchTerm) {
          setMaterials([]); 
          setError(`No raw materials found matching "${currentSearchTerm}".`);
          setCurrentPage(0);
          setTotalPages(0);
          return;
      }
      
      setError(err.response?.data?.message || err.message || 'Failed to fetch raw materials list.');
    } finally {
      setLoading(false);
    }
  }

  // Effect to fetch data on initial load or sort change
  useEffect(() => {
    fetchRawMaterials(0, sortBy, sortDir);
  }, [sortBy, sortDir]); 

  const handleNextPage = () => {
    if (searchTerm) return; // Disable pagination if searching
    if (currentPage < totalPages - 1) fetchRawMaterials(currentPage + 1, sortBy, sortDir, searchTerm);
  };

  const handlePrevPage = () => {
    if (searchTerm) return; // Disable pagination if searching
    if (currentPage > 0) fetchRawMaterials(currentPage - 1, sortBy, sortDir, searchTerm);
  };

  const handleSort = (column) => {
    if (column === sortBy) {
      setSortDir(sortDir === 'ASC' ? 'DESC' : 'ASC');
    } else {
      setSortBy(column);
      setSortDir('ASC');
    }
    //sort krne pr search clear krna h
    setSearchTerm('');
  };

  //Search Handler 
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const term = searchTerm.trim();
    if (!term) {
        fetchRawMaterials(0, sortBy, sortDir, '');
    } else {
        fetchRawMaterials(0, sortBy, sortDir, term);
    }
  };

  const getSortIndicator = (column) => {
    if (column !== sortBy) return null;
    return sortDir === 'ASC' ? ' ▲' : ' ▼';
  };

  if (loading) {
    return <div className="container"><h3>Loading raw materials...</h3></div>;
  }

  if (error) {
    return <div className="container alert alert-danger"><strong>Error:</strong> {error}</div>;
  }

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h2>Raw Materials Inventory</h2>
        <div>
          <Link to="/admin/raw-materials/add" className="btn btn-primary me-2">
            + Add New Material
          </Link>
          <Link to="/admin" className="btn btn-secondary">&larr; Back to Admin</Link>
        </div>
      </div>
      {/*search ka logic*/}
      <form onSubmit={handleSearchSubmit} className="input-group mb-3">
        <input
          type="search"
          className="form-control"
          placeholder="Search by Material Name..."
          aria-label="Search Material Name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="btn btn-primary" type="submit">
            Search
        </button>
        {searchTerm && (
            //ye clear search button h joh search result ke sath aaega
            <button className="btn btn-outline-secondary" type="button" onClick={() => {
                setSearchTerm('');
                fetchRawMaterials(0, sortBy, sortDir, ''); // Clear search, load page 0
            }}>
                Clear Search
            </button>
        )}
      </form>

      {searchTerm && (
          <div className="alert alert-info py-2">Showing results filtered by name: <strong>{searchTerm}</strong>. Pagination is disabled.</div>
      )}


      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th onClick={() => handleSort('materialId')} style={{ cursor: 'pointer' }}>ID{getSortIndicator('materialId')}</th>
            <th onClick={() => handleSort('materialName')} style={{ cursor: 'pointer' }}>Name{getSortIndicator('materialName')}</th>
            <th onClick={() => handleSort('unitPrice')} style={{ cursor: 'pointer' }}>Price{getSortIndicator('unitPrice')}</th>
            <th onClick={() => handleSort('available')} style={{ cursor: 'pointer' }}>Available Qty{getSortIndicator('available')}</th>
            <th>Max Qty</th>
            <th>Supplier Name</th>
            <th>Supplier City</th>
          </tr>
        </thead>
        <tbody>
          {materials.length > 0 ? (
            materials.map(mat => (
              <tr key={mat.materialId}>
                <td>
                  <Link to={`/admin/raw-materials/${mat.materialId}`}>{mat.materialId}</Link>
                </td>
                <td>{mat.materialName || 'N/A'}</td>
                <td>{mat.unitPrice != null ? `$${Number(mat.unitPrice).toFixed(2)}` : 'N/A'}</td>
                <td>{mat.available ?? 'N/A'}</td>
                <td>{mat.maximumQuantity ?? 'N/A'}</td>
                <td>{`${mat.supplierFirstName || ''} ${mat.supplierLastName || ''}`.trim() || 'N/A'}</td>
                <td>{mat.supplierCity || 'N/A'}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center">No raw materials found.</td>
            </tr>
          )}
        </tbody>
      </table>

      {!searchTerm && (
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
      )}
    </div>
  );
}