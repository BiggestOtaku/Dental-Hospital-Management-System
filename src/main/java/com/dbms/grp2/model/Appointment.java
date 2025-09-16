package com.dbms.grp2.model;


import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
@Table(name = "appointments")
public class Appointment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "appointment_id", nullable = false)
    private Long appointmentId;

    private LocalTime startTime;
    private LocalTime endTime;
    private LocalDate date;
    private Double amount;
    private String paymentMode;
    private String status;
    private String report;

    @Column(nullable = false)
    private Long patientId;

    @Column(nullable = false)
    private Long employeeId;
}
