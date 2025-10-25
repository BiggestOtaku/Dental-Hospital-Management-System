// src/pages/SignupPage.jsx
import React, { useState } from 'react';
import api from '../services/api';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

export default function SignupPage() {
  const [emailId, setEmailId] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  async function submit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        emailId,
        password
      };

      const res = await api.post('/auth/signup', payload);
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
            <label>Email</label>
            <input type="email" className="form-control" value={emailId} onChange={e => setEmailId(e.target.value)} required />
          </div>
        </div>

        <div className="form-row" style={{marginTop:12}}>
          <div className="form-field">
            <label htmlFor="password">Password</label>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                className="form-control"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                style={{ paddingRight: 40 }}
                aria-describedby="togglePassword"
              />
              <button
                id="togglePassword"
                type="button"
                onClick={() => setShowPassword(s => !s)}
                aria-pressed={showPassword}
                title={showPassword ? 'Hide password' : 'Show password'}
                style={{
                  position: 'absolute',
                  right: 8,
                  background: 'transparent',
                  border: 'none',
                  padding: 6,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {showPassword ? (
                  <FiEyeOff size={20} aria-hidden />
                ) : (
                  <FiEye size={20} aria-hidden />
                )}
              </button>
            </div>
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
