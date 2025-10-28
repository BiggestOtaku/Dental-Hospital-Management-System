import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useParams, useNavigate, Link } from 'react-router-dom';

export default function EditImplantPage() {
  const { id } = useParams(); // id lene ke liye url se
  const navigate = useNavigate();

  const [maximumQuantity, setMaximumQuantity] = useState('');
  const [available, setAvailable] = useState('');
  const [price, setPrice] = useState('');
  const [type, setType] = useState('');
  const [size, setSize] = useState('');
  const [expiryPeriod, setExpiryPeriod] = useState('');
  const [sterilizationDate, setSterilizationDate] = useState('');

  const [loading, setLoading] = useState(true); 
  const [saving, setSaving] = useState(false); 
  const [error, setError] = useState(null);
  const [initialDataLoaded, setInitialDataLoaded] = useState(false);

   const formatDateForInput = (dateString) => {
    if (!dateString) return '';
    try { return dateString; } 
    catch (e) { return ''; }
  };

  useEffect(() => {
    async function fetchImplantData() {
      if (!id || initialDataLoaded) return; 

      try {
        setLoading(true);
        setError(null);
        const response = await api.get(`/admin/get-implant/${id}`);
        const data = response.data; 

        setMaximumQuantity(data.maximumQuantity ?? '');
        setAvailable(data.available ?? '');
        setPrice(data.price != null ? String(data.price) : ''); 
        setType(data.type || '');
        setSize(data.size || '');
        setExpiryPeriod(data.expiryPeriod ?? '');
        setSterilizationDate(formatDateForInput(data.sterilizationDate));

        setInitialDataLoaded(true);

      } catch (err) {
        console.error("Error fetching implant data:", err);
        setError(err.response?.data?.message || err.message || 'Failed to load implant data.');
      } finally {
        setLoading(false);
      }
    }

    fetchImplantData();
  }, [id, initialDataLoaded]); // Depend on ID and load flag

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    //UpdateImplantDto se matching h ye
    const payload = {};
    if (maximumQuantity) payload.maximumQuantity = Number(maximumQuantity);
    if (available) payload.available = Number(available);
    if (price) payload.price = parseFloat(price);
    if (type) payload.type = type;
    if (size) payload.size = size;
    if (expiryPeriod) payload.expiryPeriod = Number(expiryPeriod);
    if (sterilizationDate) payload.sterilizationDate = sterilizationDate;

     // Basic frontend validation
    if (payload.available != null && payload.maximumQuantity != null && payload.available > payload.maximumQuantity) {
        setError("Available quantity cannot exceed maximum quantity.");
        setSaving(false);
        return;
     }

    try {
      await api.patch(`/admin/update-implant/${id}`, payload);
      alert('Implant updated successfully!');
      navigate(`/admin/implants/${id}`);
    } catch (err) {
      console.error("Error updating implant:", err);
       const errorMessage = err.response?.data?.errors
        ? err.response.data.errors.map(e => e.defaultMessage).join(', ')
        : (err.response?.data?.message || err.message || 'Failed to update implant.');
      setError(errorMessage);
      alert(`Error: ${errorMessage}`);
    } finally {
      setSaving(false);
    }
  }

  if (loading && !initialDataLoaded) {
    return <div className="container"><h3>Loading implant data...</h3></div>;
  }

  if (error && !initialDataLoaded) {
     return <div className="container alert alert-danger">
        <strong>Error:</strong> {error} <br />
        <Link to={`/admin/implants/${id}`} className="alert-link">Back to details</Link>
     </div>;
  }

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h2>Edit Implant (ID: {id})</h2>
        <Link to={`/admin/implants/${id}`} className="btn btn-secondary">
          Cancel
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="card p-3">
         {error && initialDataLoaded && <div className="alert alert-danger">{error}</div>}

        <div className="row mb-3">
            <div className="col">
                <label htmlFor="type" className="form-label">Type</label>
                <input type="text" className="form-control" id="type" value={type} onChange={(e) => setType(e.target.value)} />
            </div>
             <div className="col">
                <label htmlFor="size" className="form-label">Size</label>
                <input type="text" className="form-control" id="size" value={size} onChange={(e) => setSize(e.target.value)} />
            </div>
        </div>

        <div className="row mb-3">
             <div className="col">
                <label htmlFor="maximumQuantity" className="form-label">Maximum Quantity</label>
                <input type="number" className="form-control" id="maximumQuantity" value={maximumQuantity} onChange={(e) => setMaximumQuantity(e.target.value)} min="0" />
            </div>
            <div className="col">
                <label htmlFor="available" className="form-label">Available Quantity</label>
                <input type="number" className="form-control" id="available" value={available} onChange={(e) => setAvailable(e.target.value)} min="0" />
            </div>
             <div className="col">
                <label htmlFor="price" className="form-label">Price</label>
                <input type="number" step="0.01" className="form-control" id="price" value={price} onChange={(e) => setPrice(e.target.value)} min="0.00" />
            </div>
        </div>

        <div className="row mb-3">
             <div className="col">
                <label htmlFor="sterilizationDate" className="form-label">Sterilization Date</label>
                <input type="date" className="form-control" id="sterilizationDate" value={sterilizationDate} onChange={(e) => setSterilizationDate(e.target.value)} />
            </div>
            <div className="col">
                <label htmlFor="expiryPeriod" className="form-label">Expiry Period (e.g., months)</label>
                <input type="number" className="form-control" id="expiryPeriod" value={expiryPeriod} onChange={(e) => setExpiryPeriod(e.target.value)} min="1" />
                 <div className="form-text">Duration until expiry from sterilization date.</div>
            </div>
        </div>


        <button type="submit" className="btn btn-primary" disabled={saving}>
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
}