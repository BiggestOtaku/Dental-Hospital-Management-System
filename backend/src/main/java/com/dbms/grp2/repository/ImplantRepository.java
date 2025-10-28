package com.dbms.grp2.repository;

import com.dbms.grp2.model.Implant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ImplantRepository extends JpaRepository<Implant, Long> {
}