package com.dbms.grp2.controller;

import com.dbms.grp2.dto.CampDTO;
import com.dbms.grp2.dto.CampResponseDTO;
import com.dbms.grp2.model.Camp;
import com.dbms.grp2.service.CampService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
public class CampController {

    private final CampService campService;

    @PostMapping("/add-camp")
    public ResponseEntity<Camp> addCamp(@RequestBody CampDTO campDTO) {
        Camp newCamp = campService.addCamp(campDTO);
        return new ResponseEntity<>(newCamp, HttpStatus.CREATED);
    }
    @GetMapping("/camps/{id}")
    public ResponseEntity<CampResponseDTO> getCampById(@PathVariable Long id) {
        Optional<CampResponseDTO> optionalCamp = campService.getCampById(id);
        return optionalCamp
                .map(camp -> ResponseEntity.ok(camp))
                .orElse(ResponseEntity.notFound().build());
    }
    @GetMapping("/camps")
    public ResponseEntity<Page<CampResponseDTO>> getAllCamps(Pageable pageable) {
        Page<CampResponseDTO> camps = campService.getAllCamps(pageable);
        return ResponseEntity.ok(camps);
    }
}