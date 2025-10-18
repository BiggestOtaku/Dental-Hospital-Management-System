package com.dbms.grp2.mapper;

import com.dbms.grp2.dto.CreateEmployeeRequestDto;
import com.dbms.grp2.dto.EmployeeDto;
import com.dbms.grp2.dto.UpdateEmployeeDto;
import com.dbms.grp2.model.Employee;
import org.springframework.stereotype.Component;

@Component
public class EmployeeMapper {
    public Employee toEmployeeEntity(CreateEmployeeRequestDto dto) {
        if (dto == null) {
            return null;
        }

        Employee employee = new Employee();

        employee.setEmployeeType(dto.getEmployeeType());
        employee.setFirstName(dto.getFirstName());
        employee.setMiddleName(dto.getMiddleName());
        employee.setLastName(dto.getLastName());
        employee.setAddress_description(dto.getAddress_description());
        employee.setCity(dto.getCity());
        employee.setState(dto.getState());
        employee.setPincode(dto.getPincode());
        employee.setDob(dto.getDob());
        employee.setPhoneNumbers(dto.getPhoneNumbers());
        employee.setEmailId(dto.getEmailId());
        employee.setJoiningDate(dto.getJoiningDate());
        employee.setSex(dto.getSex());

        return employee;
    }
    public EmployeeDto toEmployeeDto(Employee employee) {
        if (employee == null) {
            return null;
        }

        EmployeeDto dto = new EmployeeDto();
        dto.setEmployeeId(employee.getEmployeeId());
        dto.setEmployeeType(employee.getEmployeeType());
        dto.setFirstName(employee.getFirstName());
        dto.setLastName(employee.getLastName());
        dto.setEmailId(employee.getEmailId());
        dto.setJoiningDate(employee.getJoiningDate());
        dto.setMiddleName(employee.getMiddleName());
        dto.setAddress_description(employee.getAddress_description());
        dto.setCity(employee.getCity());
        dto.setState(employee.getState());
        dto.setPincode(employee.getPincode());
        dto.setDob(employee.getDob());
        dto.setPhoneNumbers(employee.getPhoneNumbers());
        dto.setSex(employee.getSex());

        if (employee.getHumanResource() != null) {
            dto.setHrType(employee.getHumanResource().getHrType());
        }

        if (employee.getSupervisor() != null) {
            dto.setSupervisorId(employee.getSupervisor().getEmployeeId());
        }


        return dto;
    }
    public void updateEmployeeFromDto(UpdateEmployeeDto dto, Employee employee) {
        if (dto.getEmployeeType() != null) {
            employee.setEmployeeType(dto.getEmployeeType());
        }
        if (dto.getFirstName() != null) {
            employee.setFirstName(dto.getFirstName());
        }
        if (dto.getLastName() != null) {
            employee.setLastName(dto.getLastName());
        }
        if (dto.getMiddleName() != null) {
            employee.setMiddleName(dto.getMiddleName());
        }
    }
}