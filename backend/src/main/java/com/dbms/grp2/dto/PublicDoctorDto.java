package com.dbms.grp2.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PublicDoctorDto {
    private Long employeeId;
    private String firstName;
    private String lastName;
    private String emailId;
    private String specialty;
}
