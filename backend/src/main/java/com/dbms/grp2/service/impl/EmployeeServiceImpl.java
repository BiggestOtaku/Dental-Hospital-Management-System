package com.dbms.grp2.service.impl;

import com.dbms.grp2.dto.CreateEmployeeRequestDto;
import com.dbms.grp2.dto.EmployeeDto;
import com.dbms.grp2.dto.PublicDoctorDto;
import com.dbms.grp2.dto.UpdateEmployeeDto;
import com.dbms.grp2.mapper.EmployeeMapper;
import com.dbms.grp2.model.Employee;
import com.dbms.grp2.model.HumanResource;
import com.dbms.grp2.model.Role;
import com.dbms.grp2.model.User;
import com.dbms.grp2.repository.EmployeeRepository;
import com.dbms.grp2.repository.HumanResourceRepository;
import com.dbms.grp2.repository.UserRepository;
import com.dbms.grp2.service.EmployeeService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
@RequiredArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {

    private final EmployeeRepository employeeRepository;
    private final UserRepository userRepository;
    private final HumanResourceRepository humanResourceRepository;
    private final EmployeeMapper employeeMapper;
    private final ModelMapper modelMapper;

    @Override
    @Transactional
    public EmployeeDto addEmployee(CreateEmployeeRequestDto employeeDto) {
        User user = userRepository.findByUsername(employeeDto.getEmailId()).orElseThrow();

        if (employeeRepository.existsByEmailId(employeeDto.getEmailId())) {
            throw new IllegalArgumentException("Email ID '" + employeeDto.getEmailId() + "' already exists.");
        }

        Employee employee = employeeMapper.toEmployeeEntity(employeeDto);

        HumanResource hr = humanResourceRepository.findById(employeeDto.getHrType())
                .orElseThrow(() -> new EntityNotFoundException("HumanResource not found with type: " + employeeDto.getHrType()));
        employee.setHumanResource(hr);
        if (employeeDto.getSupervisorId() != null) {
            Employee supervisor = employeeRepository.findById(employeeDto.getSupervisorId())
                    .orElseThrow(() -> new EntityNotFoundException("Supervisor not found with ID: " + employeeDto.getSupervisorId()));
            employee.setSupervisor(supervisor);
        }

        if(Objects.equals(employeeDto.getHrType(), "Doctor"))
            user.getRoles().add(Role.DOCTOR);

        employee.setUser(user);
        return employeeMapper.toEmployeeDto(employeeRepository.save(employee));
    }

    @Override
    @Transactional
    public void removeEmployee(Long employeeId) {
        if (!employeeRepository.existsById(employeeId)) {
            throw new EntityNotFoundException("Employee not found with ID: " + employeeId);
        }
        employeeRepository.deleteById(employeeId);
    }
    @Override
    public Page<EmployeeDto> getAllEmployees(Pageable pageable) {
        Page<Employee> employeePage = employeeRepository.findAll(pageable);
        return employeePage.map(employeeMapper::toEmployeeDto);
    }
    @Override
    @Transactional
    public EmployeeDto updateEmployee(Long employeeId, UpdateEmployeeDto employeeDto) {

        Employee existingEmployee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new EntityNotFoundException("Employee not found with ID: " + employeeId));

        employeeMapper.updateEmployeeFromDto(employeeDto, existingEmployee);
        Employee savedEmployee = employeeRepository.save(existingEmployee);
        return employeeMapper.toEmployeeDto(savedEmployee);
    }
    @Override
    public EmployeeDto getEmployeeByEmail(String emailId) {

        Employee employee = employeeRepository.findByEmailId(emailId)
                .orElseThrow(() -> new EntityNotFoundException("Employee not found with email: " + emailId));

        return employeeMapper.toEmployeeDto(employee);
    }

    @Override
    public Page<PublicDoctorDto> getAllDoctors(Pageable pageable) {
        Page<Employee> employeePage = employeeRepository.findAll(pageable);
        return employeePage.map(employee -> {
            if(Objects.equals(employee.getHumanResource().getHrType(), "Doctor"))
                return modelMapper.map(employee, PublicDoctorDto.class);
            return null;
        });
    }

}