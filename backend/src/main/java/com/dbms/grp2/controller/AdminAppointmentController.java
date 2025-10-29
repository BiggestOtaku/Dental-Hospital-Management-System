package com.dbms.grp2.controller;

import com.dbms.grp2.dto.AppointmentDetailDto;
import com.dbms.grp2.dto.AppointmentDto;
import com.dbms.grp2.dto.UpdateAppointmentDto;
import com.dbms.grp2.service.AppointmentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/admin")
public class AdminAppointmentController {

    private final AppointmentService appointmentService;

    @GetMapping("/appointments")
    public ResponseEntity<Page<AppointmentDto>> getAllAppointments(
            @PageableDefault(sort = "date", direction = Sort.Direction.DESC) Pageable pageable) {

        Page<AppointmentDto> appointments = appointmentService.getAllAppointments(pageable);
        return ResponseEntity.ok(appointments);
    }

    @PatchMapping("/update-appointment/{id}")
    public ResponseEntity<AppointmentDto> updateAppointment(
            @PathVariable("id") Long appointmentId,
            @Valid @RequestBody UpdateAppointmentDto updateDto) {

        return appointmentService.updateAppointment(appointmentId, updateDto)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    @GetMapping("/get-appointment/{id}")
    public ResponseEntity<AppointmentDetailDto> getAppointmentById(@PathVariable("id") Long appointmentId) {
        return appointmentService.getAppointmentById(appointmentId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

}