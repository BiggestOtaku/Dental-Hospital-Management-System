package com.dbms.grp2.model;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class BuyingRawMaterialId implements Serializable {
    private Long materialId; // Assuming material ID is of type Long
    private Long transactionId;
}