package com.dbms.grp2.model;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
@IdClass(PatientMiddleNameId.class)
@Table(name = "patients_middle_name")
public class PatientMiddleName {

    @Id
    @Column(name = "middle_name", nullable = false)
    private String middleName;

    @Id
    @Column(name = "patient_id", nullable = false)
    private Long patientId;
}
