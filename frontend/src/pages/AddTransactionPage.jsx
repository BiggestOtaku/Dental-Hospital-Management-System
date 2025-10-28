import React from 'react';
import { useState } from 'react';
import api from '../services/api';
import { useNavigate, Link } from 'react-router-dom';


const expenseAreaOptions = [
    'URBAN',
    'SEMI_URBAN',
    'RURAL',
    'before_organising_camp',
    'after_expenses_of_camp_if_any',
    'raw_material_buy'
];

export default function AddTransactionPage() {
  const [amount, setAmount] = useState('');
  const [transactionDate, setTransactionDate] = useState('');
  const [area, setArea] = useState(expenseAreaOptions[0]);
  const [description, setDescription] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const payload = {
      amount: parseInt(amount, 10),
      transactionDate,
      area,
      description,
    };

    try {
      await api.post('/admin/add-transaction', payload);
      alert('Transaction added successfully!');
      navigate('/admin/transactions'); 
    } catch (err) {
      console.error("Error adding transaction:", err);
      const errorMessage = err.response?.data?.errors 
        ? err.response.data.errors.map(e => e.defaultMessage).join(', ')
        : (err.response?.data?.message || err.message || 'Failed to add transaction.');
      setError(errorMessage);
      alert(`Error: ${errorMessage}`); 
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h2>Add New Transaction</h2>
        <Link to="/admin/transactions" className="btn btn-secondary">
          &larr; Back to List
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="card p-3">
        {error && <div className="alert alert-danger">{error}</div>}

        <div className="mb-3">
          <label htmlFor="amount" className="form-label">Amount</label>
          <input
            type="number"
            className="form-control"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            min="1"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="transactionDate" className="form-label">Transaction Date</label>
          <input
            type="date"
            className="form-control"
            id="transactionDate"
            value={transactionDate}
            onChange={(e) => setTransactionDate(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="area" className="form-label">Expense Area</label>
          <select
            className="form-select"
            id="area"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            required
          >
            {expenseAreaOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea
            className="form-control"
            id="description"
            rows="3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Adding...' : 'Add Transaction'}
        </button>
      </form>
    </div>
  );
}