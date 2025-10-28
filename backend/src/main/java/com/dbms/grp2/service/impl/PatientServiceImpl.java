package com.dbms.grp2.service.impl;

import com.dbms.grp2.dto.PatientCreateDto;
import com.dbms.grp2.dto.PatientDto;
import com.dbms.grp2.dto.PatientUpdateDto;
import com.dbms.grp2.model.Patient;
import com.dbms.grp2.repository.PatientRepository;
import com.dbms.grp2.service.PatientService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PatientServiceImpl implements PatientService {
    private final PatientRepository patientRepository;
    private final ModelMapper modelMapper;

    @Override
    public List<PatientDto> getAllPatients() {
        List<Patient> patients = patientRepository.findAll();
        return patients
                .stream()
                .map(patient -> modelMapper.map(patient, PatientDto.class))
                .toList();
    }

    @Override
    public PatientDto getPatientById(Long patientId) {
        Patient patient = patientRepository.findByPatientId(patientId).orElseThrow(() -> new IllegalArgumentException("Patient not found with ID: " + patientId));
        return modelMapper.map(patient, PatientDto.class);
    }

    @Override
    public PatientDto createPatient(PatientCreateDto dto) {
        Patient newPatient = patientRepository.save(modelMapper.map(dto, Patient.class));
        return modelMapper.map(newPatient, PatientDto.class);
    }

    @Override
    public PatientDto updatePatientById(Long patientId, PatientUpdateDto dto) {
        Patient patient = patientRepository.findByPatientId(patientId).orElseThrow(() -> new IllegalArgumentException("Patient not found with ID: " + patientId));
        modelMapper.map(dto, patient);
        return modelMapper.map(patientRepository.save(patient), PatientDto.class);
    }
}
