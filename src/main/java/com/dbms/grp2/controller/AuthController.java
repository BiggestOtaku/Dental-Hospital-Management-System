package com.dbms.grp2.controller;

import com.dbms.grp2.dto.LoginRequestDto;
import com.dbms.grp2.dto.PatientCreateDto;
import com.dbms.grp2.dto.PatientDto;
import com.dbms.grp2.service.PatientService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final PatientService patientService;

    public AuthController(PatientService patientService) {
        this.patientService = patientService;
    }

}
