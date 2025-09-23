package com.dbms.grp2.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
@IdClass(EmployeeAddressLaneId.class)
@Table(name = "employee_address_lane")
public class EmployeeAddressLane {

    // ✅ PK fields as basic types
    @Id
    @Size(max = 255)
    @Column(name = "address_lane", nullable = false, length = 255)
    private String addressLane;

    @Id
    @Column(name = "employee_id", nullable = false)
    private Long employeeId;

    // ✅ Many-to-One association
    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "employee_id", insertable = false, updatable = false,
            foreignKey = @ForeignKey(name = "fk_address_employee"))
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Employee employee;
}
