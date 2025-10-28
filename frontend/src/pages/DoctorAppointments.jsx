// DoctorAppointments.jsx
import React, { useEffect, useState, useContext } from 'react';
import { fetchAppointments, updateAppointment } from '../services/appointments';
import { AuthContext } from '../context/AuthContext';

export default function DoctorAppointments() {
  const { user } = useContext(AuthContext);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    try {
      // try to filter server-side by doctorId if backend supports it
      const doctorId = user?.userId ?? user?.id ?? user?.doctorId;
      const data = await fetchAppointments({ doctorId });
      // data might be array or wrapper
      setAppointments(Array.isArray(data) ? data : (data?.content || data));
    } catch (err) {
      console.error(err);
      alert('Failed to load appointments');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  async function handleUpdate(id, status) {
    try {
      await updateAppointment(id, { status });
      alert('Updated');
      load();
    } catch (err) {
      console.error(err);
      alert('Update failed');
    }
  }

  return (
    <div>
      <div className="header-row">
        <div className="header-title">Appointments</div>
      </div>

      <div className="card">
        {loading ? <div>Loading...</div> : (
          <div className="table-responsive">
            <table className="table table-striped mb-0">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Patient</th>
                  <th>Date & Time</th>
                  <th>Reason</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {appointments.length === 0 && (<tr><td colSpan="6">No appointments</td></tr>)}
                {appointments.map((a, i) => {
                  const id = a.id ?? a.appointmentId ?? i;
                  const patientName = a.patientName ?? `${a.patient?.firstName || ''} ${a.patient?.lastName || ''}`.trim() || (a.patient?.email || '-');
                  const dt = a.dateTime ?? a.scheduledAt ?? a.appointmentDate;
                  return (
                    <tr key={id}>
                      <td>{i+1}</td>
                      <td>{patientName}</td>
                      <td>{dt ? new Date(dt).toLocaleString() : '-'}</td>
                      <td>{a.reason ?? '-'}</td>
                      <td>{a.status ?? 'PENDING'}</td>
                      <td>
                        <button className="btn btn-sm btn-outline-success" onClick={() => handleUpdate(id, 'CONFIRMED')}>Confirm</button>{' '}
                        <button className="btn btn-sm btn-outline-danger" onClick={() => handleUpdate(id, 'CANCELLED')}>Cancel</button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
