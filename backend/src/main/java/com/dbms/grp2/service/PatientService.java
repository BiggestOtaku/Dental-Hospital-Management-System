package com.dbms.grp2.service;

import com.dbms.grp2.dto.PatientCreateDto;
import com.dbms.grp2.dto.PatientDto;
import com.dbms.grp2.dto.PatientUpdateDto;

import java.util.List;

public interface PatientService {
    List<PatientDto> getAllPatients();
    PatientDto getPatientById(Long id);
    PatientDto createPatient(PatientCreateDto dto);
    PatientDto updatePatientById(Long id, PatientUpdateDto dto);
}
