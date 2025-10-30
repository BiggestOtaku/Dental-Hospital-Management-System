package com.dbms.grp2.controller;

import com.dbms.grp2.dto.CreateImplantBusinessDto;
import com.dbms.grp2.dto.ImplantBusinessDto;
import com.dbms.grp2.dto.ImplantDto;
import com.dbms.grp2.service.ImplantBusinessService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin")
public class AdminImplantBusinessController {

    private final ImplantBusinessService implantBusinessService;

    @Autowired
    public AdminImplantBusinessController(ImplantBusinessService implantBusinessService) {
        this.implantBusinessService = implantBusinessService;
    }

    @PostMapping("/add-implant-business")
    public ResponseEntity<ImplantBusinessDto> addImplantBusiness(@Valid @RequestBody CreateImplantBusinessDto createDto) {
        ImplantBusinessDto newRecord = implantBusinessService.addImplantBusiness(createDto);
        return new ResponseEntity<>(newRecord, HttpStatus.CREATED);
    }
    @GetMapping("/implant-business")
    public ResponseEntity<Page<ImplantBusinessDto>> getAllImplantBusinesses(Pageable pageable) {
        Page<ImplantBusinessDto> recordsPage = implantBusinessService.getAllImplantBusinesses(pageable);
        return ResponseEntity.ok(recordsPage);
    }

}