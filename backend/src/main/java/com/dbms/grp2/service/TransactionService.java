package com.dbms.grp2.service;

import com.dbms.grp2.dto.TransactionDto;
import com.dbms.grp2.model.Transaction;

import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface TransactionService {
     Transaction addTransaction(TransactionDto transactionDto);
     Optional<Transaction> getTransactionById(Long transactionId);
     Page<Transaction> getAllTransactions(Pageable pageable);
}