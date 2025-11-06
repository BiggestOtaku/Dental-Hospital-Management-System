package com.dbms.grp2.service;

import com.dbms.grp2.dto.CampAttendeeAssociationDto;

public interface CampAttendeeService {

    CampAttendeeAssociationDto addPatientToCamp(Long campId, String patientEmailId);
}