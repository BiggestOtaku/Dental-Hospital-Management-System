package com.dbms.grp2.repository;

import com.dbms.grp2.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.Repository;

import java.util.Optional;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    boolean existsByEmailId(String emailId);
    Optional<Employee> findByEmailId(String emailId);
}