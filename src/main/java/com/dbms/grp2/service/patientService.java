package com.dbms.grp2.service;

import com.dbms.grp2.dto.PatientCreateDto;
import com.dbms.grp2.dto.PatientResponseDto;

public interface patientService {
    PatientResponseDto createPatient(PatientCreateDto dto);
}
