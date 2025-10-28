package com.dbms.grp2.dto;

import lombok.Data;

@Data
public class DoctorSignupRequestDto {
    private String emailId;
    private String password;
    private Long doctorId; // So that emailId and doctorId should match, only doctor is supposed to know his doctorId
}
