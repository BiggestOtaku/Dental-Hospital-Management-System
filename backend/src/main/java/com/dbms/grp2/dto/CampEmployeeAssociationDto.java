package com.dbms.grp2.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class CampEmployeeAssociationDto {
    private Long campId;
    private Long employeeId;
}