package com.dbms.grp2.repository;

import com.dbms.grp2.model.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    //  save(), findById(), findAll() are there

}
