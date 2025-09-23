package com.dbms.grp2.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
@Table(name = "uses")
@IdClass(UsesID.class)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Uses {

    // ✅ PK fields as basic types
    @Id
    @Column(name = "appointment_id", nullable = false)
    private Long appointmentId;

    @Id
    @Column(name = "implant_id", nullable = false)
    private Long implantId;

    // ✅ Many-to-One associations
    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "appointment_id", insertable = false, updatable = false,
            foreignKey = @ForeignKey(name = "fk_uses_appointment"))
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Appointment appointment;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "implant_id", insertable = false, updatable = false,
            foreignKey = @ForeignKey(name = "fk_uses_implant"))
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Implant implant;

    private Integer quantity;
}
