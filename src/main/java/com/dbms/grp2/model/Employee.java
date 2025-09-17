package com.dbms.grp2.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
@Table(name = "employees",
        indexes = {@Index(name = "idx_employee_email", columnList = "email_id")})
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "employee_id", nullable = false)
    private Long employeeId;

    @Enumerated(EnumType.STRING)
    @Column(name = "employee_type", length = 30)
    private EmployeeType employeeType;

    @Size(max = 50)
    @Column(name = "first_name", length = 50)
    private String firstName;

    @Size(max = 50)
    @Column(name = "middle_name", length = 50)
    private String middleName;

    @Size(max = 50)
    @Column(name = "last_name", length = 50)
    private String lastName;

    @Size(max = 100)
    @Column(name = "city", length = 100)
    private String city;

    @Size(max = 100)
    @Column(name = "state", length = 100)
    private String state;

    @Pattern(regexp = "\\d{6}")
    @Column(name = "pincode", length = 6)
    private String pincode;

    @Column(name = "dob")
    private LocalDate dob;

    @Pattern(regexp = "\\+?[1-9]\\d{1,14}")
    @Column(name = "phone_numbers", length = 15)
    private String phoneNumbers;

    @Email
    @Size(max = 254)
    @Column(name = "email_id", length = 254)
    private String emailId;

    @Enumerated(EnumType.STRING)
    @Column(name = "hr_type", length = 20)
    private HrType hrType;

    @Column(name = "joining_date")
    private LocalDate joiningDate;

    @Column(name = "supervisor_id")
    private Long supervisorId;

    @Enumerated(EnumType.STRING)
    @Column(name = "sex", length = 10)
    private Sex sex;
}
