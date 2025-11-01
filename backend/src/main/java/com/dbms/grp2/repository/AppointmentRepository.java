package com.dbms.grp2.repository;

import com.dbms.grp2.model.Appointment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.Repository;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    Page<Appointment> findByPatientPatientId(Long patientId, Pageable pageable);

    Page<Appointment> findByEmployeeEmployeeId(Long doctorId, Pageable pageable);
}