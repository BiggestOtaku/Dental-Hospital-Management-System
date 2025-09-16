package com.dbms.grp2.model;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
@Table(name = "patients_address_lane")
public class PatientAddressLane {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "address_id", nullable = false)
    private Long addressId;

    private String addressLane;

    @Column(name = "patient_id", nullable = false)
    private Long patientId;
}
