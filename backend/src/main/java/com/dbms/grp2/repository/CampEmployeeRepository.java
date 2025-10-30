package com.dbms.grp2.repository;

import com.dbms.grp2.model.CampEmployee;
import com.dbms.grp2.model.CampEmployeeId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CampEmployeeRepository extends JpaRepository<CampEmployee, CampEmployeeId> {

    List<CampEmployee> findByCampId(Long campId);

    boolean existsByCampIdAndEmployeeId(Long campId, Long employeeId);
}