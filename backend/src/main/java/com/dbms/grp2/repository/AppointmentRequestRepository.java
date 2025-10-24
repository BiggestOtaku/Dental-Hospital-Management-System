package com.dbms.grp2.repository;

import com.dbms.grp2.model.AppointmentRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;
import java.util.List;


//implementation jpa khud kr lega
@Repository
public interface AppointmentRequestRepository extends JpaRepository<AppointmentRequest, Long> {

    List<AppointmentRequest> findByRequestDateOrderByCreatedAtAsc(LocalDate date);

    void deleteByRequestDateBefore(LocalDate date);
}