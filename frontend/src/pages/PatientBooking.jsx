// PatientBooking.jsx
import React, { useEffect, useState, useContext } from 'react';
import { fetchAppointments, createAppointment } from '../services/appointments';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';

export default function PatientBooking() {
  const { user } = useContext(AuthContext);
  const [doctors, setDoctors] = useState([]);
  const [doctorId, setDoctorId] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [reason, setReason] = useState('');
  const [myAppointments, setMyAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  // load doctors and existing appointments for patient
  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        // load doctors list (backend endpoint assumed /doctors)
        const dRes = await api.get('/doctors');
        setDoctors(Array.isArray(dRes.data) ? dRes.data : (dRes.data?.content || dRes.data));
        // load my appointments
        const patientId = user?.userId ?? user?.id;
        const appts = await fetchAppointments({ patientId });
        setMyAppointments(Array.isArray(appts) ? appts : (appts?.content || appts));
      } catch (err) {
        console.error(err);
        alert('Failed to load doctors/appointments');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  async function handleBooking(e) {
    e.preventDefault();
    const patientId = user?.userId ?? user?.id;
    if (!doctorId || !dateTime) return alert('Choose doctor and date/time');
    try {
      await createAppointment({ doctorId, patientId, dateTime, reason });
      alert('Booking created');
      // reload appointments
      const appts = await fetchAppointments({ patientId });
      setMyAppointments(Array.isArray(appts) ? appts : appts?.content || appts);
    } catch (err) {
      console.error(err);
      alert('Booking failed: ' + (err?.response?.data?.message || err.message));
    }
  }

  return (
    <div>
      <div className="header-row">
        <div className="header-title">Book Appointment</div>
      </div>

      <div className="card">
        <form onSubmit={handleBooking} className="form-grid">
          <div>
            <label>Doctor</label>
            <select className="form-control" value={doctorId} onChange={e=>setDoctorId(e.target.value)} required>
              <option value="">Choose doctor</option>
              {doctors.map(d => (
                <option key={d.id ?? d.doctorId ?? d.userId} value={d.id ?? d.doctorId ?? d.userId}>
                  {d.fullName ?? `${d.firstName || ''} ${d.lastName || ''}`.trim() || d.email}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label>Date & time</label>
            <input type="datetime-local" className="form-control" value={dateTime} onChange={e=>setDateTime(e.target.value)} required />
          </div>

          <div className="form-row-full">
            <label>Reason</label>
            <input className="form-control" value={reason} onChange={e=>setReason(e.target.value)} placeholder="Reason for visit (toothache, cleaning, etc.)" />
          </div>

          <div className="form-row-full" style={{display:'flex', justifyContent:'flex-end'}}>
            <button className="btn btn-primary" type="submit">Book</button>
          </div>
        </form>
      </div>

      <div style={{marginTop:12}} className="card">
        <h3>Your upcoming appointments</h3>
        {loading ? <div>Loading...</div> : (
          <ul>
            {myAppointments.length === 0 && <li className="muted">No appointments</li>}
            {myAppointments.map(a => (
              <li key={a.id ?? a.appointmentId}>
                <strong>{a.dateTime ? new Date(a.dateTime).toLocaleString() : a.scheduledAt}</strong> with {a.doctorName ?? (a.doctor?.fullName || `${a.doctor?.firstName || ''} ${a.doctor?.lastName || ''}`.trim())} — {a.status ?? 'PENDING'}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
