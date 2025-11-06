package com.dbms.grp2.service.impl;

import com.dbms.grp2.dto.CampAttendeeAssociationDto;
import com.dbms.grp2.model.Camp; // IMPORT THIS
import com.dbms.grp2.model.CampAttendee;
import com.dbms.grp2.model.Patient;
import com.dbms.grp2.repository.CampAttendeeRepository;
import com.dbms.grp2.repository.CampRepository;
import com.dbms.grp2.repository.PatientRepository;
import com.dbms.grp2.service.CampAttendeeService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional; // IMPORT THIS
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CampAttendeeServiceImpl implements CampAttendeeService {

    private final CampRepository campRepository;
    private final PatientRepository patientRepository;
    private final CampAttendeeRepository campAttendeeRepository;

    @Override
    @Transactional
    public CampAttendeeAssociationDto addPatientToCamp(Long campId, String patientEmailId) {

        Patient patient = patientRepository.findByEmailId(patientEmailId)
                .orElseThrow(() -> new EntityNotFoundException("Patient not found with email: " + patientEmailId));

        Camp camp = campRepository.findById(campId)
                .orElseThrow(() -> new EntityNotFoundException("Camp not found with ID: " + campId));

        if (campAttendeeRepository.existsByCampIdAndPatientId(campId, patient.getPatientId())) {
            throw new IllegalStateException("Patient " + patientEmailId + " is already registered for camp " + campId);
        }

        CampAttendee newAttendee = new CampAttendee();
        newAttendee.setCampId(campId);
        newAttendee.setPatientId(patient.getPatientId());

        campAttendeeRepository.save(newAttendee);

        camp.setAttendeeCount(camp.getAttendeeCount() + 1);
        campRepository.save(camp);

        return new CampAttendeeAssociationDto(campId, patient.getPatientId());
    }
}