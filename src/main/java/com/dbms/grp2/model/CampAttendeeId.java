package com.dbms.grp2.model;

import lombok.*;

import java.io.Serializable;
import java.util.Objects;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class CampAttendeeId implements Serializable {

    private Long campId;      // Must match entity PK field name
    private Long patientId;   // Must match entity PK field name
}
