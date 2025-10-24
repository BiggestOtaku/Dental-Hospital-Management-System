package com.dbms.grp2.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Table(name = "appointment_requests")
public class AppointmentRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long requestId;

    @ManyToOne(optional = false)
    @JoinColumn(name = "patient_id", nullable = false)
    private Patient patient;

    @ManyToOne(optional = false)
    @JoinColumn(name = "employee_id", nullable = false)
    private Employee requestedDoctor;

    @Column(nullable = false)
    private LocalDate requestDate;

    @Column(nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();
    public AppointmentRequest() {
    }

    public AppointmentRequest(Patient patient, Employee requestedDoctor, LocalDate requestDate) {
        this.patient = patient;
        this.requestedDoctor = requestedDoctor;
        this.requestDate = requestDate;
    }
}