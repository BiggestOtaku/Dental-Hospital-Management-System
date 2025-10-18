package com.dbms.grp2.controller;

import com.dbms.grp2.dto.CreateImplantDto;
import com.dbms.grp2.dto.ImplantDto;
import com.dbms.grp2.dto.UpdateImplantDto;
import com.dbms.grp2.service.ImplantService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin")
public class AdminImplantController {

    private final ImplantService implantService;

    @Autowired
    public AdminImplantController(ImplantService implantService) {
        this.implantService = implantService;
    }

    @PostMapping("/add-implant")
    public ResponseEntity<ImplantDto> addImplant(@Valid @RequestBody CreateImplantDto createDto) {
        ImplantDto newImplant = implantService.addImplant(createDto);
        return new ResponseEntity<>(newImplant, HttpStatus.CREATED);
    }
    @GetMapping("/implants")
    public ResponseEntity<Page<ImplantDto>> getAllImplants(Pageable pageable) {
        Page<ImplantDto> implants = implantService.getAllImplants(pageable);
        return ResponseEntity.ok(implants);
    }
    @GetMapping("/get-implant/{id}")
    public ResponseEntity<ImplantDto> getImplantById(@PathVariable("id") Long implantId) {
        return implantService.getImplantById(implantId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    @PatchMapping("/update-implant/{id}")
    public ResponseEntity<ImplantDto> updateImplant(
            @PathVariable("id") Long implantId,
            @Valid @RequestBody UpdateImplantDto updateDto) {

        return implantService.updateImplant(implantId, updateDto)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}