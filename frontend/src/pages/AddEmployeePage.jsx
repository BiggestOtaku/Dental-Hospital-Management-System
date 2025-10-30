import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useNavigate, Link } from 'react-router-dom';

export default function AddEmployeePage() {

  const [employeeType, setEmployeeType] = useState('');
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [addressDescription, setAddressDescription] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');
  const [dob, setDob] = useState('');
  const [phoneNumbers, setPhoneNumbers] = useState('');
  const [emailId, setEmailId] = useState('');
  const [hrType, setHrType] = useState(''); // HumanResource Type
  const [joiningDate, setJoiningDate] = useState('');
  const [supervisorId, setSupervisorId] = useState('');
  const [sex, setSex] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hrOptions, setHrOptions] = useState([]); 
  const navigate = useNavigate();

  useEffect(() => {
    setHrOptions(['Doctor', 'Nurse', 'AdminStaff', 'Technician']);
    
  }, []);


  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const payload = {
      employeeType, firstName, middleName, lastName, addressDescription, city, state,
      pincode, dob, phoneNumbers, emailId, hrType, joiningDate, sex,
      supervisorId: supervisorId ? Number(supervisorId) : null, 
    };

    try {
      await api.post('/admin/add-employee', payload);
      alert('Employee added successfully!');
      navigate('/admin/employees'); 
    } catch (err) {
      console.error("Error adding employee:", err);
      const errorMessage = err.response?.data?.message || err.message || 'Failed to add employee.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h2>Add New Employee</h2>
        <Link to="/admin/employees" className="btn btn-secondary">&larr; Back to List</Link>
      </div>

      <form onSubmit={handleSubmit} className="card p-4">
        {error && <div className="alert alert-danger">{error}</div>}

        <h5 className="mb-3">Personal & Contact Info</h5>
        <div className="row mb-3">
          <div className="col"><label className="form-label">First Name *</label><input type="text" className="form-control" value={firstName} onChange={(e) => setFirstName(e.target.value)} required /></div>
          <div className="col"><label className="form-label">Middle Name</label><input type="text" className="form-control" value={middleName} onChange={(e) => setMiddleName(e.target.value)} /></div>
          <div className="col"><label className="form-label">Last Name *</label><input type="text" className="form-control" value={lastName} onChange={(e) => setLastName(e.target.value)} required /></div>
        </div>
        <div className="row mb-3">
          <div className="col-4"><label className="form-label">Email *</label><input type="email" className="form-control" value={emailId} onChange={(e) => setEmailId(e.target.value)} required /></div>
          <div className="col-4"><label className="form-label">Phone</label><input type="tel" className="form-control" value={phoneNumbers} onChange={(e) => setPhoneNumbers(e.target.value)} placeholder="+91..." /></div>
          <div className="col-4"><label className="form-label">DOB</label><input type="date" className="form-control" value={dob} onChange={(e) => setDob(e.target.value)} /></div>
        </div>
        <div className="row mb-4">
          <div className="col-4">
            <label className="form-label">Gender</label>
            <select className="form-select" value={sex} onChange={(e) => setSex(e.target.value)}>
              <option value="">Select...</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>


        <h5 className="mb-3 mt-3">Employment Details</h5>
        <div className="row mb-3">
          <div className="col">
            <label className="form-label">HR Type *</label>
            <select className="form-select" value={hrType} onChange={(e) => setHrType(e.target.value)} required>
              <option value="">Select HR Group...</option>
              {hrOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
            <div className="form-text">e.g., Doctor, AdminStaff. This determines permissions.</div>
          </div>
          <div className="col">
            <label className="form-label">Specific Role</label>
            <input type="text" className="form-control" value={employeeType} onChange={(e) => setEmployeeType(e.target.value)} placeholder="e.g., Cardiologist, Front Desk" />
          </div>
          <div className="col">
            <label className="form-label">Joining Date</label>
            <input type="date" className="form-control" value={joiningDate} onChange={(e) => setJoiningDate(e.target.value)} />
          </div>
        </div>
        <div className="row mb-4">
          <div className="col-4">
            <label className="form-label">Supervisor ID</label>
            <input type="number" className="form-control" value={supervisorId} onChange={(e) => setSupervisorId(e.target.value)} placeholder="Enter ID" />
            <div className="form-text">Optional. Must be an existing Employee ID.</div>
          </div>
        </div>

        <h5 className="mb-3 mt-3">Address</h5>
        <div className="mb-3">
          <label className="form-label">Address Lane/Description</label>
          <input type="text" className="form-control" value={addressDescription} onChange={(e) => setAddressDescription(e.target.value)} />
        </div>
        <div className="row mb-4">
          <div className="col"><label className="form-label">City</label><input type="text" className="form-control" value={city} onChange={(e) => setCity(e.target.value)} /></div>
          <div className="col"><label className="form-label">State</label><input type="text" className="form-control" value={state} onChange={(e) => setState(e.target.value)} /></div>
          <div className="col-4"><label className="form-label">Pincode</label><input type="text" className="form-control" value={pincode} onChange={(e) => setPincode(e.target.value)} maxLength={6} placeholder="6 digits" /></div>
        </div>


        <button type="submit" className="btn btn-primary mt-3" disabled={loading}>
          {loading ? 'Adding...' : 'Add Employee'}
        </button>
      </form>
    </div>
  );
}