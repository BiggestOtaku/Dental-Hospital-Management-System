package com.dbms.grp2.controller;

import com.dbms.grp2.service.AppointmentSchedulingService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;

@RestController
@RequestMapping("/admin/scheduling")
@RequiredArgsConstructor
public class AdminSchedulingController {

    private final AppointmentSchedulingService schedulingService;

    @PostMapping("/run")
    public ResponseEntity<String> triggerScheduling(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {

        try {
            schedulingService.scheduleAppointmentsForDate(date);
            return ResponseEntity.ok("Successfully triggered appointment scheduling for request date: " + date);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("An error occurred during scheduling for date " + date + ": " + e.getMessage());
        }
    }
}

