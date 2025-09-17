package com.dbms.grp2.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
@IdClass(EmployeeAddressLaneId.class)
@Table(name = "employee_address_lane")
public class EmployeeAddressLane {

    @Id
    @Size(max = 255)
    @Column(name = "address_lane", nullable = false, length = 255)
    private String addressLane;

    @Id
    @Column(name = "employee_id", nullable = false)
    private Long employeeId;
}
