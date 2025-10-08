package com.dbms.grp2.service;

import com.dbms.grp2.model.Appointment;

public interface AppointmentService {
    Appointment createNewAppointment(Appointment appointment, Long doctorId, Long patientId);
}
