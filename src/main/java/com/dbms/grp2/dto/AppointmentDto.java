package com.dbms.grp2.dto;

import com.dbms.grp2.model.AppointmentStatus;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Setter
public class AppointmentDto {
    private Long appointmentId;
    private LocalTime startTime;
    private LocalTime endTime;
    private LocalDate date;
    private BigDecimal amount;
    private String paymentMode;
    private AppointmentStatus status;
    private String report;
    private Long patientId;
    private Long employeeId;
}