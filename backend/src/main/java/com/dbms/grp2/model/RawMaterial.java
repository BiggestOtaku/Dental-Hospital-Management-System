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
    private Long materialId;

    @Column(name="material_name")
    private String materialName;

    @Column(name="maximum_quantity")
    private Long maximumQuantity;

    private Long available;

    @Column(name="unit_price")
    private Float unitPrice;

    @Column(name="supplier_fname")
    private String supplierFirstName;
    @Column(name="supplier_mname")
    private String supplierMiddleName;
    @Column(name="supplier_lname")
    private String supplierLastName;

    @Column(name="supplier_addressLane")
    private String supplierAddressLane;
    @Column(name="supplier_city")
    private String supplierCity;
    @Column(name="supplier_state")
    private String supplierState;

    @Column(name="supplier_pin_code")
    private Long supplierPinCode;
}
