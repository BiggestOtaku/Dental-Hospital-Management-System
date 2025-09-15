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
@Table(name = "camp_attendees")
@IdClass(CampAttendeeId.class) // Specifies the composite key class
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class CampAttendee {

    @Id
    @Column(name = "camp_id", nullable = false)
    private Long campId;

    @Id
    @Column(name = "patient_id", nullable = false)
    private Long patientId;
}