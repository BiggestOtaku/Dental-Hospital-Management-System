package com.dbms.grp2.dto;

import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EmployeeDto {
    private Long employeeId;
    private String employeeType;
    private String firstName;
    private String lastName;
    private String emailId;
    private LocalDate joiningDate;
    private String hrType;
    private Long supervisorId;
    private String middleName;
    private String address_description;
    private String city;
    private String state;
    private String pincode;
    private LocalDate dob;
    private String phoneNumbers;
    private String sex;
}