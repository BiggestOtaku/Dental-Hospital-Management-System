package com.dbms.grp2.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="raw_material")
public class RawMaterial {

    @Id
    @Column(name="material_id")
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Integer materialId;

    @Column(name="material_name")
    private String materialName;

    @Column(name="maximum_quantity")
    private Integer maximumQuantity;

    private Integer available;

    @Column(name="unit_price")
    private Float unitPrice;

    @Column(name="supplier_name")
    private String supplierName;

    @Column(name="supplier_address")
    private String supplierAddress;

    @Column(name="supplier_pin_code")
    private Integer supplierPinCode;
}
