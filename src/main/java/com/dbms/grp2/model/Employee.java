package com.dbms.grp2.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

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

    @Size(max = 50)
    @Column(name = "employee_type", length = 50)
    private String employeeType;

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

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "hr_type", nullable = false, foreignKey = @ForeignKey(name = "fk_employee_hr"))
    @OnDelete(action = OnDeleteAction.CASCADE)
    @ToString.Exclude
    private HumanResource humanResource;

    @Column(name = "joining_date")
    private LocalDate joiningDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "supervisor_id", foreignKey = @ForeignKey(name = "fk_employee_supervisor"))
    @OnDelete(action = OnDeleteAction.CASCADE)
    @ToString.Exclude
    private Employee supervisor;

    @Size(max = 10)
    @Column(name = "sex", length = 10)
    private String sex;
}
