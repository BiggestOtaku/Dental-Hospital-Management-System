package com.dbms.grp2.model;

import lombok.*;
import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
@ToString
public class UsesID implements Serializable {

    private Long appointmentId;  // must match entity PK field name
    private Long implantId;      // must match entity PK field name
}
