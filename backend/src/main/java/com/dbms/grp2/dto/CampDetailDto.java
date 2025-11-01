package com.dbms.grp2.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CampDetailDto {
    private Long campId;
    private LocalDate date;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private String addressDescription;
    private String city;
    private String state;
    private int pin;
}