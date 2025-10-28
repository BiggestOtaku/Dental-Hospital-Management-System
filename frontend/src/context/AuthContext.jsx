import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api';

export const AuthContext = createContext({
  user: null,
  login: () => {},
  logout: () => {},
  register: () => {},
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem('dhms_user');
    return raw ? JSON.parse(raw) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('dhms_user', JSON.stringify(user));
      if (user.token) localStorage.setItem('dhms_token', user.token);
    } else {
      localStorage.removeItem('dhms_user');
      localStorage.removeItem('dhms_token');
    }
  }, [user]);

  const login = (userData) => setUser(userData);
  const logout = () => setUser(null);

  // register helper - returns API response or throws
  async function register(payload) {
    // default signup endpoint for patients used earlier; change if needed
    const res = await api.post('/auth/signup/patients', payload);
    return res.data;
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}
