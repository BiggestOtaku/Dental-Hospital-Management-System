import React, { useState } from 'react';
import api from '../services/api';
import { Link, useNavigate } from 'react-router-dom';

export default function AddCampPatientPage() {
  const [addCampId, setAddCampId] = useState('');
  const [addPatientEmail, setAddPatientEmail] = useState('');
  const [addLoading, setAddLoading] = useState(false);
  const [addError, setAddError] = useState(null);
  const navigate = useNavigate();

  const handleAddPatient = async (e) => {
    e.preventDefault();
    setAddLoading(true);
    setAddError(null);

    const cId = addCampId ? Number(addCampId) : null;
    const email = addPatientEmail.trim();

    if (!cId || !email) {
      setAddError("Camp ID and Patient Email are required.");
      setAddLoading(false);
      return;
    }

    try {
      await api.post(`/admin/add-patient-to-camp/${cId}/${email}`);
      alert(`Patient ${email} successfully added to Camp ${cId}!`);
      
      navigate('/admin');

    } catch (err) {
      console.error("Error adding patient to camp:", err);
      const msg = err.response?.data || err.message || 'Failed to add patient to camp.';
      setAddError(msg);
    } finally {
      setAddLoading(false);
    }
  };

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2>Add Patient to Camp</h2>
        <Link to="/admin" className="btn btn-secondary">&larr; Back to Admin</Link>
      </div>

      <div className="card">
        <div className="card-header">
          <h5>Associate Patient with Camp</h5>
        </div>
        <div className="card-body">
          <form onSubmit={handleAddPatient}>
            {addError && <div className="alert alert-danger">{addError}</div>}

            <div className="row mb-3">
              <div className="col">
                <label className="form-label">Camp ID *</label>
                <input 
                  type="number" 
                  className="form-control" 
                  value={addCampId} 
                  onChange={(e) => setAddCampId(e.target.value)} 
                  required 
                  min="1" 
                />
              </div>
              <div className="col">
                <label className="form-label">Patient Email *</label>
                <input 
                  type="email" 
                  className="form-control" 
                  value={addPatientEmail} 
                  onChange={(e) => setAddPatientEmail(e.target.value)} 
                  required 
                />
              </div>
            </div>

            <button type="submit" className="btn btn-success mt-2" disabled={addLoading}>
              {addLoading ? 'Adding...' : 'Add Patient to Camp'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}