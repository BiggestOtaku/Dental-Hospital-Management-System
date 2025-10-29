import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate, Link } from 'react-router-dom';

export default function AddCampPage() {
    const [date, setDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [attendeeCount, setAttendeeCount] = useState('');
    const [addressDescription, setAddressDescription] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [pin, setPin] = useState('');
    const [transactionId, setTransactionId] = useState('');

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const combineDateTime = (dateStr, timeStr) => {
        if (!dateStr || !timeStr) return null;
        return `${dateStr}T${timeStr}`; 
    };

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const payload = {
            date,
            startTime: combineDateTime(date, startTime),
            endTime: combineDateTime(date, endTime),
            attendeeCount: parseInt(attendeeCount, 10),
            addressDescription,
            city,
            state,
            pin: parseInt(pin, 10),
            transactionId: parseInt(transactionId, 10), 
        };

        // Basic frontend validation 
        if (!payload.transactionId) {
            setError("Transaction ID is required.");
            setLoading(false);
            return;
        }
        if (!payload.startTime || !payload.endTime) {
            setError("Start and End times are required.");
            setLoading(false);
            return;
        }

        try {
            
            await api.post('/admin/add-camp', payload);
            alert('Camp added successfully!');
            navigate('/admin/camps'); 
        } catch (err) {
            console.error("Error adding camp:", err);
            const errorMessage = err.response?.data?.errors
                ? err.response.data.errors.map(e => e.defaultMessage).join(', ')
                : (err.response?.data?.message || err.message || 'Failed to add camp.');
            setError(errorMessage);
            alert(`Error: ${errorMessage}`);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h2>Add New Camp</h2>
                <Link to="/admin/camps" className="btn btn-secondary">
                    &larr; Back to List
                </Link>
            </div>

            <form onSubmit={handleSubmit} className="card p-3">
                {error && <div className="alert alert-danger">{error}</div>}

               
                <div className="mb-3">
                    <label htmlFor="date" className="form-label">Date</label>
                    <input type="date" className="form-control" id="date" value={date} onChange={(e) => setDate(e.target.value)} required />
                </div>

                <div className="row mb-3">
                    <div className="col">
                        <label htmlFor="startTime" className="form-label">Start Time</label>
                        <input type="time" className="form-control" id="startTime" value={startTime} onChange={(e) => setStartTime(e.target.value)} required />
                    </div>
                    <div className="col">
                        <label htmlFor="endTime" className="form-label">End Time</label>
                        <input type="time" className="form-control" id="endTime" value={endTime} onChange={(e) => setEndTime(e.target.value)} required />
                    </div>
                </div>

                <div className="mb-3">
                    <label htmlFor="attendeeCount" className="form-label">Attendee Count</label>
                    <input type="number" className="form-control" id="attendeeCount" value={attendeeCount} onChange={(e) => setAttendeeCount(e.target.value)} min="0" required />
                </div>

                <div className="mb-3">
                    <label htmlFor="addressDescription" className="form-label">Address Description</label>
                    <input type="text" className="form-control" id="addressDescription" value={addressDescription} onChange={(e) => setAddressDescription(e.target.value)} required />
                </div>

                <div className="row mb-3">
                    <div className="col">
                        <label htmlFor="city" className="form-label">City</label>
                        <input type="text" className="form-control" id="city" value={city} onChange={(e) => setCity(e.target.value)} required />
                    </div>
                    <div className="col">
                        <label htmlFor="state" className="form-label">State</label>
                        <input type="text" className="form-control" id="state" value={state} onChange={(e) => setState(e.target.value)} required />
                    </div>
                    <div className="col">
                        <label htmlFor="pin" className="form-label">PIN Code</label>
                        <input type="number" className="form-control" id="pin" value={pin} onChange={(e) => setPin(e.target.value)} required />
                    </div>
                </div>

                <div className="mb-3">
                    <label htmlFor="transactionId" className="form-label">Associated Transaction ID</label>
                    <input type="number" className="form-control" id="transactionId" value={transactionId} onChange={(e) => setTransactionId(e.target.value)} required min="1" />
                    <div className="form-text">Enter the ID of an existing transaction related to this camp's expenses.</div>
                </div>

                <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? 'Adding...' : 'Add Camp'}
                </button>
            </form>
        </div>
    );
}