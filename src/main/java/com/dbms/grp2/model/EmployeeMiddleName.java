package com.dbms.grp2.model;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
@IdClass(EmployeeMiddleNameId.class)
@Table(name = "employee_middle_name")
public class EmployeeMiddleName {

    @Id
    @Column(name = "middle_name", nullable = false)
    private String middleName;

    @Id
    @Column(name = "employee_id", nullable = false)
    private Long employeeId;
}
