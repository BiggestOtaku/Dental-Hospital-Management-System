package com.dbms.grp2.controller;

import com.dbms.grp2.dto.PublicDoctorDto;
import com.dbms.grp2.service.EmployeeService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/public")
public class PublicController {
    private final EmployeeService employeeService;

    @GetMapping("/doctors")
    public ResponseEntity<Page<PublicDoctorDto>> getDoctors(@PageableDefault(sort = "firstName", direction = Sort.Direction.DESC) Pageable pageable) {
        return ResponseEntity.ok(employeeService.getAllDoctors(pageable));
    }
}
