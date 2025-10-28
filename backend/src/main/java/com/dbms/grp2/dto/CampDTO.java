package com.dbms.grp2.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class CampDTO {

    private LocalDate date;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private int attendeeCount;
    private String addressDescription;
    private String city;
    private String state;
    private int pin;
    @NotNull(message = "Transaction ID cannot be null")
    private Long transactionId;
}