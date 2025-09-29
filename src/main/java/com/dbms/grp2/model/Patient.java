package com.dbms.grp2.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import java.time.LocalDate;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.Accessors;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Table(name = "patients",
        indexes = {@Index(name = "idx_patient_email", columnList = "email_id")})
public class Patient {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "patient_id", nullable = false)
    private Long patientId;

    @Column(name = "password", nullable = false)
    private String password;
    @Size(max = 50)
    @Column(name = "first_name", length = 50)
    private String firstName;

    @Size(max = 50)
    @Column(name = "middle_name", length = 50)
    private String middleName;

    @Size(max = 50)
    @Column(name = "last_name", length = 50)
    private String lastName;

    @Column(name = "pincode")
    private Long pincode;

    @Size(max = 100)
    @Column(name = "state", length = 100)
    private String state;

    @Size(max = 100)
    @Column(name = "city", length = 100)
    private String city;

    @Pattern(regexp = "\\+?[1-9]\\d{1,14}")
    @Column(name = "phone_number", length = 15)
    private String phoneNumber;

    @Email
    @Size(max = 254)
    @Column(name = "email_id", length = 254)
    private String emailId;

    @Column(name = "dob")
    private LocalDate dob;

    @Size(max = 10)
    @Column(name = "sex", length = 10)
    private String sex;
}
