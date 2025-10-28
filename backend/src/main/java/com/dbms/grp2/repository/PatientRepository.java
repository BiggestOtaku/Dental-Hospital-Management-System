package com.dbms.grp2.repository;

import com.dbms.grp2.model.Patient;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PatientRepository extends JpaRepository<Patient,Long> {
    Optional<Patient> findByPatientId(Long patientId);
    Optional<Patient> findByEmailId(String email);
    boolean existsByEmailId(String email);
}
