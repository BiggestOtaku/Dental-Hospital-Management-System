package com.dbms.grp2.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
@Table(name = "employees")
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "employee_id", nullable = false)
    private Long employeeId;

    private String employeeType;
    private String firstName;
    private String lastName;
    private String city;
    private String state;
    private String pincode;
    private String phoneNumbers;
    private String emailId;
    private String hrType;
    private LocalDate joiningDate;
    private Long supervisorId;
}
