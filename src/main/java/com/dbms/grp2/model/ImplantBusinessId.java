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
public class ImplantBusinessId implements Serializable {
    private Long implantId; // Assuming implant ID is of type Long
    private Long transactionId;
}