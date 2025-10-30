import React, { useState, useContext, useEffect, useCallback } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';

/**
 * Custom Modal Component using internal styling (replacing the need for `alert()`)
 */
function CustomMessageModal({ title, message, isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
      backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050, display: 'flex', 
      justifyContent: 'center', alignItems: 'center'
    }}>
      <div className="modal-dialog" style={{ width: '90%', maxWidth: '400px' }}>
        <div className="modal-content" style={{ borderRadius: '0.5rem', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}>
          <div className="modal-header bg-primary text-white" style={{ borderTopLeftRadius: '0.5rem', borderTopRightRadius: '0.5rem' }}>
            <h5 className="modal-title">{title}</h5>
            {/* Using a visually consistent close button */}
            <button type="button" className="close text-white" onClick={onClose} aria-label="Close" style={{ background: 'none', border: 'none', fontSize: '1.5rem', lineHeight: '1' }}>
              &times;
            </button>
          </div>
          <div className="modal-body">
            <p>{message}</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-primary" onClick={onClose}>
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


/**
 * Appointment Request Modal
 */
function AppointmentRequestModal({ isOpen, onClose, doctors, onConfirm, showMessage }) {
  const [selectedDoctorId, setSelectedDoctorId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

//   console.log(doctors);
  // Reset state when the modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setSelectedDoctorId('');
      setIsSubmitting(false);
    }
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedDoctorId) {
      showMessage('Validation Error', 'Please select a doctor.', 'danger');
      return;
    }
    setIsSubmitting(true);
    await onConfirm(selectedDoctorId);
    setIsSubmitting(false);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
      backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1040, display: 'flex', 
      justifyContent: 'center', alignItems: 'center', color: 'white'
    }}>
      <div className="modal-dialog" style={{ width: '90%', maxWidth: '500px' }}>
        <div className="modal-content" style={{ borderRadius: '0.5rem' }}>
          <div className="modal-header">
            <h5 className="modal-title">Request New Appointment</h5>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <p style={{color: 'white'}}>Please select a doctor to request an appointment with.</p>
              <div className="form-group">
                <label htmlFor="doctorSelect" style={{color: 'white'}}>Select Doctor</label>
                <select 
                  id="doctorSelect" 
                  className="form-control"
                  value={selectedDoctorId}
                  onChange={(e) => setSelectedDoctorId(e.target.value)}
                  required
                >
                  <option value="">-- Choose a Doctor --</option>
                  {doctors.map(doctor => (
                    // Doctor ID is used as value
                    <option key={doctor.employeeId} value={doctor.employeeId}>
                      Dr. {doctor.firstName + " " + doctor.lastName} ({doctor.emailId})
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose} disabled={isSubmitting}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary" disabled={isSubmitting || !selectedDoctorId}>
                {isSubmitting ? 'Submitting...' : 'Request Appointment'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

// Backend Fetcher for Doctors
const fetchDoctors = async () => {
  try {
    // Calling the public endpoint defined for getting doctor list
    const res = await api.get('/public/doctors'); 
    
    // Assuming the backend returns an array of doctor objects, 
    // where each object has 'id', 'email', and 'name'.
    return res.data; 
  } catch (err) {
    console.error('Error fetching doctors from /public/doctors:', err);
    // Throw error so the caller can handle the loading state failure
    throw new Error('Failed to fetch doctor list from the server.');
  }
};


export default function PatientAppointmentsPage() {
  const { user } = useContext(AuthContext);
  // Using a mock userId if one isn't available for local testing purposes
  const patientId = user?.userId || 1; 
  
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Pagination State
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [isDoctorLoading, setIsDoctorLoading] = useState(false);

  // Custom Message Modal State
  const [messageModal, setMessageModal] = useState({ isOpen: false, title: '', message: '' });
  
  const showMessage = (title, message) => {
    setMessageModal({ isOpen: true, title, message });
  };

  const closeMessageModal = () => {
    setMessageModal({ isOpen: false, title: '', message: '' });
  };


  // Fetch Appointments
  const fetchAppointments = useCallback(async (pageNumber) => {
    if (!patientId) return;

    setLoading(true);
    setError(null);
    try {
      // Backend expects 0-indexed page number and returns Paged data
      const res = await api.get(`/appointments/patient/${patientId}`, {
        params: {
          page: pageNumber,
          size: 5 // Fetch 5 appointments per page
        }
      });
      setAppointments(res.data.content || []);
      setTotalPages(res.data.totalPages || 0);
      setPage(pageNumber);

    } catch (err) {
      console.error('Error fetching appointments:', err);
      setError('Failed to load appointments. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [patientId]);


  // Initial load
  useEffect(() => {
    fetchAppointments(0);
  }, [fetchAppointments]);


  // Fetch Doctors for Modal
  const handleFetchDoctors = async () => {
    setIsDoctorLoading(true);
    try {
      // Use the actual backend fetcher
      const doctorList = await fetchDoctors(); 
      setDoctors(doctorList.content);
    } catch (err) {
      console.error('Error fetching doctors:', err);
      showMessage('Doctor Load Failed', 'Could not load list of doctors. Please ensure the backend is running and the /public/doctors endpoint is available.');
    } finally {
      setIsDoctorLoading(false);
    }
  };


  const handleOpenModal = () => {
    handleFetchDoctors();
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAppointmentRequest = async (doctorId) => {
    if (!patientId) return;

    try {
      const requestDto = {
        patientId: patientId,
        doctorId: parseInt(doctorId, 10), // Ensure it's a number
      };

      await api.post('/appointments/request', requestDto);
      
      showMessage('Success', 'Appointment request submitted successfully! Awaiting doctor confirmation.');
      handleCloseModal();
      // Refresh the list to show the new pending appointment
      fetchAppointments(0); 

    } catch (err) {
      console.error('Error requesting appointment:', err);
      const errorMessage = err.response?.data?.message || 'Failed to submit appointment request.';
      showMessage('Request Failed', errorMessage);
    }
  };

  if (!patientId) return <div className="container mt-5"><p>Error: User not identified or ID missing.</p></div>;

  return (
    <div className="container mt-5">
      <h2 className="mb-4">My Appointments ({user?.emailId || `Patient ID: ${patientId}`})</h2>

      <div className="d-flex justify-content-between mb-3">
        {/* The Request Appointment Button */}
        <button 
          className="btn btn-success" 
          onClick={handleOpenModal}
          disabled={isDoctorLoading}
        >
          {isDoctorLoading ? 'Loading Doctors...' : 'Request New Appointment'}
        </button>
      </div>


      {loading && <p>Loading appointments...</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      
      {!loading && appointments.length === 0 && (
        <div className="alert alert-info">You have no appointments yet.</div>
      )}

      {!loading && appointments.length > 0 && (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead className="thead-dark">
              <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Time</th>
                <th>Doctor</th>
                <th>Status</th>
                <th>Amount</th>
                <th>Report</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map(app => (
                <tr key={app.appointmentId}>
                  <td>{app.appointmentId}</td>
                  <td>{app.date}</td>
                  <td>{app.startTime ? `${app.startTime} - ${app.endTime}` : 'N/A'}</td>
                  <td>Dr. {app.employeeEmailId ? app.employeeEmailId.split('@')[0] : 'TBD'}</td>
                  <td>
                    <span className={`badge ${
                      app.status === 'CONFIRMED' ? 'bg-primary' : 
                      app.status === 'PENDING' ? 'bg-warning text-dark' : 
                      app.status === 'COMPLETED' ? 'bg-success' : 'bg-danger'
                    }`}>{app.status}</span>
                  </td>
                  <td>{app.amount ? `₹${app.amount}` : '-'}</td>
                  <td>{app.report || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {/* Pagination Controls */}
          <nav className="d-flex justify-content-center">
            <ul className="pagination">
              <li className={`page-item ${page === 0 ? 'disabled' : ''}`}>
                <button className="page-link" onClick={() => fetchAppointments(page - 1)} disabled={page === 0}>&laquo; Previous</button>
              </li>
              {/* Simple page numbering for demonstration */}
              <li className="page-item disabled">
                <span className="page-link">Page {page + 1} of {totalPages}</span>
              </li>
              <li className={`page-item ${page >= totalPages - 1 ? 'disabled' : ''}`}>
                <button className="page-link" onClick={() => fetchAppointments(page + 1)} disabled={page >= totalPages - 1}>Next &raquo;</button>
              </li>
            </ul>
          </nav>
        </div>
      )}

      {/* Appointment Request Modal */}
      <AppointmentRequestModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        doctors={doctors}
        onConfirm={handleAppointmentRequest}
        showMessage={showMessage}
      />

      {/* Custom Message Modal */}
      <CustomMessageModal 
        title={messageModal.title} 
        message={messageModal.message} 
        isOpen={messageModal.isOpen} 
        onClose={closeMessageModal} 
      />
    </div>
  );
}
