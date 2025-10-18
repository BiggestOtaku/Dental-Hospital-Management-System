package com.dbms.grp2.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RawMaterialDto {
    private Long materialId;
    private String materialName;
    private Long maximumQuantity;
    private Long available;
    private Float unitPrice;
    private String supplierFirstName;
    private String supplierMiddleName;
    private String supplierLastName;
    private String supplierAddressLane;
    private String supplierCity;
    private String supplierState;
    private Long supplierPinCode;
}