package com.dbms.grp2.model;

import lombok.*;
import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
@ToString
public class UsesMaterialID implements Serializable {

    private Long implantId;   // must match entity PK field name
    private Long materialId;  // must match entity PK field name
}
