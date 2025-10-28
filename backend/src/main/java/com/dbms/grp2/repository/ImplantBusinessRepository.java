package com.dbms.grp2.repository;

import com.dbms.grp2.model.ImplantBusiness;
import com.dbms.grp2.model.ImplantBusinessId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ImplantBusinessRepository extends JpaRepository<ImplantBusiness, ImplantBusinessId> {
}