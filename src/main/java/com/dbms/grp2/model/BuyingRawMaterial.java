package com.dbms.grp2.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "buying_raw_materials")
@IdClass(BuyingRawMaterialId.class) // Specifies the composite key class
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class BuyingRawMaterial {

    @Id
    @Column(name = "material_id")
    private Long materialId;

    @Id
    @Column(name = "transaction_id")
    private Long transactionId;
}