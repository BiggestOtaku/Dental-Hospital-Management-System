package com.dbms.grp2.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class CampAttendeeAssociationDto {
    private Long campId;
    private Long patientId;
}