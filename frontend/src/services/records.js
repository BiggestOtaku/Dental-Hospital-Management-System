// src/services/records.js
import api from './api';

// Get medical records for a patient (used by both doctor and patient)
export async function fetchPatientRecords(patientId) {
  // backend: GET /records/patients/{id}
  const res = await api.get(`/records/patients/${patientId}`);
  return res.data;
}

// Optionally: doctor adds a record for a patient
export async function addPatientRecord(patientId, payload) {
  // payload example: { notes, diagnosis, prescriptions }
  const res = await api.post(`/records/patients/${patientId}`, payload);
  return res.data;
}
