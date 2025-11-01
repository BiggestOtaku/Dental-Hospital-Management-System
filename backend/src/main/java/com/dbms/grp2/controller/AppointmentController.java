package com.dbms.grp2.controller;

import com.dbms.grp2.dto.AppointmentDetailDto;
import com.dbms.grp2.dto.AppointmentRequestDto;
import com.dbms.grp2.model.AppointmentRequest;
import com.dbms.grp2.security.AuthUtil;
import com.dbms.grp2.service.AppointmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/appointments")
public class AppointmentController {
    private final AppointmentService appointmentService;
    private final AuthUtil authUtil;

    @GetMapping("/patient/{patientId}")
    public ResponseEntity<Page<AppointmentDetailDto>> getAppointmentsByPatientId(
            @PathVariable Long patientId,
            @PageableDefault(sort = "date", direction = Sort.Direction.DESC) Pageable pageable
    ) {
        if(!authUtil.getCurrentUserId().equals(patientId) &&
                !(authUtil.getCurrentUserRoles().contains("ROLE_ADMIN") || authUtil.getCurrentUserRoles().contains("ROLE_DOCTOR")))
            throw new AccessDeniedException("You are not allowed to view other patients' appointments.");

        return ResponseEntity.ok(appointmentService.getAppointmentsByPatientId(patientId, pageable));
    }

    @PostMapping("/request")
    public ResponseEntity<Void> requestAppointment(@RequestBody AppointmentRequestDto dto) {
        if(!authUtil.getCurrentUserId().equals(dto.getPatientId()) && !authUtil.getCurrentUserRoles().contains("ROLE_ADMIN"))
            throw new AccessDeniedException("You are not allowed to request other patient's appointments.");

        appointmentService.requestAppointment(dto);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/doctor/{doctorId}")
    public ResponseEntity<Page<AppointmentDetailDto>> getAppointmentsByDoctorId(
            @PathVariable Long doctorId,
            @RequestParam(required = false) String search,
            @PageableDefault(sort = "date", direction = Sort.Direction.DESC) Pageable pageable
    ) {
        if(!authUtil.getCurrentUserId().equals(doctorId) && !authUtil.getCurrentUserRoles().contains("ROLE_ADMIN"))
            throw new AccessDeniedException("You are not allowed to view other doctors' appointments.");

        return ResponseEntity.ok(appointmentService.getAppointmentsByDoctorId(doctorId, search, pageable));
    }
}
