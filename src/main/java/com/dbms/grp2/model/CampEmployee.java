package com.dbms.grp2.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
@Table(name = "camp_employees")
@IdClass(CampEmployeeId.class)
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class CampEmployee {

    // ✅ PK fields as basic types
    @Id
    @Column(name = "camp_id", nullable = false)
    private Long campId;

    @Id
    @Column(name = "emp_id", nullable = false)
    private Long employeeId;

    // ✅ Many-to-One associations
    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "camp_id", insertable = false, updatable = false,
            foreignKey = @ForeignKey(name = "fk_campemployee_camp"))
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Camp camp;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "emp_id", insertable = false, updatable = false,
            foreignKey = @ForeignKey(name = "fk_campemployee_employee"))
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Employee employee;
}
