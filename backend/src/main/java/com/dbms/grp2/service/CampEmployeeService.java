package com.dbms.grp2.service;

import com.dbms.grp2.dto.CampDetailDto;
import com.dbms.grp2.dto.CampEmployeeAssociationDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface CampEmployeeService {

    /**
     * Adds an employee to a camp.
     */
    CampEmployeeAssociationDto addEmployeeToCamp(Long campId, String emailId);

    /**
     * Gets all employee emails associated with a specific camp.
     * @param campId The ID of the camp.
     * @return A list of employee email addresses.
     */
    List<String> getEmployeesForCamp(Long campId);
    Page<CampDetailDto> getCampsForEmployee(Long employeeId, Pageable pageable);
}