package com.dbms.grp2.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CreateImplantBusinessDto {

    @NotNull(message = "Implant ID is required")
    private Long implantId;

    @NotNull(message = "Transaction ID is required")
    private Long transactionId;

    @NotNull(message = "Quantity is required")
    @Min(value = 1, message = "Quantity must be at least 1")
    private Long quantity;

    @NotBlank(message = "Sold by field is required")
    private String soldBy;

    @NotBlank(message = "Brought by field is required")
    private String broughtBy;
}