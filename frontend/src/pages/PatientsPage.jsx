// src/pages/PatientsPage.jsx
import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';

export default function PatientsPage() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await api.get('/patients');
        // backend may return array directly or an object wrapper
        const data = Array.isArray(res.data) ? res.data : (res.data?.content || res.data?.patients || []);
        setPatients(data);
      } catch (err) {
        console.error(err);
        alert('Could not load patients. Check backend is running and API path is correct.');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div className="container">
      <div className="card">
        {loading ? <div>Loading...</div> : (
          <div className="table-responsive">
            <table className="table table-striped mb-0">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Full name</th>
                  <th>Contact</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {patients.length === 0 && (
                  <tr><td colSpan="4">No patients found</td></tr>
                )}
                {patients.map((p, idx) => {
                  const id = p.id ?? p.patientId ?? p.userId ?? idx;
                  const fullName = p.fullName ?? `${p.firstName ?? ''} ${p.lastName ?? ''}`.trim();
                  const contact = p.phone ?? p.contact ?? p.email ?? '-';
                  return (
                    <tr key={id}>
                      <td>{id}</td>
                      <td>{fullName || '-'}</td>
                      <td>{contact}</td>
                      <td>
                        <button className="btn btn-sm btn-outline-primary" disabled>View</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
