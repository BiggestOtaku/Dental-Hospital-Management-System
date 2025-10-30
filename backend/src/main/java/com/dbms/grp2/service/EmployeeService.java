package com.dbms.grp2.service;

import com.dbms.grp2.dto.CreateEmployeeRequestDto;
import com.dbms.grp2.dto.EmployeeDto;
import com.dbms.grp2.dto.PublicDoctorDto;
import com.dbms.grp2.dto.UpdateEmployeeDto;
import com.dbms.grp2.model.Employee;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface EmployeeService {

    EmployeeDto addEmployee(CreateEmployeeRequestDto employeeDto);
    void removeEmployee(Long employeeId);
    Page<EmployeeDto> getAllEmployees(Pageable pageable);
    public EmployeeDto updateEmployee(Long employeeId, UpdateEmployeeDto employeeDto);
    EmployeeDto getEmployeeByEmail(String emailId);
    Page<PublicDoctorDto> getAllDoctors(Pageable pageable);
}