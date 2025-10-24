package com.dbms.grp2.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
@Table(name = "camp_attendees")
@IdClass(CampAttendeeId.class)
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class CampAttendee {

    // ✅ PK fields as basic types
    @Id
    @Column(name = "camp_id", nullable = false)
    private Long campId;

    @Id
    @Column(name = "patient_id", nullable = false)
    private Long patientId;

    // ✅ Many-to-One associations
    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "camp_id", insertable = false, updatable = false,
            foreignKey = @ForeignKey(name = "fk_campattendee_camp"))
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Camp camp;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "patient_id", insertable = false, updatable = false,
            foreignKey = @ForeignKey(name = "fk_campattendee_patient"))
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Patient patient;
}
