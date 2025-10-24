package com.dbms.grp2.model;

import lombok.*;

import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class BuyingRawMaterialId implements Serializable {

    private Long materialId;     // must match entity field name
    private Long transactionId;  // must match entity field name
}
