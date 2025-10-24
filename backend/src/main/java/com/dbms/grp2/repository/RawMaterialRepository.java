package com.dbms.grp2.repository;

import com.dbms.grp2.model.RawMaterial;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RawMaterialRepository extends JpaRepository<RawMaterial, Long> {
    List<RawMaterial> findByMaterialName(String materialName);
    @Query("SELECT um.material FROM UsesMaterial um WHERE um.implantId = :implantId")
    List<RawMaterial> findMaterialsByImplantId(@Param("implantId") Long implantId);
}