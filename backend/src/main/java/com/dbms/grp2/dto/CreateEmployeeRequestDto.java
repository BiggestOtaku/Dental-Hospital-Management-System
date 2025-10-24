package com.dbms.grp2.dto;

import jakarta.validation.constraints.*;
import lombok.*;
import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CreateEmployeeRequestDto {

    @Size(max = 50, message = "Employee type must be under 50 characters")
    private String employeeType;

    @NotBlank(message = "First name is required")
    @Size(max = 50, message = "First name must be under 50 characters")
    private String firstName;

    @Size(max = 50, message = "Middle name must be under 50 characters")
    private String middleName;

    @NotBlank(message = "Last name is required")
    @Size(max = 50, message = "Last name must be under 50 characters")
    private String lastName;

    @Size(max = 50)
    private String address_description;

    @Size(max = 100)
    private String city;

    @Size(max = 100)
    private String state;

    @Pattern(regexp = "\\d{6}", message = "Pincode must be exactly 6 digits")
    private String pincode;

    private LocalDate dob;

    @Pattern(regexp = "\\+?[1-9]\\d{1,14}", message = "Invalid phone number format")
    private String phoneNumbers;

    @Email(message = "Invalid email format")
    @NotBlank(message = "Email is required")
    @Size(max = 254)
    private String emailId;

    @NotNull(message = "Human Resource ID is required")
    private String hrType;

    private LocalDate joiningDate;

    private Long supervisorId;

    @Size(max = 10)
    private String sex;
}