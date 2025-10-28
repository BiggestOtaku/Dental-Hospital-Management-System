import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useParams, Link } from 'react-router-dom';

export default function TransactionDetailPage() {
  const [transaction, setTransaction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams(); 

  useEffect(() => {
    async function fetchTransactionDetails() {
      if (!id) return;

      try {
        setLoading(true);
        setError(null);
        const response = await api.get(`/admin/transactions/${id}`);
        setTransaction(response.data);
      } catch (err) {
        console.error("Error fetching transaction details:", err);
        setError(err.response?.data?.message || err.message || 'Failed to fetch transaction details.');
      } finally {
        setLoading(false);
      }
    }

    fetchTransactionDetails();
  }, [id]); // Re-fetch if the ID in the URL changes


  if (loading) {
    return <div className="container"><h3>Loading transaction details...</h3></div>;
  }

  if (error) {
    return <div className="container alert alert-danger">
      <strong>Error:</strong> {error}
      <br />
      <Link to="/admin/transactions" className="alert-link">Back to list</Link>
    </div>;
  }

  if (!transaction) {
    return (
      <div className="container alert alert-warning">
        Transaction not found or data is missing.
        <br />
        <Link to="/admin/transactions" className="alert-link">Back to list</Link>
      </div>
    );
  }

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h2>Transaction Details (ID: {transaction.transactionId})</h2>
        <Link to="/admin/transactions" className="btn btn-secondary">
          &larr; Back to List
        </Link>
      </div>

      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Details</h5>
          <ul className="list-group list-group-flush">
            <li className="list-group-item"><strong>ID:</strong> {transaction.transactionId}</li>
            <li className="list-group-item"><strong>Date:</strong> {transaction.transactionDate ? new Date(transaction.transactionDate).toLocaleDateString() : 'N/A'}</li>
            <li className="list-group-item"><strong>Amount:</strong> {transaction.amount != null ? `$${Number(transaction.amount).toFixed(2)}` : 'N/A'}</li>
            <li className="list-group-item"><strong>Area:</strong> {transaction.area || 'N/A'}</li>
            <li className="list-group-item"><strong>Description:</strong> <pre style={{ whiteSpace: 'pre-wrap', margin: 0, fontFamily: 'inherit' }}>{transaction.description || 'N/A'}</pre></li>
            
          </ul>
        </div>
      </div>
    </div>
  );
}