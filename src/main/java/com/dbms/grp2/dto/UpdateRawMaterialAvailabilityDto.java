package com.dbms.grp2.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateRawMaterialAvailabilityDto {

    @NotNull(message = "Available quantity cannot be null")
    @Min(value = 0, message = "Available quantity cannot be negative")
    private Long available;
}