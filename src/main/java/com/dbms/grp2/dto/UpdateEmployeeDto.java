package com.dbms.grp2.dto;

import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateEmployeeDto {

    @Size(max = 50, message = "Employee type must be under 50 characters")
    private String employeeType;

    @Size(max = 50, message = "First name must be under 50 characters")
    private String firstName;

    @Size(max = 50, message = "Middle name must be under 50 characters")
    private String middleName;

    @Size(max = 50, message = "Last name must be under 50 characters")
    private String lastName;
}