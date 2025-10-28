// DoctorRecords.jsx
import React, { useEffect, useState, useContext } from 'react';
import { fetchPatientRecords, addPatientRecord } from '../services/records';
import { AuthContext } from '../context/AuthContext';

export default function DoctorRecords(){
  const { user } = useContext(AuthContext);
  const [patientId, setPatientId] = useState('');
  const [records, setRecords] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [loading, setLoading] = useState(false);

  async function search() {
    if (!patientId) return alert('Enter patient id or email');
    setLoading(true);
    try {
      const data = await fetchPatientRecords(patientId);
      setRecords(Array.isArray(data) ? data : data?.records ?? data);
    } catch (err) {
      console.error(err);
      alert('Failed to load records');
    } finally {
      setLoading(false);
    }
  }

  async function handleAdd() {
    if (!patientId) return alert('Select patient id first');
    try {
      await addPatientRecord(patientId, { notes: newNote, doctorId: user?.userId ?? user?.id });
      alert('Record added');
      setNewNote('');
      search();
    } catch (err) {
      console.error(err);
      alert('Add failed');
    }
  }

  return (
    <div>
      <div className="header-row">
        <div className="header-title">Patient Records (Doctor)</div>
      </div>

      <div className="card">
        <div className="form-row">
          <div className="form-field">
            <label>Patient ID or Email</label>
            <input className="form-control" value={patientId} onChange={e=>setPatientId(e.target.value)} placeholder="patientId or email" />
          </div>
          <div style={{alignSelf:'end'}}>
            <button className="btn btn-primary" onClick={search}>Load records</button>
          </div>
        </div>

        <hr />

        {loading ? <div>Loading...</div> : (
          <>
            <div>
              {records.length === 0 ? <div className="muted">No records found</div> : (
                <ul>
                  {records.map((r, idx) => (
                    <li key={r.id ?? idx} style={{marginBottom:8}}>
                      <div><strong>{r.date ?? r.createdAt ? new Date(r.date ?? r.createdAt).toLocaleString() : ''}</strong></div>
                      <div>{r.notes ?? r.description ?? r.diagnosis}</div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div style={{marginTop:12}}>
              <label>Add record</label>
              <textarea className="form-control" value={newNote} onChange={e=>setNewNote(e.target.value)} rows="4" />
              <div style={{marginTop:8}}>
                <button className="btn btn-primary" onClick={handleAdd}>Add record</button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
