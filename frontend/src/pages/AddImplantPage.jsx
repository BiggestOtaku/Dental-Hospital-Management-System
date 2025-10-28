import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate, Link } from 'react-router-dom';

export default function AddImplantPage() {
  const [maximumQuantity, setMaximumQuantity] = useState('');
  const [available, setAvailable] = useState('');
  const [price, setPrice] = useState('');
  const [type, setType] = useState('');
  const [size, setSize] = useState('');
  const [expiryPeriod, setExpiryPeriod] = useState(''); 
  const [sterilizationDate, setSterilizationDate] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    //payload backend ko bhejne ke liye bnate hain
    const payload = {
      maximumQuantity: maximumQuantity ? Number(maximumQuantity) : null,
      available: available ? Number(available) : null,
      price: price ? parseFloat(price) : null,
      type,
      size,
      expiryPeriod: expiryPeriod ? Number(expiryPeriod) : null,
      sterilizationDate: sterilizationDate || null,
    };

    // Basic frontend validation
    if (payload.maximumQuantity == null || payload.available == null || payload.price == null || !payload.type || !payload.size || payload.expiryPeriod == null || !payload.sterilizationDate) {
        setError("Please fill in all required fields.");
        setLoading(false);
        return;
    }
     if (payload.available > payload.maximumQuantity) {
        setError("Available quantity cannot exceed maximum quantity.");
        setLoading(false);
        return;
     }


    try {
      await api.post('/admin/add-implant', payload);
      alert('Implant added successfully!');
      navigate('/admin/implants');
    } catch (err) {
      console.error("Error adding implant:", err);
      const errorMessage = err.response?.data?.errors
        ? err.response.data.errors.map(e => e.defaultMessage).join(', ')
        : (err.response?.data?.message || err.message || 'Failed to add implant.');
      setError(errorMessage);
      alert(`Error: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h2>Add New Implant</h2>
        <Link to="/admin/implants" className="btn btn-secondary">
          &larr; Back to List
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="card p-3">
        {error && <div className="alert alert-danger">{error}</div>}

        <div className="row mb-3">
            <div className="col">
                <label htmlFor="type" className="form-label">Type</label>
                <input type="text" className="form-control" id="type" value={type} onChange={(e) => setType(e.target.value)} required />
            </div>
             <div className="col">
                <label htmlFor="size" className="form-label">Size</label>
                <input type="text" className="form-control" id="size" value={size} onChange={(e) => setSize(e.target.value)} required />
            </div>
        </div>

        <div className="row mb-3">
             <div className="col">
                <label htmlFor="maximumQuantity" className="form-label">Maximum Quantity</label>
                <input type="number" className="form-control" id="maximumQuantity" value={maximumQuantity} onChange={(e) => setMaximumQuantity(e.target.value)} min="0" required />
            </div>
            <div className="col">
                <label htmlFor="available" className="form-label">Available Quantity</label>
                <input type="number" className="form-control" id="available" value={available} onChange={(e) => setAvailable(e.target.value)} min="0" required />
            </div>
             <div className="col">
                <label htmlFor="price" className="form-label">Price</label>
                <input type="number" step="0.01" className="form-control" id="price" value={price} onChange={(e) => setPrice(e.target.value)} min="0.00" required />
            </div>
        </div>

        <div className="row mb-3">
             <div className="col">
                <label htmlFor="sterilizationDate" className="form-label">Sterilization Date</label>
                <input type="date" className="form-control" id="sterilizationDate" value={sterilizationDate} onChange={(e) => setSterilizationDate(e.target.value)} required />
            </div>
            <div className="col">
                <label htmlFor="expiryPeriod" className="form-label">Expiry Period (e.g., months)</label>
                <input type="number" className="form-control" id="expiryPeriod" value={expiryPeriod} onChange={(e) => setExpiryPeriod(e.target.value)} min="1" required />
                 <div className="form-text">Duration until expiry from sterilization date.</div>
            </div>
        </div>


        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Adding...' : 'Add Implant'}
        </button>
      </form>
    </div>
  );
}