package com.dbms.grp2.model;

import lombok.*;

import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class CampEmployeeId implements Serializable {

    private Long campId;      // Must match entity PK field name
    private Long employeeId;  // Must match entity PK field name
}
