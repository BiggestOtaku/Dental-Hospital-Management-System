import React, { useState, useContext } from 'react';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      // adjust field names if your backend expects different names
      const res = await api.post('/auth/login', { username, password });
      // example response expected: { token, userId, role, ... }
      const userData = res.data;
      login(userData);
      navigate('/'); // go to dashboard
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
          <label>Username or Email</label>
          <input
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
        <div style={{marginTop:10}}>
          <small>Don't have an account? <a href="/signup">Register</a></small>
        </div>
      </form>
    </div>
  );
}
