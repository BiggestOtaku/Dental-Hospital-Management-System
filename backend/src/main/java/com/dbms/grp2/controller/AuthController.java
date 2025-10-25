package com.dbms.grp2.controller;

import com.dbms.grp2.dto.*;
import com.dbms.grp2.security.AuthService;
import com.dbms.grp2.service.PatientService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
@CrossOrigin("*")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDto> login(@Valid @RequestBody LoginRequestDto loginRequestDto) {
        return ResponseEntity.status(HttpStatus.OK).body(authService.login(loginRequestDto));
    }

    @PostMapping("/signup")
    public ResponseEntity<SignupResponseDto> signupPatient(@Valid @RequestBody LoginRequestDto signUpRequestDto) {
        return ResponseEntity.status(HttpStatus.OK).body(authService.signup(signUpRequestDto));
    }

//    @PostMapping("/signup/doctors")
//    public ResponseEntity<SignupResponseDto> signupDoctor(@Valid @RequestBody DoctorSignupRequestDto signUpRequestDto) {
//        return ResponseEntity.status(HttpStatus.OK).body(authService.signupDoctor(signUpRequestDto));
//    }
}
