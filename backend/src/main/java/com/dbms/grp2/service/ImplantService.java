package com.dbms.grp2.service;

import com.dbms.grp2.dto.CreateImplantDto;
import com.dbms.grp2.dto.ImplantDto;
import com.dbms.grp2.dto.UpdateImplantDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

public interface ImplantService {
    ImplantDto addImplant(CreateImplantDto createDto);
    Page<ImplantDto> getAllImplants(Pageable pageable);
    Optional<ImplantDto> getImplantById(Long implantId);
    Optional<ImplantDto> updateImplant(Long implantId, UpdateImplantDto updateDto);
}