// src/pages/SignupPage.jsx
import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function SignupPage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState(''); // backend may expect username or email
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function submit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      // Adjust endpoint and payload according to your backend signup DTO.
      const payload = {
        firstName,
        lastName,
        username, // include if backend expects username
        email,
        password,
        phone
      };

      // Many backends separate signup endpoints by role. I suggested earlier /auth/signup/patients
      const res = await api.post('/auth/signup/patients', payload);
      // If backend returns created entity or message, we just notify and redirect to login.
      alert('Registration successful. Please login.');
      navigate('/login');
    } catch (err) {
      console.error(err);
      const msg = err?.response?.data?.message || err?.response?.data || err.message;
      alert('Registration failed: ' + (msg || 'unknown error'));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container">
      <div className="header-row">
        <div>
          <div className="header-title">Create an account</div>
          <div className="text-muted">Register as a patient to use the system.</div>
        </div>
      </div>

      <form onSubmit={submit} className="card">
        <div className="form-row">
          <div className="form-field">
            <label>First name</label>
            <input className="form-control" value={firstName} onChange={e => setFirstName(e.target.value)} required />
          </div>
          <div className="form-field">
            <label>Last name</label>
            <input className="form-control" value={lastName} onChange={e => setLastName(e.target.value)} />
          </div>
        </div>

        <div className="form-row" style={{marginTop:12}}>
          <div className="form-field">
            <label>Username</label>
            <input className="form-control" value={username} onChange={e => setUsername(e.target.value)} placeholder="optional" />
            <small className="text-muted">If backend uses username instead of email provide one.</small>
          </div>
          <div className="form-field">
            <label>Email</label>
            <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
        </div>

        <div className="form-row" style={{marginTop:12}}>
          <div className="form-field">
            <label>Password</label>
            <input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} required />
          </div>
          <div className="form-field">
            <label>Phone</label>
            <input className="form-control" value={phone} onChange={e => setPhone(e.target.value)} />
          </div>
        </div>

        <div style={{marginTop:14}}>
          <button className="btn btn-primary" type="submit" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </button>
        </div>
      </form>
    </div>
  );
}
