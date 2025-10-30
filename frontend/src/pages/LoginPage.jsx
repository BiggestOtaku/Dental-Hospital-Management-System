import React, { useState, useContext,useEffect } from 'react';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';


export default function LoginPage() {
  const [emailId, setEmailId] = useState('');
  const [password, setPassword] = useState('');
  const { login, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (user) {
      if (user.role && user.role.includes('ADMIN')) {
        navigate('/admin', { replace: true });
      } else {
        navigate('/', { replace: true });
      }
    }
  }, [user, navigate]);

  async function submit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post('/auth/login', { emailId, password });
      const userData = res.data;
      login(userData);
      if (userData.role && userData.role.includes('ADMIN')) {
        // If user is an ADMIN, go to /admin
        navigate('/admin', { replace: true });
      } else {
        // Otherwise, go to the default dashboard
        navigate('/', { replace: true });
      }
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container">
      <h3>Sign in</h3>
      <form onSubmit={submit}>
        <div className="mb-2">
          <label>Email</label>
          <input
            className="form-control"
            value={emailId}
            onChange={(e) => setEmailId(e.target.value)}
            required
          />
        </div>
        <div className="mb-2">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className="btn btn-primary" type="submit" disabled={loading}>
          {loading ? 'Signing in...' : 'Sign in'}
        </button>
        <div style={{ marginTop: 10 }}>
          <small>Don't have an account? <a href="/signup">Register</a></small>
        </div>
      </form>
    </div>
  );
}
