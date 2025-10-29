import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useParams, Link } from 'react-router-dom';

export default function RawMaterialDetailPage() {
  const [material, setMaterial] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();//useparams is used to get parameters from the url

  useEffect(() => {
    async function fetchMaterialDetails() {
      setLoading(true);
      setError(null);
      setMaterial(null);

      if (!id || isNaN(id)) {
          setError('Invalid Material ID provided.');
          setLoading(false);
          return;
      }

      try {
        const response = await api.get(`/admin/get-raw-material-byID/${id}`);
        setMaterial(response.data);
      } catch (err) {
        console.error("Error fetching material details:", err);
        const msg = err.response?.status === 404
            ? `Material with ID ${id} not found.`
            : (err.response?.data?.message || err.message || 'Failed to fetch material details.');
        setError(msg);
      } finally {
        setLoading(false);
      }
    }

    fetchMaterialDetails();
  }, [id]); 

  const fullAddress = material 
    ? [material.supplierAddressLane, material.supplierCity, material.supplierState]
        .filter(p => p)
        .join(', ') + (material.supplierPinCode ? ` - ${material.supplierPinCode}` : '')
    : 'N/A';

  if (loading) {
    return <div className="container"><h3>Loading material details...</h3></div>;
  }

  if (error) {
    return (
        <div className="container alert alert-danger">
            <strong>Error:</strong> {error} <br />
            <Link to="/admin/raw-materials" className="alert-link">Back to list</Link>
        </div>
    );
  }

  if (!material) {
    return <div className="container alert alert-warning">Material data is missing.</div>;
  }


  return (
    <div className="container">
        
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h2>{material.materialName} (ID: {material.materialId})</h2>
         <div> 
           <Link to={`/admin/raw-materials/edit/${material.materialId}`} className="btn btn-warning me-2">
             Edit
           </Link>
           <Link to="/admin/raw-materials" className="btn btn-secondary">
             &larr; Back to List
           </Link>
         </div>
      </div>

      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Inventory Information</h5>
          <ul className="list-group list-group-flush">
            <li className="list-group-item"><strong>Unit Price:</strong> ${Number(material.unitPrice).toFixed(2)}</li>
            <li className="list-group-item"><strong>Available Quantity:</strong> {material.available}</li>
            <li className="list-group-item"><strong>Maximum Capacity:</strong> {material.maximumQuantity}</li>
          </ul>
        </div>
      </div>
      
      <div className="card mt-3">
        <div className="card-body">
          <h5 className="card-title">Supplier Details</h5>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
                <strong>Name:</strong> 
                {`${material.supplierFirstName || ''} ${material.supplierMiddleName || ''} ${material.supplierLastName || ''}`.trim() || 'N/A'}
            </li>
            <li className="list-group-item"><strong>Address:</strong> {fullAddress}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}