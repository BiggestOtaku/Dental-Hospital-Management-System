package com.dbms.grp2.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ImplantBusinessDto {

    private Long implantId;
    private Long transactionId;
    private Long quantity;
    private String soldBy;
    private String broughtBy;
}