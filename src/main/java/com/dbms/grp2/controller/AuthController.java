package com.dbms.grp2.controller;

import com.dbms.grp2.dto.PatientCreateDto;
import com.dbms.grp2.dto.PatientResponseDto;
import com.dbms.grp2.model.Patient;
import com.dbms.grp2.service.patientService;
import jakarta.annotation.PostConstruct;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final patientService patientService;

    public AuthController(patientService patientService) {
        this.patientService = patientService;
    }

    @PostMapping("/register")
    public ResponseEntity<PatientResponseDto> createPatient(@RequestBody PatientCreateDto dto) {
        PatientResponseDto responseDto = patientService.createPatient(dto);
        return new ResponseEntity<>(responseDto, HttpStatus.CREATED);
    }
}
