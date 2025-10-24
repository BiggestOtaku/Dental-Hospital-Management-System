package com.dbms.grp2.model;

import lombok.*;
import java.io.Serializable;
import java.util.Objects;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
public class PatientAddressLaneId implements Serializable {

    private String addressLane;  // must match entity PK field name
    private Long patientId;      // must match entity PK field name
}
