package com.dbms.grp2.controller;

import com.dbms.grp2.dto.*;
import com.dbms.grp2.security.AuthService;
import com.dbms.grp2.service.CampService;
import com.dbms.grp2.service.PatientService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/patients")
public class PatientController {

    private final PatientService patientService;
    private final AuthService authService;
    private final CampService campService;

    @GetMapping
    public ResponseEntity<List<PatientDto>> findAll(){
        return ResponseEntity.status(HttpStatus.OK).body(patientService.getAllPatients());
    }

    @GetMapping("/{id}")
    public ResponseEntity<PatientDto> findPatientById(@PathVariable Long id){
        return ResponseEntity.status(HttpStatus.OK).body(patientService.getPatientById(id));
    }
    @GetMapping("/camps")
    public ResponseEntity<Page<CampResponseDTO>> getAllCamps(Pageable pageable) {
        Page<CampResponseDTO> camps = campService.getAllCamps(pageable);
        return ResponseEntity.ok(camps);
    }

    @PostMapping
    public ResponseEntity<PatientDto> createPatient(@RequestBody PatientCreateDto dto){
        return ResponseEntity.status(HttpStatus.CREATED).body(patientService.createPatient(dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePatientById(@PathVariable Long id){
        authService.deleteUserById(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<PatientDto> updatePatientById(@PathVariable Long id, @RequestBody PatientUpdateDto dto){
        return ResponseEntity.status(HttpStatus.OK).body(patientService.updatePatientById(id, dto));
    }

    @PostMapping("/change-password/{id}")
    public ResponseEntity<Void> changePasswordById(@PathVariable Long id, @RequestBody ChangePasswordDto dto){
        authService.changePasswordById(id, dto);
        return ResponseEntity.status(HttpStatus.OK).build();
    }
}
