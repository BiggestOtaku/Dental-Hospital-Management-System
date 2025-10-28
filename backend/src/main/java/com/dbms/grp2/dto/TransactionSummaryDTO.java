package com.dbms.grp2.dto;

import lombok.Data;
import java.time.LocalDate;

//for response in camp/{id}
@Data
public class TransactionSummaryDTO {
    private Long transactionId;
    private double amount;
    private LocalDate transactionDate;
    private String description;
}