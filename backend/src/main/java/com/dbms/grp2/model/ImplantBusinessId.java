package com.dbms.grp2.model;

import lombok.*;

import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class ImplantBusinessId implements Serializable {

    private Long implantId;      // must match entity PK field name
    private Long transactionId;  // must match entity PK field name
}
