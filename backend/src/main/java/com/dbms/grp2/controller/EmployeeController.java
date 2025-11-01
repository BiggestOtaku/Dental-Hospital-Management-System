package com.dbms.grp2.controller;

import com.dbms.grp2.dto.CampDetailDto;
import com.dbms.grp2.model.User;
import com.dbms.grp2.service.CampEmployeeService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/employees")
@RequiredArgsConstructor
public class EmployeeController {

    private final CampEmployeeService campEmployeeService;

    @GetMapping("/camps")
    public ResponseEntity<Page<CampDetailDto>> getMyAssignedCamps(
            @AuthenticationPrincipal User user,
            Pageable pageable) {
        Long employeeId = user.getId();
        Page<CampDetailDto> campPage = campEmployeeService.getCampsForEmployee(employeeId, pageable);
        return ResponseEntity.ok(campPage);
    }
}