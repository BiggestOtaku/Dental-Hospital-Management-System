package com.dbms.grp2.service;

import com.dbms.grp2.dto.PatientCreateDto;
import com.dbms.grp2.dto.PatientResponseDto;
import com.dbms.grp2.model.Patient;

import java.util.Optional;

public interface patientService {
    PatientResponseDto createPatient(PatientCreateDto dto);

    Optional<Patient> findByEmail(String email);
}
