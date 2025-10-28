import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useParams, Link } from 'react-router-dom';

export default function ImplantDetailPage() {
  const [implant, setImplant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams(); // URL se id le raha hai
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
      if (!id) return;

      try {
        setLoading(true);
        setError(null);
        const response = await api.get(`/admin/get-implant/${id}`);
        setImplant(response.data);
      } catch (err) {
        console.error("Error fetching implant details:", err);
        setError(err.response?.data?.message || err.message || 'Failed to fetch implant details.');
      } finally {
        setLoading(false);
      }
    }

    fetchImplantDetails();
  }, [id]); // Re-fetch on id change

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

      <div className="card">
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
    </div>
  );
}