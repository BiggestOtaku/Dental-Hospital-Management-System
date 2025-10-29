import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useParams, useNavigate, Link } from 'react-router-dom';

export default function EditEmployeePage() {
    const { email } = useParams();
    const navigate = useNavigate();


    const [employeeId, setEmployeeId] = useState(''); // To get the actual ID
    const [employeeType, setEmployeeType] = useState('');
    const [firstName, setFirstName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [lastName, setLastName] = useState('');

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);

    //purane employee data ko fetch krna
    useEffect(() => {
        async function fetchEmployeeData() {
            if (!email) return;

            try {
                setLoading(true);
                setError(null);
                const response = await api.get(`/admin/get-employee/${email}`);
                const data = response.data;

                setEmployeeId(data.employeeId);
                setEmployeeType(data.employeeType || '');
                setFirstName(data.firstName || '');
                setMiddleName(data.middleName || '');
                setLastName(data.lastName || '');

            } catch (err) {
                console.error("Error fetching employee data:", err);
                const msg = err.response?.status === 404
                    ? `Employee with email ${email} not found for editing.`
                    : (err.response?.data?.message || err.message || 'Failed to load employee data.');
                setError(msg);
            } finally {
                setLoading(false);
            }
        }
        fetchEmployeeData();
    }, [email]);

    


    //form handle kr rha
    async function handleSubmit(e) {
        e.preventDefault();
        setSaving(true);
        setError(null);


        const payload = {
            employeeType,
            firstName,
            middleName,
            lastName,
        };

        try {
            await api.put(`/admin/update-employee/${employeeId}`, payload);
            alert('Employee updated successfully!');

            navigate(`/admin/employees/${email}`);

        } catch (err) {
            console.error("Error updating employee:", err);
            const errorMessage = err.response?.data?.errors
                ? err.response.data.errors.map(e => e.defaultMessage).join(', ')
                : (err.response?.data?.message || err.message || 'Failed to update employee.');
            setError(errorMessage);
        } finally {
            setSaving(false);
        }
    }

    if (loading) {
        return <div className="container"><h3>Loading employee data...</h3></div>;
    }

    if (error) {
        return <div className="container alert alert-danger">
            <strong>Error:</strong> {error} <br />
            <Link to={`/admin/employees/${email}`} className="alert-link">Back to details</Link>
        </div>;
    }

    return (
        <div className="container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h2>Edit Employee (Email: {email})</h2>
                <Link to={`/admin/employees/${email}`} className="btn btn-secondary">
                    Cancel
                </Link>
            </div>

            <form onSubmit={handleSubmit} className="card p-3">
                {error && <div className="alert alert-danger">{error}</div>}

                <div className="mb-3">
                    <label htmlFor="employeeType" className="form-label">Employee Type (e.g., Doctor, Nurse)</label>
                    <input type="text" className="form-control" id="employeeType" value={employeeType} onChange={(e) => setEmployeeType(e.target.value)} maxLength={50} />
                </div>

                <div className="row mb-3">
                    <div className="col">
                        <label htmlFor="firstName" className="form-label">First Name</label>
                        <input type="text" className="form-control" id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} maxLength={50} />
                    </div>
                    <div className="col">
                        <label htmlFor="middleName" className="form-label">Middle Name</label>
                        <input type="text" className="form-control" id="middleName" value={middleName} onChange={(e) => setMiddleName(e.target.value)} maxLength={50} />
                    </div>
                    <div className="col">
                        <label htmlFor="lastName" className="form-label">Last Name</label>
                        <input type="text" className="form-control" id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} maxLength={50} />
                    </div>
                </div>

                <button type="submit" className="btn btn-primary" disabled={saving}>
                    {saving ? 'Saving...' : 'Save Changes'}
                </button>
            </form>
        </div>
    );
}