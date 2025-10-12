package com.dbms.grp2.service;

import com.dbms.grp2.dto.CreateRawMaterialDto;
import com.dbms.grp2.dto.RawMaterialDto;
import com.dbms.grp2.dto.UpdateRawMaterialAvailabilityDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface RawMaterialService {

    RawMaterialDto addRawMaterial(CreateRawMaterialDto createDto);
    Page<RawMaterialDto> getAllRawMaterials(Pageable pageable);
    List<RawMaterialDto> getRawMaterialsByName(String materialName);
    Optional<RawMaterialDto> updateRawMaterialAvailability(Long materialId, UpdateRawMaterialAvailabilityDto updateDto);
}