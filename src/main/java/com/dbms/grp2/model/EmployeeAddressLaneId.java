package com.dbms.grp2.model;

import lombok.*;
import java.io.Serializable;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class EmployeeAddressLaneId implements Serializable {
    private String addressLane;
    private Long employeeId;
}
