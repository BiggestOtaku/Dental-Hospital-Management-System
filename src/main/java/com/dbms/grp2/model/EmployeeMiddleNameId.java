package com.dbms.grp2.model;

import lombok.*;

import java.io.Serializable;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class EmployeeMiddleNameId implements Serializable {
    private String middleName;
    private Long employeeId;
}
