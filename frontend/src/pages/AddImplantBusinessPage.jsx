import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate, Link } from 'react-router-dom';

export default function AddImplantBusinessPage() {
  const [implantId, setImplantId] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [quantity, setQuantity] = useState('');
  const [soldBy, setSoldBy] = useState('');
  const [broughtBy, setBroughtBy] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    
    const payload = {
      implantId: implantId ? Number(implantId) : null,
      transactionId: transactionId ? Number(transactionId) : null,
      quantity: quantity ? Number(quantity) : null,
      soldBy,
      broughtBy,
    };

    try {
      await api.post('/admin/add-implant-business', payload);
      alert('Implant business record added successfully!');
      navigate('/admin/implant-business');
    } catch (err) {
      console.error("Error adding record:", err);
      const errorMessage = err.response?.data?.message || err.message || 'Failed to add record.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h2>Add Implant Business Record</h2>
        <Link to="/admin/implant-business" className="btn btn-secondary">
          &larr; Back to List
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="card p-4">
        {error && <div className="alert alert-danger">{error}</div>}

        <div className="row mb-3">
          <div className="col">
            <label htmlFor="implantId" className="form-label">Implant ID *</label>
            <input type="number" className="form-control" id="implantId" value={implantId} onChange={(e) => setImplantId(e.target.value)} required min="1" />
          </div>
          <div className="col">
            <label htmlFor="transactionId" className="form-label">Transaction ID *</label>
            <input type="number" className="form-control" id="transactionId" value={transactionId} onChange={(e) => setTransactionId(e.target.value)} required min="1" />
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="quantity" className="form-label">Quantity *</label>
          <input type="number" className="form-control" id="quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} required min="1" />
        </div>


        <div className="row mb-3">
          <div className="col">
            <label htmlFor="soldBy" className="form-label">Sold By *</label>
            <input type="text" className="form-control" id="soldBy" value={soldBy} onChange={(e) => setSoldBy(e.target.value)} required />
          </div>
          <div className="col">
            <label htmlFor="broughtBy" className="form-label">Brought By *</label>
            <input type="text" className="form-control" id="broughtBy" value={broughtBy} onChange={(e) => setBroughtBy(e.target.value)} required />
          </div>
        </div>

        <button type="submit" className="btn btn-primary mt-3" disabled={loading}>
          {loading ? 'Adding...' : 'Add Record'}
        </button>
      </form>
    </div>
  );
}