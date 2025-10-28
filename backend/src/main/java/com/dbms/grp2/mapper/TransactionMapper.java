package com.dbms.grp2.mapper;

import com.dbms.grp2.dto.TransactionDto;
import com.dbms.grp2.model.Transaction;

public class TransactionMapper {

    public static Transaction toEntity(TransactionDto transactionDto) {
        if (transactionDto == null) {
            return null;
        }
        Transaction transaction = new Transaction();
        transaction.setAmount(transactionDto.getAmount());
        transaction.setTransactionDate(transactionDto.getTransactionDate());
        transaction.setArea(transactionDto.getArea());
        transaction.setDescription(transactionDto.getDescription());
        return transaction;
    }

    public static TransactionDto toDto(Transaction transaction) {
        if (transaction == null) {
            return null;
        }
        TransactionDto transactionDto = new TransactionDto();
        transactionDto.setAmount(transaction.getAmount());
        transactionDto.setTransactionDate(transaction.getTransactionDate());
        transactionDto.setArea(transaction.getArea());
        transactionDto.setDescription(transaction.getDescription());

        return transactionDto;
    }
}