import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';

export default function AdminCampEmployeePage() {
  // --- VIEWER STATE ---
  const [currentCampId, setCurrentCampId] = useState('');
  const [employeeEmails, setEmployeeEmails] = useState(null); // List of emails for currentCampId
  const [viewLoading, setViewLoading] = useState(false);
  const [viewError, setViewError] = useState(null);

  // --- ADDER FORM STATE ---
  const [addCampId, setAddCampId] = useState(''); // Camp ID for the form
  const [addEmployeeEmail, setAddEmployeeEmail] = useState(''); // Employee email for the form
  const [addLoading, setAddLoading] = useState(false);
  const [addError, setAddError] = useState(null);

  // --- HANDLER: Fetch Employees for a Camp ---
  const fetchEmployeesForCamp = async (campId) => {
    if (!campId || isNaN(campId)) {
      setViewError("Please enter a valid Camp ID.");
      setEmployeeEmails(null);
      return;
    }

    setViewLoading(true);
    setViewError(null);
    setEmployeeEmails(null);

    try {
      // API: GET /admin/get-camp-employees/{id}
      const response = await api.get(`/admin/get-camp-employees/${campId}`);
      setEmployeeEmails(response.data);
      setCurrentCampId(campId); // Update successfully viewed camp ID
    } catch (err) {
      console.error("Error fetching camp employees:", err);
      const msg = err.response?.status === 404 
        ? `Camp with ID ${campId} not found.`
        : (err.response?.data?.message || err.message || 'Failed to fetch employees for camp.');
      setViewError(msg);
    } finally {
      setViewLoading(false);
    }
  };

  // --- HANDLER: Add Employee to Camp ---
  const handleAddEmployee = async (e) => {
    e.preventDefault();
    setAddLoading(true);
    setAddError(null);

    const cId = addCampId ? Number(addCampId) : null;
    const email = addEmployeeEmail.trim();

    if (!cId || !email) {
      setAddError("Camp ID and Employee Email are required.");
      setAddLoading(false);
      return;
    }

    try {
      // API: POST /admin/add-employee-to-camp/{id}/{emailId}
      await api.post(`/admin/add-employee-to-camp/${cId}/${email}`);
      alert(`Employee ${email} successfully added to Camp ${cId}!`);

      // Optionally refresh the current list if the newly added camp is the one being viewed
      if (currentCampId === cId) {
        fetchEmployeesForCamp(cId);
      }
      
      // Clear form fields
      setAddCampId('');
      setAddEmployeeEmail('');

    } catch (err) {
      console.error("Error adding employee:", err);
      const msg = err.response?.data?.message || err.message || 'Failed to add employee to camp.';
      setAddError(msg);
    } finally {
      setAddLoading(false);
    }
  };

  // --- Render Logic ---
  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2>Manage Camp Employees</h2>
        <Link to="/admin" className="btn btn-secondary">&larr; Back to Admin</Link>
      </div>

      {/* --- SECTION 1: VIEWER / SEARCH --- */}
      <div className="card mb-4">
        <div className="card-header">
          <h5>View Employees Assigned to Camp</h5>
        </div>
        <div className="card-body">
          <form onSubmit={(e) => { e.preventDefault(); fetchEmployeesForCamp(currentCampId); }} className="input-group mb-3">
            <input
              type="number"
              className="form-control"
              placeholder="Enter Camp ID (e.g., 1)"
              value={currentCampId}
              onChange={(e) => setCurrentCampId(e.target.value)}
              disabled={viewLoading}
              min="1"
              required
            />
            <button className="btn btn-info" type="submit" disabled={viewLoading}>
              {viewLoading ? 'Loading...' : 'Load Employees'}
            </button>
          </form>

          {viewError && <div className="alert alert-danger">{viewError}</div>}

          {/* Employee List Display */}
          {employeeEmails && (
            <div className="mt-3">
              <h6>Employees for Camp ID: {currentCampId}</h6>
              {employeeEmails.length > 0 ? (
                <ul className="list-group list-group-flush">
                  {employeeEmails.map((email, index) => (
                    // NOTE: Assuming there's a detail page at /admin/employees/:email
                    <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                      {email}
                      <Link to={`/admin/employees/${email}`} className="btn btn-sm btn-outline-info">View Details</Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="alert alert-warning">No employees currently assigned to this camp.</div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* --- SECTION 2: ADD EMPLOYEE TO CAMP FORM --- */}
      <div className="card">
        <div className="card-header">
          <h5>Associate New Employee with Camp</h5>
        </div>
        <div className="card-body">
          <form onSubmit={handleAddEmployee}>
            {addError && <div className="alert alert-danger">{addError}</div>}

            <div className="row mb-3">
              <div className="col">
                <label className="form-label">Camp ID</label>
                <input type="number" className="form-control" value={addCampId} onChange={(e) => setAddCampId(e.target.value)} required min="1" />
              </div>
              <div className="col">
                <label className="form-label">Employee Email</label>
                <input type="email" className="form-control" value={addEmployeeEmail} onChange={(e) => setAddEmployeeEmail(e.target.value)} required />
              </div>
            </div>

            <button type="submit" className="btn btn-success mt-2" disabled={addLoading}>
              {addLoading ? 'Adding...' : 'Add Employee'}
            </button>
          </form>
        </div>
      </div>

    </div>
  );
}