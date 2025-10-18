package com.dbms.grp2.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CreateImplantDto {

    private Long maximumQuantity;
    private Long available;
    private Float price;
    private String type;
    private String size;
    private Long expiryPeriod;
    private LocalDate sterilizationDate;
}