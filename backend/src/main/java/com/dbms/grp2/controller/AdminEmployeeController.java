package com.dbms.grp2.controller;

import com.dbms.grp2.dto.CreateEmployeeRequestDto;
import com.dbms.grp2.dto.EmployeeDto;
import com.dbms.grp2.dto.UpdateEmployeeDto;
import com.dbms.grp2.model.Employee;
import com.dbms.grp2.service.EmployeeService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
public class AdminEmployeeController {

    private final EmployeeService employeeService;

    @PostMapping("/add-employee")
    public ResponseEntity<Employee> addEmployee(@Valid @RequestBody CreateEmployeeRequestDto employeeDto) {
        Employee newEmployee = employeeService.addEmployee(employeeDto);
        return new ResponseEntity<>(newEmployee, HttpStatus.CREATED);
    }
    @DeleteMapping("/remove-employee/{id}")
    public ResponseEntity<Void> removeEmployee(@PathVariable Long id) {
        employeeService.removeEmployee(id);
        return ResponseEntity.noContent().build();
    }
    @GetMapping("/employees")
    public ResponseEntity<Page<EmployeeDto>> getAllEmployees(Pageable pageable) {
        Page<EmployeeDto> employeeDtoPage = employeeService.getAllEmployees(pageable);
        return ResponseEntity.ok(employeeDtoPage);
    }
    @PutMapping("/update-employee/{id}")
    public ResponseEntity<EmployeeDto> updateEmployee(
            @PathVariable Long id,
            @Valid @RequestBody UpdateEmployeeDto employeeDto) {

        EmployeeDto updatedEmployee = employeeService.updateEmployee(id, employeeDto);
        return ResponseEntity.ok(updatedEmployee);
    }
    @GetMapping("/get-employee/{emailId}")
    public ResponseEntity<EmployeeDto> getEmployeeByEmail(@PathVariable String emailId) {
        EmployeeDto employeeDto = employeeService.getEmployeeByEmail(emailId);
        return ResponseEntity.ok(employeeDto);
    }

}