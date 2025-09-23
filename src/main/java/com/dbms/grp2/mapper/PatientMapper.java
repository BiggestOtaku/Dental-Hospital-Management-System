package com.dbms.grp2.mapper;

import com.dbms.grp2.dto.PatientCreateDto;
import com.dbms.grp2.dto.PatientResponseDto;
import com.dbms.grp2.model.Patient;

public class PatientMapper {

    public static PatientResponseDto toPatientResponse(Patient patient) {
        PatientResponseDto dto = new PatientResponseDto();
        dto.setId(patient.getPatientId());
        dto.setFirstName(patient.getFirstName());
        dto.setLastName(patient.getLastName());
        dto.setEmail(patient.getEmailId());
        return dto;
    }

    public static Patient toEntity(PatientCreateDto dto) {
        Patient patient = new Patient();
        patient.setFirstName(dto.getFirstName());
        patient.setLastName(dto.getLastName());
        patient.setEmailId(dto.getEmail());
        patient.setPassword(dto.getPassword());
        return patient;
    }
}
