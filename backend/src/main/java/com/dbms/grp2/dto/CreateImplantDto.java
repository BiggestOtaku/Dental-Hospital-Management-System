package com.dbms.grp2.dto;

import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.Min;
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
    @Min(value = 0, message = "Available quantity cannot be negative")
    private Long available;

    @Min(value = 0, message = "Price cannot be negative")
    private Float price;
    private String type;
    private String size;
    private Long expiryPeriod;

    @FutureOrPresent(message = "Sterilization date must be in the present or future")
    private LocalDate sterilizationDate;
}