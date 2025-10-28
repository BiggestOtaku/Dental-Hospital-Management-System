import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useParams, Link } from 'react-router-dom';

export default function CampDetailPage() {
  const [camp, setCamp] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams(); 
  const formatDateTime = (dateTimeString) => {
    if (!dateTimeString) return 'N/A';
    try {
      return new Date(dateTimeString).toLocaleString();
    } catch (e) { return 'Invalid Date'; }
  };
   const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString + 'T00:00:00Z').toLocaleDateString();
    } catch (e) { return 'Invalid Date'; }
  };

  useEffect(() => {
    async function fetchCampDetails() {
      if (!id) return;

      try {
        setLoading(true);
        setError(null);
        const response = await api.get(`/admin/camps/${id}`);
        setCamp(response.data); 
      } catch (err) {
        console.error("Error fetching camp details:", err);
        setError(err.response?.data?.message || err.message || 'Failed to fetch camp details.');
      } finally {
        setLoading(false);
      }
    }

    fetchCampDetails();
  }, [id]); // Re-fetch hoga id change pr

  if (loading) {
    return <div className="container"><h3>Loading camp details...</h3></div>;
  }

  if (error) {
    return <div className="container alert alert-danger">
      <strong>Error:</strong> {error} <br />
      <Link to="/admin/camps" className="alert-link">Back to list</Link>
    </div>;
  }

  if (!camp) {
    return <div className="container alert alert-warning">
      Camp not found. <br />
      <Link to="/admin/camps" className="alert-link">Back to list</Link>
    </div>;
  }

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h2>Camp Details (ID: {camp.campId})</h2>
        <Link to="/admin/camps" className="btn btn-secondary">
          &larr; Back to List
        </Link>
      </div>

      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Camp Information</h5>
          <ul className="list-group list-group-flush">
            <li className="list-group-item"><strong>ID:</strong> {camp.campId}</li>
            <li className="list-group-item"><strong>Date:</strong> {formatDate(camp.date)}</li>
            <li className="list-group-item"><strong>Start Time:</strong> {formatDateTime(camp.startTime)}</li>
            <li className="list-group-item"><strong>End Time:</strong> {formatDateTime(camp.endTime)}</li>
            <li className="list-group-item"><strong>City:</strong> {camp.city || 'N/A'}</li>
            <li className="list-group-item"><strong>State:</strong> {camp.state || 'N/A'}</li>
          </ul>
        </div>
      </div>
      
    </div>
  );
}