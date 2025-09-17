package com.dbms.grp2.model;

import jakarta.persistence.Embeddable;
import lombok.*;

import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Embeddable
@EqualsAndHashCode   // Important for PKs
public class UsesID implements Serializable {
    private Integer appointmentId;
    private Integer implantId;
}
