package com.dbms.grp2.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "camp_employees")
@IdClass(CampEmployeeId.class) // Specifies the composite key class
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class CampEmployee {

    @Id
    @Column(name = "camp_id")
    private Long campId;

    @Id
    @Column(name = "emp_id")
    private Long empId;
}