import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useParams, useNavigate, Link } from 'react-router-dom';


const statusOptions = [
   'PENDING' ,
  'CONFIRMED', 
  'COMPLETED', 
  'CANCELLED'
  
];

export default function EditAppointmentPage() {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [amount, setAmount] = useState('');
  const [paymentMode, setPaymentMode] = useState('');
  const [status, setStatus] = useState(statusOptions[0]);
  const [report, setReport] = useState('');

  const [loading, setLoading] = useState(true); 
  const [saving, setSaving] = useState(false); 
  const [error, setError] = useState(null);
  const [initialDataLoaded, setInitialDataLoaded] = useState(false); // initial load ho gaya ya nahi

  const formatDateForInput = (dateString) => {
    if (!dateString) return '';
    try {
      return dateString; 
    } catch (e) { return ''; }
  };
  const formatTimeForInput = (timeString) => {
     if (!timeString) return '';
     return timeString.substring(0, 5); 
  };


  useEffect(() => {
    async function fetchAppointmentData() {
      if (!id || initialDataLoaded) return; 

      try {
        setLoading(true);
        setError(null);
        const response = await api.get(`/admin/get-appointment/${id}`);
        const data = response.data;

        setDate(formatDateForInput(data.date));
        setStartTime(formatTimeForInput(data.startTime));
        setEndTime(formatTimeForInput(data.endTime));
        setAmount(data.amount != null ? String(data.amount) : ''); 
        setPaymentMode(data.paymentMode || '');
        setStatus(data.status || statusOptions[0]);
        setReport(data.report || '');

        setInitialDataLoaded(true); 

      } catch (err) {
        console.error("Error fetching appointment data:", err);
        setError(err.response?.data?.message || err.message || 'Failed to load appointment data.');
      } finally {
        setLoading(false);
      }
    }

    fetchAppointmentData();
  }, [id, initialDataLoaded]); 

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    const payload = {};
    if (date) payload.date = date;
    if (startTime) payload.startTime = startTime;
    if (endTime) payload.endTime = endTime;
    if (amount) payload.amount = parseFloat(amount);
    if (paymentMode) payload.paymentMode = paymentMode;
    if (status) payload.status = status;
    if (report) payload.report = report;


    try {
      await api.patch(`/admin/update-appointment/${id}`, payload);
      alert('Appointment updated successfully!');
      navigate(`/admin/appointments/${id}`); 
    } catch (err) {
      console.error("Error updating appointment:", err);
       const errorMessage = err.response?.data?.errors
        ? err.response.data.errors.map(e => e.defaultMessage).join(', ')
        : (err.response?.data?.message || err.message || 'Failed to update appointment.');
      setError(errorMessage);
      alert(`Error: ${errorMessage}`);
    } finally {
      setSaving(false);
    }
  }

  if (loading && !initialDataLoaded) { 
    return <div className="container"><h3>Loading appointment data...</h3></div>;
  }

  if (error && !initialDataLoaded) {
     return <div className="container alert alert-danger">
        <strong>Error:</strong> {error} <br />
        <Link to={`/admin/appointments/${id}`} className="alert-link">Back to details</Link>
     </div>;
  }


  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h2>Edit Appointment (ID: {id})</h2>
        <Link to={`/admin/appointments/${id}`} className="btn btn-secondary">
          Cancel
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="card p-3">
        {error && initialDataLoaded && <div className="alert alert-danger">{error}</div>}

        <div className="mb-3">
          <label htmlFor="date" className="form-label">Date</label>
          <input type="date" className="form-control" id="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>

         <div className="row mb-3">
            <div className="col">
                <label htmlFor="startTime" className="form-label">Start Time</label>
                <input type="time" className="form-control" id="startTime" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
            </div>
             <div className="col">
                <label htmlFor="endTime" className="form-label">End Time</label>
                <input type="time" className="form-control" id="endTime" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
            </div>
        </div>

        <div className="mb-3">
          <label htmlFor="amount" className="form-label">Amount</label>
          <input type="number" step="0.01" className="form-control" id="amount" value={amount} onChange={(e) => setAmount(e.target.value)} min="0.0" />
        </div>

        <div className="mb-3">
          <label htmlFor="paymentMode" className="form-label">Payment Mode</label>
          <input type="text" className="form-control" id="paymentMode" value={paymentMode} onChange={(e) => setPaymentMode(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="status" className="form-label">Status</label>
          <select className="form-select" id="status" value={status} onChange={(e) => setStatus(e.target.value)}>
            {statusOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="report" className="form-label">Report</label>
          <textarea className="form-control" id="report" rows="5" value={report} onChange={(e) => setReport(e.target.value)}></textarea>
        </div>

        <button type="submit" className="btn btn-primary" disabled={saving}>
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
}