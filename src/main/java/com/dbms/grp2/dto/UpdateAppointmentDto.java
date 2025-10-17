package com.dbms.grp2.dto;

import com.dbms.grp2.model.AppointmentStatus;
import jakarta.validation.constraints.DecimalMin;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Setter
public class UpdateAppointmentDto {

    // All fields are optional.
    private LocalTime startTime;
    private LocalTime endTime;
    private LocalDate date;
    @DecimalMin(value = "0.0", inclusive = true, message = "Amount cannot be negative")
    private BigDecimal amount;
    private String paymentMode;
    private AppointmentStatus status;
    private String report;
}