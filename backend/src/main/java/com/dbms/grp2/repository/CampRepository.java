package com.dbms.grp2.repository;

import com.dbms.grp2.model.Camp;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface CampRepository extends JpaRepository<Camp, Long> {
    @Query("SELECT c FROM Camp c WHERE c.campId IN (SELECT ce.campId FROM CampEmployee ce WHERE ce.employeeId = :employeeId)")
    Page<Camp> findCampsByEmployeeId(@Param("employeeId") Long employeeId, Pageable pageable);
}