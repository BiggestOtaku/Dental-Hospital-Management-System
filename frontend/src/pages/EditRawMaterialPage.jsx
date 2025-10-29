import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useParams, useNavigate, Link } from 'react-router-dom';

export default function EditRawMaterialPage() {
  const { id } = useParams(); // Get material ID from URL
  const navigate = useNavigate();

  // State for the single editable field
  const [available, setAvailable] = useState('');
  
  // State for supporting data (max quantity needed for frontend validation)
  const [materialName, setMaterialName] = useState('');
  const [maximumQuantity, setMaximumQuantity] = useState(null); 

  const [loading, setLoading] = useState(true); // Loading initial data
  const [saving, setSaving] = useState(false); // Saving changes
  const [error, setError] = useState(null);

  // --- Fetch Existing Material Data ---
  useEffect(() => {
    async function fetchMaterialData() {
      if (!id || isNaN(id)) return;

      try {
        setLoading(true);
        setError(null);
        
        // Use the detail endpoint to get current data
        const response = await api.get(`/admin/get-raw-material-byID/${id}`);
        const data = response.data; 

        // Pre-fill the form state with fetched data
        setAvailable(data.available ?? '');
        setMaximumQuantity(data.maximumQuantity ?? null); // Save max qty for validation
        setMaterialName(data.materialName || 'Material');

      } catch (err) {
        console.error("Error fetching material data:", err);
        const msg = err.response?.status === 404
            ? `Material with ID ${id} not found.`
            : (err.response?.data?.message || err.message || 'Failed to load material data.');
        setError(msg);
      } finally {
        setLoading(false);
      }
    }
    fetchMaterialData();
  }, [id]);

  // --- Handle Form Submission ---
  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    
    // Prepare the payload matching UpdateRawMaterialAvailabilityDto
    const newAvailable = available ? Number(available) : 0;

    // Frontend validation: Check against max quantity
    if (maximumQuantity !== null && newAvailable > maximumQuantity) {
        setError(`Available quantity (${newAvailable}) cannot exceed maximum capacity (${maximumQuantity}).`);
        setSaving(false);
        return;
    }
    
    // Payload only needs the 'available' field
    const payload = { available: newAvailable };

    try {
      // Make the API PATCH request
      await api.patch(`/admin/update-raw-material/${id}`, payload);
      alert('Available quantity updated successfully!');
      
      // Navigate back to the detail page after saving
      navigate(`/admin/raw-materials/${id}`); 

    } catch (err) {
      console.error("Error updating material:", err);
      const errorMessage = err.response?.data?.message || err.message || 'Failed to update material availability.';
      setError(errorMessage);
    } finally {
      setSaving(false);
    }
  }

  // --- Render Logic ---
  if (loading) {
    return <div className="container"><h3>Loading material data...</h3></div>;
  }

  if (error) {
     return <div className="container alert alert-danger">
        <strong>Error:</strong> {error} <br />
        <Link to={`/admin/raw-materials/${id}`} className="alert-link">Back to details</Link>
     </div>;
  }

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h2>Update Availability: {materialName}</h2>
        {/* Link back to the detail page */}
        <Link to={`/admin/raw-materials/${id}`} className="btn btn-secondary">
          Cancel
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="card p-4">
         {error && <div className="alert alert-danger">{error}</div>}

         <div className="mb-3">
            <label className="form-label">Maximum Capacity</label>
            <p className="form-control-static">
              <strong>{maximumQuantity ?? 'N/A'}</strong>
            </p>
         </div>

         {/* Editable Field */}
         <div className="mb-4">
            <label htmlFor="available" className="form-label">New Available Quantity</label>
            <input 
              type="number" 
              className="form-control" 
              id="available" 
              value={available} 
              onChange={(e) => setAvailable(e.target.value)} 
              min="0"
              max={maximumQuantity}
              required
            />
             <div className="form-text">Update the current stock quantity.</div>
         </div>

        <button type="submit" className="btn btn-primary" disabled={saving}>
          {saving ? 'Saving...' : 'Save Availability'}
        </button>
      </form>
    </div>
  );
}