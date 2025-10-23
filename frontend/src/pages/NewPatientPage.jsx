// src/pages/NewPatientPage.jsx
import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function NewPatientPage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function submit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = { firstName, lastName, email, phone };
      await api.post('/patients', payload);
      alert('Patient created');
      navigate('/patients');
    } catch (err) {
      console.error(err);
      alert('Create patient failed: ' + (err?.response?.data?.message || err?.message));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container">
      <div className="header-row">
        <div className="header-title">Add patient</div>
      </div>

      <form onSubmit={submit} className="card">
        <div className="form-row">
          <div className="form-field"><label>First name</label><input className="form-control" value={firstName} onChange={e=>setFirstName(e.target.value)} required/></div>
          <div className="form-field"><label>Last name</label><input className="form-control" value={lastName} onChange={e=>setLastName(e.target.value)}/></div>
        </div>

        <div className="form-row" style={{marginTop:12}}>
          <div className="form-field"><label>Email</label><input type="email" className="form-control" value={email} onChange={e=>setEmail(e.target.value)}/></div>
          <div className="form-field"><label>Phone</label><input className="form-control" value={phone} onChange={e=>setPhone(e.target.value)}/></div>
        </div>

        <div style={{marginTop:14}}>
          <button className="btn btn-primary" type="submit" disabled={loading}>{loading ? 'Saving...' : 'Create patient'}</button>
        </div>
      </form>
    </div>
  );
}
