package com.dbms.grp2.service.impl;

import com.dbms.grp2.dto.PatientCreateDto;
import com.dbms.grp2.dto.PatientResponseDto;
import com.dbms.grp2.model.Patient;
import com.dbms.grp2.repository.PatientRepository;
import com.dbms.grp2.service.patientService;
import jakarta.transaction.Transactional;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import static com.dbms.grp2.mapper.PatientMapper.toEntity;
import static com.dbms.grp2.mapper.PatientMapper.toPatientResponse;

@Service
public class patientServiceImpl implements patientService {
    private final PatientRepository patientRepository;

    public patientServiceImpl(PatientRepository patientRepository) {
        this.patientRepository = patientRepository;
    }

    @Override
    @Transactional
    public PatientResponseDto createPatient(PatientCreateDto dto) {
        if (patientRepository.existsByEmailId(dto.getEmailId())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email already taken");
        }
        Patient patient = toEntity(dto);
        Patient saved = patientRepository.save(patient);
        return toPatientResponse(saved);
    }
}
