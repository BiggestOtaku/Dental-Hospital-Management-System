package com.dbms.grp2.controller;

import com.dbms.grp2.dto.LoginRequestDto;
import com.dbms.grp2.dto.PatientCreateDto;
import com.dbms.grp2.dto.PatientResponseDto;
import com.dbms.grp2.service.patientService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final patientService patientService;

    public AuthController(patientService patientService) {
        this.patientService = patientService;
    }

    @PostMapping("/register")
    public ResponseEntity<PatientResponseDto> createPatient(@Valid @RequestBody PatientCreateDto dto) {
        PatientResponseDto responseDto = patientService.createPatient(dto);
        return new ResponseEntity<>(responseDto, HttpStatus.CREATED);
    }

    @GetMapping("/login")
    public ResponseEntity<PatientResponseDto> getPatient(@RequestBody LoginRequestDto dto) {
        PatientResponseDto responseDto = patientService.getPatient(dto);
        return new ResponseEntity<>(responseDto, HttpStatus.OK);
    }
}
