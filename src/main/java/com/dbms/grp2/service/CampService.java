package com.dbms.grp2.service;

import com.dbms.grp2.dto.CampDTO;
import com.dbms.grp2.dto.CampResponseDTO;
import com.dbms.grp2.model.Camp;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

public interface CampService {

    Camp addCamp(CampDTO campDTO);
    Optional<CampResponseDTO> getCampById(Long id);
    Page<CampResponseDTO> getAllCamps(Pageable pageable);
}