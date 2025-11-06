package com.dbms.grp2.repository;

import com.dbms.grp2.model.CampAttendee;
import com.dbms.grp2.model.CampAttendeeId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CampAttendeeRepository extends JpaRepository<CampAttendee, CampAttendeeId> {

    boolean existsByCampIdAndPatientId(Long campId, Long patientId);
}