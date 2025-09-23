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
@IdClass(PatientAddressLaneId.class)
@Table(name = "patients_address_lane")
public class PatientAddressLane {

    // ✅ PK fields as basic types
    @Id
    @Size(max = 255)
    @Column(name = "address_lane", nullable = false, length = 255)
    private String addressLane;

    @Id
    @Column(name = "patient_id", nullable = false)
    private Long patientId;

    // ✅ Many-to-One association
    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "patient_id", insertable = false, updatable = false,
            foreignKey = @ForeignKey(name = "fk_address_patient"))
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Patient patient;
}
