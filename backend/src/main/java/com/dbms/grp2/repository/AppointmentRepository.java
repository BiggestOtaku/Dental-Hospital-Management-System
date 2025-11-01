package com.dbms.grp2.repository;

import com.dbms.grp2.model.Appointment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.Repository;
import org.springframework.data.repository.query.Param;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    Page<Appointment> findByPatientPatientId(Long patientId, Pageable pageable);

    Page<Appointment> findByEmployeeEmployeeId(Long doctorId, Pageable pageable);

    @Query("""
SELECT a FROM Appointment a
WHERE a.employee.id = :doctorId
AND (:search IS NULL OR LOWER(a.patient.emailId) LIKE LOWER(CONCAT('%', :search, '%')))
ORDER BY 
  CASE WHEN LOWER(a.patient.emailId) = LOWER(:search) THEN 0 ELSE 1 END,
  a.date ASC
""")
    Page<Appointment> findAppointmentsByDoctorWithSearch(
            @Param("doctorId") Long doctorId,
            @Param("search") String search,
            Pageable pageable
    );
}