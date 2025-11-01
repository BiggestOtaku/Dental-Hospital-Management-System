package com.dbms.grp2.service.impl;

import com.dbms.grp2.dto.CampDetailDto;
import com.dbms.grp2.dto.CampEmployeeAssociationDto;
import com.dbms.grp2.model.Camp;
import com.dbms.grp2.model.CampEmployee;
import com.dbms.grp2.model.Employee;
import com.dbms.grp2.repository.CampEmployeeRepository;
import com.dbms.grp2.repository.CampRepository;
import com.dbms.grp2.repository.EmployeeRepository;
import com.dbms.grp2.service.CampEmployeeService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CampEmployeeServiceImpl implements CampEmployeeService {

    private final CampRepository campRepository;
    private final EmployeeRepository employeeRepository;
    private final CampEmployeeRepository campEmployeeRepository;
    private final ModelMapper modelMapper;

    @Override
    public CampEmployeeAssociationDto addEmployeeToCamp(Long campId, String emailId) {
        Employee employee = employeeRepository.findByEmailId(emailId)
                .orElseThrow(() -> new EntityNotFoundException("Employee not found with email: " + emailId));

        if (!campRepository.existsById(campId)) {
            throw new EntityNotFoundException("Camp not found with ID: " + campId);
        }

        if (campEmployeeRepository.existsByCampIdAndEmployeeId(campId, employee.getEmployeeId())) {
            throw new IllegalStateException("Employee " + emailId + " is already assigned to camp " + campId);
        }

        CampEmployee newAssociation = new CampEmployee();
        newAssociation.setCampId(campId);
        newAssociation.setEmployeeId(employee.getEmployeeId());

        campEmployeeRepository.save(newAssociation);

        return new CampEmployeeAssociationDto(campId, employee.getEmployeeId());
    }

    /**
     * This implementation is now corrected.
     * It finds all associations and maps them to a list of employee emails.
     */
    @Override
    public List<String> getEmployeesForCamp(Long campId) {
        if (!campRepository.existsById(campId)) {
            throw new EntityNotFoundException("Camp not found with ID: " + campId);
        }

        List<CampEmployee> associations = campEmployeeRepository.findByCampId(campId);

        // Map the list of associations to a list of employee emails
        return associations.stream()
                .map(CampEmployee::getEmployee) // Get the associated Employee object
                .map(Employee::getEmailId)       // Get the email from that object
                .collect(Collectors.toList());
    }
    @Override
    public Page<CampDetailDto> getCampsForEmployee(Long employeeId, Pageable pageable) {
        Page<Camp> campPage = campRepository.findCampsByEmployeeId(employeeId, pageable);

        return campPage.map(camp -> modelMapper.map(camp, CampDetailDto.class));
    }
}