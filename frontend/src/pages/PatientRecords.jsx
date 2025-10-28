// PatientRecords.jsx
import React, { useEffect, useState, useContext } from 'react';
import { fetchPatientRecords } from '../services/records';
import { AuthContext } from '../context/AuthContext';

export default function PatientRecords(){
  const { user } = useContext(AuthContext);
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const patientId = user?.userId ?? user?.id;
        const data = await fetchPatientRecords(patientId);
        setRecords(Array.isArray(data) ? data : (data?.records || data));
      } catch (err) {
        console.error(err);
        alert('Failed to load records');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [user]);

  return (
    <div>
      <div className="header-row">
        <div className="header-title">Your Records</div>
      </div>

      <div className="card">
        {loading ? <div>Loading...</div> : (
          <>
            {records.length === 0 ? <div className="muted">No records available</div> : (
              <ul>
                {records.map((r, idx) => (
                  <li key={r.id ?? idx} style={{marginBottom:12}}>
                    <div><strong>{r.date ?? r.createdAt ? new Date(r.date ?? r.createdAt).toLocaleString() : ''}</strong></div>
                    <div>{r.notes ?? r.description ?? r.diagnosis}</div>
                    <div className="text-muted" style={{fontSize:13}}>{r.doctorName ? `by ${r.doctorName}` : ''}</div>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </div>
    </div>
  );
}
