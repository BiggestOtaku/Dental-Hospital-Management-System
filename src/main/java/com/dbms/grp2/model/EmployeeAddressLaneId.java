package com.dbms.grp2.model;

import lombok.*;
import java.io.Serializable;
import java.util.Objects;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
public class EmployeeAddressLaneId implements Serializable {

    private String addressLane;   // must match entity PK field name
    private Long employeeId;      // must match entity PK field name
}
