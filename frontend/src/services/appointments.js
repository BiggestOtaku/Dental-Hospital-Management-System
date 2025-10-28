// src/services/appointments.js
import api from './api';

// Fetch appointments. Backend should accept optional query params to filter by role/user.
export async function fetchAppointments(params = {}) {
  // params can be { doctorId, patientId, status }
  const res = await api.get('/appointments', { params });
  return res.data;
}

// Create a booking (patient booking)
export async function createAppointment(payload) {
  // payload example: { doctorId, patientId, dateTime: "2025-10-30T10:30:00", reason: "tooth pain" }
  const res = await api.post('/appointments', payload);
  return res.data;
}

// Update appointment (doctor confirm/cancel)
export async function updateAppointment(appointmentId, payload) {
  const res = await api.put(`/appointments/${appointmentId}`, payload);
  return res.data;
}
