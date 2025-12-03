import React, { useState, useEffect, useContext } from 'react';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';

export default function ProfilePage() {
  const { user, logout } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    emailId: '',
    phoneNumber: '',
  });
  const [editing, setEditing] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordData, setPasswordData] = useState({ oldPassword: '', newPassword: '' });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch user profile details from API
    async function fetchProfile() {
      try {
        const res = await api.get(`/patients/${user.userId}`); 
        setFormData(res.data);
      } catch (err) {
        console.error('Error fetching profile:', err);
      }
    }
    fetchProfile();
  }, []);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleUpdate(e) {
    e.preventDefault();
    try {
      setLoading(true);
      await api.put(`/patients/${user.userId}`, formData);
      alert('Profile updated successfully!');
      setEditing(false);
    } catch (err) {
      console.error(err);
      alert('Failed to update profile');
    } finally {
      setLoading(false);
    }
  }

  async function handleChangePassword(e) {
    e.preventDefault();
    try {
      setLoading(true);
      await api.post(`/patients/change-password/${user.userId}`, passwordData);
      alert('Password changed successfully!');
      setShowPasswordModal(false);
      setPasswordData({ oldPassword: '', newPassword: '' });
    } catch (err) {
      console.error(err);
      alert('Error changing password');
    } finally {
      setLoading(false);
    }
  }

  async function handleDeleteAccount() {
    if (!window.confirm('Are you sure you want to delete your account? This cannot be undone.')) return;
    try {
      await api.delete(`/patients/${user.userId}`);
      alert('Account deleted');
      logout();
    } catch (err) {
      console.error(err);
      alert('Failed to delete account');
    }
  }

  return (
    <div className="container mt-4" style={{ maxWidth: 600 }}>
      <h3>My Profile</h3>
      <hr />

      {!editing ? (
        <div>
          <p><strong>First Name:</strong> {formData.firstName}</p>
          <p><strong>Last Name:</strong> {formData.lastName}</p>
          <p><strong>Email:</strong> {formData.emailId}</p>
          <p><strong>Phone:</strong> {formData.phoneNumber}</p>

          <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
            <button className="btn btn-primary btn-sm" onClick={() => setEditing(true)}>Edit</button>
            <button className="btn btn-outline-secondary btn-sm" onClick={() => setShowPasswordModal(true)}>
              Change Password
            </button>
            <button className="btn btn-outline-danger btn-sm" onClick={handleDeleteAccount}>
              Delete Account
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleUpdate}>
          <div className="mb-3">
            <label className="form-label">First Name</label>
            <input type="text" className="form-control" name="firstName" value={formData.firstName} onChange={handleChange} required />
          </div>

          <div className="mb-3">
            <label className="form-label">Last Name</label>
            <input type="text" className="form-control" name="lastName" value={formData.lastName} onChange={handleChange} required />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" name="emailId" value={formData.emailId} disabled />
          </div>

          <div className="mb-3">
            <label className="form-label">Phone</label>
            <input type="text" className="form-control" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
          </div>

          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn btn-success btn-sm" type="submit" disabled={loading}>Save</button>
            <button className="btn btn-outline-secondary btn-sm" onClick={() => setEditing(false)} type="button">Cancel</button>
          </div>
        </form>
      )}

      {/* Password Change Modal */}
      {showPasswordModal && (
        <div className="modal-backdrop" style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.5)', display: 'flex',
          justifyContent: 'center', alignItems: 'center'
        }}>
          <div className="card p-3" style={{ width: 350 }}>
            <h5>Change Password</h5>
            <form onSubmit={handleChangePassword}>
              <div className="mb-2">
                <label className="form-label">Old Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={passwordData.oldPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, oldPassword: e.target.value })}
                  required
                />
              </div>
              <div className="mb-2">
                <label className="form-label">New Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                  required
                />
              </div>

              <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                <button className="btn btn-primary btn-sm" type="submit" disabled={loading}>Update</button>
                <button
                  className="btn btn-outline-secondary btn-sm"
                  type="button"
                  onClick={() => setShowPasswordModal(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
