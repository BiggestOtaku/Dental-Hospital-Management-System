import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useParams, Link } from 'react-router-dom';

export default function ImplantDetailPage() {
  const [implant, setImplant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams(); // URL se id le raha hai

  const [rawMaterials, setRawMaterials] = useState(null); 
  const [materialsLoading, setMaterialsLoading] = useState(false);
  const [materialsError, setMaterialsError] = useState(null);
  

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString + 'T00:00:00Z').toLocaleDateString();
    } catch (e) {
      console.error("Error formatting date:", dateString, e);
      return 'Invalid Date';
    }
  };


  useEffect(() => {
    async function fetchImplantDetails() {
      setImplant(null);
      setLoading(true);
      setError(null);
      
      setRawMaterials(null); 
      
      if (!id) {
          setError('No Implant ID provided in the URL.');
          setLoading(false);
          return;
      };

      try {
        const response = await api.get(`/admin/get-implant/${id}`);
        setImplant(response.data);
      } catch (err) {
        console.error("Error fetching implant details:", err);
        setError(err.response?.status === 404 ? 'Implant not found.' : (err.response?.data?.message || err.message || 'Failed to fetch implant details.'));
      } finally {
        setLoading(false);
      }
    }

    fetchImplantDetails();
  }, [id]); // Re-fetch on id change


  const fetchRawMaterials = async () => {
    // Toggle: Clear the list if it's already open
    if (rawMaterials !== null) {
      setRawMaterials(null); 
      return;
    }
    
    setMaterialsLoading(true);
    setMaterialsError(null);

    try {
      const response = await api.get(`/admin/get-raw-material-for-implant/${id}`);
      setRawMaterials(response.data); 
    } catch (err) {
      console.error("Error fetching raw materials list:", err);
      const msg = err.response?.data?.message || err.message || 'Failed to load associated materials.';
      setMaterialsError(msg);
      setRawMaterials([]); 
    } finally {
      setMaterialsLoading(false);
    }
  };


  if (loading) {
    return <div className="container"><h3>Loading implant details...</h3></div>;
  }

  if (error) {
    return <div className="container alert alert-danger">
      <strong>Error:</strong> {error} <br />
      <Link to="/admin/implants" className="alert-link">Back to list</Link>
    </div>;
  }

  if (!implant) {
    return <div className="container alert alert-warning">
      Implant not found. <br />
      <Link to="/admin/implants" className="alert-link">Back to list</Link>
    </div>;
  }
  
  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h2>Implant Details (ID: {implant.implantID})</h2>
        <div> 
          <Link to={`/admin/implants/edit/${implant.implantID}`} className="btn btn-warning me-2">
            Edit
          </Link>
          <Link to="/admin/implants" className="btn btn-secondary">
            &larr; Back to List
          </Link>
        </div>
      </div>

      <div className="card mb-3">
        <div className="card-body">
          <h5 className="card-title">Implant Information</h5>
          <ul className="list-group list-group-flush">
            <li className="list-group-item"><strong>ID:</strong> {implant.implantID}</li>
            <li className="list-group-item"><strong>Type:</strong> {implant.type || 'N/A'}</li>
            <li className="list-group-item"><strong>Size:</strong> {implant.size || 'N/A'}</li>
            <li className="list-group-item"><strong>Price:</strong> {implant.price != null ? `$${Number(implant.price).toFixed(2)}` : 'N/A'}</li>
            <li className="list-group-item"><strong>Available Quantity:</strong> {implant.available ?? 'N/A'}</li>
            <li className="list-group-item"><strong>Maximum Quantity:</strong> {implant.maximumQuantity ?? 'N/A'}</li>
            <li className="list-group-item"><strong>Sterilization Date:</strong> {formatDate(implant.sterilizationDate)}</li>
            <li className="list-group-item"><strong>Expiry Period:</strong> {implant.expiryPeriod != null ? `${implant.expiryPeriod} months` : 'N/A'}</li>
          </ul>
        </div>
      </div>
      

      <div className="d-flex align-items-center mb-3">
        <h3 className="me-3">Raw Materials Used</h3>
        <button 
          onClick={fetchRawMaterials} 
          className={`btn ${rawMaterials === null ? 'btn-info' : 'btn-outline-info'}`}
          disabled={materialsLoading}
        >
          {materialsLoading 
            ? 'Loading...' 
            : (rawMaterials === null ? 'View Materials' : 'Hide Materials')}
        </button>
      </div>

      {(materialsLoading || materialsError || rawMaterials) && (
        <div className="card">
          {materialsError && <div className="alert alert-danger">{materialsError}</div>}
          
          {rawMaterials && rawMaterials.length > 0 && (
            <table className="table table-sm table-bordered mb-0">
              <thead>
                <tr>
                  <th>Material ID</th>
                  <th>Name</th>
                  <th>Available/Max Qty</th>
                  <th>Unit Price</th>
                  <th>Supplier City</th>
                </tr>
              </thead>
              <tbody>
                {rawMaterials.map(mat => (
                  <tr key={mat.materialId}>
                    <td>
                      <Link to={`/admin/raw-materials/${mat.materialId}`}>{mat.materialId}</Link>
                    </td>
                    <td>{mat.materialName}</td>
                    <td>{mat.available} / {mat.maximumQuantity}</td>
                    <td>{mat.unitPrice != null ? `$${Number(mat.unitPrice).toFixed(2)}` : 'N/A'}</td>
                    <td>{mat.supplierCity || 'N/A'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {rawMaterials && rawMaterials.length === 0 && (
            <div className="alert alert-warning">No raw materials are linked to this implant.</div>
          )}
        </div>
      )}
    </div>
  );
}