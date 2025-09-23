package com.dbms.grp2.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PatientCreateDto {
    @NotBlank
    private String firstName;
    private String lastName;

    @Email
    @NotBlank
    private String emailId;

    @NotBlank
    private String password;
}
