package com.dbms.grp2.dto;

import lombok.Getter;
import lombok.Setter;
import java.time.LocalDate;

@Getter
@Setter
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