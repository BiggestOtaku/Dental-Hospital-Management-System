import React, { useEffect, useState } from 'react';
import api from '../services/api';

export default function PatientsPage() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        // adjust endpoint if backend path differs
        const res = await api.get('/patients');
        setPatients(res.data || []);
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
      <h3>Patients</h3>
      {loading ? <div>Loading...</div> : (
        <table className="table table-striped">
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
            {patients.map(p => (
              <tr key={p.id || p.patientId || JSON.stringify(p)}>
                <td>{p.id ?? p.patientId ?? '-'}</td>
                <td>{p.fullName ?? `${p.firstName || ''} ${p.lastName || ''}`}</td>
                <td>{p.phone ?? p.contact ?? '-'}</td>
                <td>
                  {/* add edit / view buttons later */}
                  <button className="btn btn-sm btn-outline-primary" disabled>View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
