package com.dbms.grp2.service.impl;

import com.dbms.grp2.dto.PatientCreateDto;
import com.dbms.grp2.dto.PatientResponseDto;
import com.dbms.grp2.repository.PatientRepository;
import com.dbms.grp2.service.patientService;
import org.springframework.stereotype.Service;

@Service
public class patientServiceImpl implements patientService {
    private PatientRepository patientRepository;

    @Override
    public PatientResponseDto createPatient(PatientCreateDto dto){
        PatientResponseDto resDto = null;
        return resDto;
    }
}g
