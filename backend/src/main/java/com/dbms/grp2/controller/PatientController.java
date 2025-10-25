package com.dbms.grp2.controller;

import com.dbms.grp2.dto.PatientCreateDto;
import com.dbms.grp2.dto.PatientDto;
import com.dbms.grp2.dto.PatientUpdateDto;
import com.dbms.grp2.service.PatientService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/patients")
@CrossOrigin("*")
public class PatientController {

    private final PatientService patientService;

    @GetMapping
    public ResponseEntity<List<PatientDto>> findAll(){
        return ResponseEntity.status(HttpStatus.OK).body(patientService.getAllPatients());
    }

    @GetMapping("/{id}")
    public ResponseEntity<PatientDto> findPatientById(@PathVariable Long id){
        return ResponseEntity.status(HttpStatus.OK).body(patientService.getPatientById(id));
    }

    @PostMapping
    public ResponseEntity<PatientDto> createPatient(@RequestBody PatientCreateDto dto){
        return ResponseEntity.status(HttpStatus.CREATED).body(patientService.createPatient(dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePatientById(@PathVariable Long id){
        patientService.deletePatientById(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<PatientDto> updatePatientById(@PathVariable Long id, @RequestBody PatientUpdateDto dto){
        return ResponseEntity.status(HttpStatus.OK).body(patientService.updatePatientById(id, dto));
    }
}
