package com.dbms.grp2.service.impl;

import com.dbms.grp2.model.Appointment;
import com.dbms.grp2.model.Employee;
import com.dbms.grp2.model.Patient;
import com.dbms.grp2.repository.AppointmentRepository;
import com.dbms.grp2.repository.EmployeeRepository;
import com.dbms.grp2.repository.PatientRepository;
import com.dbms.grp2.service.AppointmentService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AppointmentServiceImpl implements AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final PatientRepository patientRepository;
    private final EmployeeRepository employeeRepository;

    @Transactional
    public Appointment createNewAppointment(Appointment appointment, Long doctorId, Long patientId) {
        Employee doctor = employeeRepository.findById(doctorId).orElseThrow();
        Patient patient = patientRepository.findById(patientId).orElseThrow();

        if(appointment.getAppointmentId() != null) throw new IllegalArgumentException("Appointment should not have an ID already");

        appointment.setPatient(patient);
        appointment.setEmployee(doctor);

        return appointmentRepository.save(appointment);
    }
}
