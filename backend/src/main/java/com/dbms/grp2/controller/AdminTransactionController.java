package com.dbms.grp2.controller;

import com.dbms.grp2.dto.TransactionDto;
import com.dbms.grp2.model.Transaction;
import com.dbms.grp2.service.TransactionService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import java.util.Optional;
@RestController
@RequestMapping("/admin")
public class AdminTransactionController {

    private final TransactionService transactionService;

    @Autowired
    public AdminTransactionController(TransactionService transactionService) {
        this.transactionService = transactionService;
    }

    @PostMapping("/add-transaction")
    public ResponseEntity<Transaction> addTransaction(@Valid @RequestBody TransactionDto transactionDto) {
        Transaction newTransaction = transactionService.addTransaction(transactionDto);
        return new ResponseEntity<>(newTransaction, HttpStatus.CREATED);
    }
    @GetMapping("/transactions/{id}")
    public ResponseEntity<Transaction> getTransactionById(@PathVariable Long id) {
        Optional<Transaction> optionalTransaction = transactionService.getTransactionById(id);

        return optionalTransaction
                .map(transaction -> ResponseEntity.ok(transaction))
                .orElse(ResponseEntity.notFound().build());
    }
    @GetMapping("/transactions")
    public ResponseEntity<Page<Transaction>> getAllTransactions(Pageable pageable) {
        Page<Transaction> transactions = transactionService.getAllTransactions(pageable);
        return ResponseEntity.ok(transactions);
    }
}