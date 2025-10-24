package com.dbms.grp2.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Data
public class PatientUpdateDto {
    private String firstName;
    private String lastName;
    private String emailId;
    private String phoneNumber;
}
