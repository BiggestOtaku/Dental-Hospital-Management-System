package com.dbms.grp2.dto;

import lombok.Data;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class CampResponseDTO {
    private Long campId;
    private LocalDate date;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private String city;
    private String state;
    private Long attendeeCount;
    private TransactionSummaryDTO transaction;
}