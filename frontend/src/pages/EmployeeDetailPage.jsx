import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useParams, Link } from 'react-router-dom';

export default function EmployeeDetailPage() {
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { email } = useParams(); 

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString + 'T00:00:00Z').toLocaleDateString();
    } catch (e) { return 'Invalid Date'; }
  };
  
  const formatAddress = (emp) => {
    const parts = [emp.address_description, emp.city, emp.state];
    return parts.filter(p => p).join(', ') + (emp.pincode ? ` - ${emp.pincode}` : '');
  };


  useEffect(() => {
    async function fetchEmployeeDetails() {
      setLoading(true);
      setError(null);
      setEmployee(null);

      if (!email) {
          setError('Employee email ID is missing from the URL.');
          setLoading(false);
          return;
      }

      try {
        const response = await api.get(`/admin/get-employee/${email}`);
        setEmployee(response.data); 
      } catch (err) {
        console.error("Error fetching employee details:", err);
       
        const msg = err.response?.status === 404 
            ? `Employee with email ${email} not found.`
            : (err.response?.data?.message || err.message || 'Failed to fetch employee details.');
        setError(msg);
      } finally {
        setLoading(false);
      }
    }

    fetchEmployeeDetails();
  }, [email]); //refetch hoga email change pr
  if (loading) {
    return <div className="container"><h3>Loading employee details...</h3></div>;
  }

  if (error) {
    return <div className="container alert alert-danger">
      <strong>Error:</strong> {error} <br />
      <Link to="/admin/employees" className="alert-link">Back to list</Link>
    </div>;
  }

  if (!employee) {
    return <div className="container alert alert-warning">Employee data is missing.</div>;
  }


  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h2>{`${employee.firstName} ${employee.lastName}`} Details</h2>
        <Link to="/admin/employees" className="btn btn-secondary">
          &larr; Back to List
        </Link>
      </div>

      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Personal and Role Information</h5>
          <ul className="list-group list-group-flush">
            <li className="list-group-item"><strong>Employee ID:</strong> {employee.employeeId}</li>
            <li className="list-group-item"><strong>Role:</strong> {employee.employeeType || 'N/A'} ({employee.hrType || 'N/A'})</li>
            <li className="list-group-item"><strong>Email:</strong> {employee.emailId}</li>
            <li className="list-group-item"><strong>Phone:</strong> {employee.phoneNumbers || 'N/A'}</li>
            <li className="list-group-item"><strong>Gender:</strong> {employee.sex || 'N/A'}</li>
            <li className="list-group-item"><strong>Date of Birth:</strong> {formatDate(employee.dob)}</li>
            <li className="list-group-item"><strong>Joining Date:</strong> {formatDate(employee.joiningDate)}</li>
            <li className="list-group-item"><strong>Supervisor ID:</strong> {employee.supervisorId ?? 'None'}</li>
            <li className="list-group-item"><strong>Address:</strong> {formatAddress(employee) || 'N/A'}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}