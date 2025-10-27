import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

export default function ProfilePage() {
  const { user, token, logout } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [message, setMessage] = useState('');

  // password modal fields
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMsg, setPasswordMsg] = useState('');

  useEffect(() => {
    if (!token) return;
    fetchProfile();
  }, [token]);

  async function fetchProfile() {
    try {
      const res = await axios.get('http://localhost:8080/api/patients/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProfile(res.data);
    } catch (err) {
      console.error(err);
    }
  }

  function handleChange(e) {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  }

  async function handleSave() {
    try {
      await axios.put('http://localhost:8080/api/patients/me', profile, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage('✅ Profile updated successfully');
      setEditing(false);
    } catch (err) {
      console.error(err);
      setMessage('❌ Failed to update profile');
    }
  }

  async function handleDelete() {
    if (!window.confirm('Are you sure you want to delete your account?')) return;
    try {
      await axios.delete('http://localhost:8080/api/patients/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Account deleted');
      logout();
      window.location.href = '/login';
    } catch (err) {
      console.error(err);
      alert('Failed to delete account');
    }
  }

  async function handleChangePassword() {
    if (!oldPassword || !newPassword || !confirmPassword) {
      setPasswordMsg('⚠️ All fields are required');
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordMsg('❌ New passwords do not match');
      return;
    }
    try {
      await axios.post(
        'http://localhost:8080/api/users/change-password',
        { oldPassword, newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPasswordMsg('✅ Password changed successfully');
      setTimeout(() => {
        setShowPasswordModal(false);
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setPasswordMsg('');
      }, 1500);
    } catch (err) {
      console.error(err);
      setPasswordMsg('❌ Failed to change password');
    }
  }

  if (!profile) return <div>Loading profile...</div>;

  return (
    <div className="container mt-4" style={{ maxWidth: '600px' }}>
      <h3 className="mb-3">My Profile</h3>

      {message && (
        <div
          style={{
            color: message.startsWith('✅') ? 'green' : 'red',
            marginBottom: '8px',
          }}
        >
          {message}
        </div>
      )}

      <div className="card p-3 shadow-sm rounded-3">
        <div className="mb-2">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={profile.name || ''}
            onChange={handleChange}
            disabled={!editing}
            className="form-control"
          />
        </div>

        <div className="mb-2">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={profile.email || ''}
            onChange={handleChange}
            disabled={!editing}
            className="form-control"
          />
        </div>

        <div className="mb-2">
          <label>Address</label>
          <input
            type="text"
            name="address"
            value={profile.address || ''}
            onChange={handleChange}
            disabled={!editing}
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label>Phone</label>
          <input
            type="text"
            name="phone"
            value={profile.phone || ''}
            onChange={handleChange}
            disabled={!editing}
            className="form-control"
          />
        </div>

        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
          {editing ? (
            <>
              <button className="btn btn-success btn-sm" onClick={handleSave}>
                Save
              </button>
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => setEditing(false)}
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                className="btn btn-outline-primary btn-sm"
                onClick={() => setEditing(true)}
              >
                Edit
              </button>
              <button
                className="btn btn-outline-warning btn-sm"
                onClick={() => setShowPasswordModal(true)}
              >
                Change Password
              </button>
              <button
                className="btn btn-outline-danger btn-sm"
                onClick={handleDelete}
              >
                Delete Account
              </button>
            </>
          )}
        </div>
      </div>

      {/* ================= PASSWORD CHANGE POPUP ================= */}
      {showPasswordModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
          }}
        >
          <div
            className="card p-4 shadow"
            style={{
              background: '#fff',
              borderRadius: 12,
              minWidth: 350,
              maxWidth: '90%',
            }}
          >
            <h5 className="mb-3">Change Password</h5>
            {passwordMsg && (
              <div
                style={{
                  color: passwordMsg.startsWith('✅') ? 'green' : 'red',
                  marginBottom: '8px',
                }}
              >
                {passwordMsg}
              </div>
            )}
            <div className="mb-2">
              <label>Old Password</label>
              <input
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="mb-2">
              <label>New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label>Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="form-control"
              />
            </div>

            <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => {
                  setShowPasswordModal(false);
                  setPasswordMsg('');
                }}
              >
                Cancel
              </button>
              <button
                className="btn btn-primary btn-sm"
                onClick={handleChangePassword}
              >
                Change
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
