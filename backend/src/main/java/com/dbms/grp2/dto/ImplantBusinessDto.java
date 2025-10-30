package com.dbms.grp2.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ImplantBusinessDto {
    @NotNull(message = "implant id is required")
    private Long implantId;
    @NotNull(message = "transaction id is required")
    private Long transactionId;
    @Min(value=1,message="quantity must me atleast one.")
    private Long quantity;
    @NotNull(message = "seller should be mentioned")
    private String soldBy;
    @NotNull(message = "buyer must be mentioned")
    private String broughtBy;
}