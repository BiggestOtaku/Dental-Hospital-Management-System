// src/components/Header.jsx
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Header() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/login');
  }

  return (
    <header style={{marginBottom:12}}>
      <div className="container" style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <div style={{display:'flex', gap:12, alignItems:'center'}}>
          <Link to="/" style={{textDecoration:'none', color:'inherit'}}>
            <div style={{fontWeight:700}}>Dental HMS</div>
          </Link>
        </div>

        <div style={{display:'flex', gap:12, alignItems:'center'}}>
          {/* <div style={{fontSize:14}} className="text-muted">
            {user ? `${user.role ?? 'User'}` : 'Not signed in'}
          </div> */}
          {user ? (
            <button className="btn btn-sm btn-outline-danger" onClick={handleLogout}>Logout</button>
          ) : (
            <Link to="/login" className="btn btn-sm btn-primary">Login</Link>
          )}
        </div>
      </div>
    </header>
  );
}
