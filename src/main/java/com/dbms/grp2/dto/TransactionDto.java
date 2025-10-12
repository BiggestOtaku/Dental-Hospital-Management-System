package com.dbms.grp2.dto;

import com.dbms.grp2.model.expenseArea;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import java.time.LocalDate;


@Data//for getters, setters and all
public class TransactionDto {

    @Min(value = 1, message = "Amount must be greater than 0")
    private int amount;

    @NotNull(message = "Transaction date cannot be null")
    private LocalDate transactionDate;

    @NotNull(message = "Expense area cannot be null")
    private expenseArea area;

    @NotBlank(message = "Description cannot be blank")
    private String description;
}