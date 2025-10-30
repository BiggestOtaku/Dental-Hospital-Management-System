package com.dbms.grp2.service;

import com.dbms.grp2.dto.CreateImplantBusinessDto;
import com.dbms.grp2.dto.ImplantBusinessDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ImplantBusinessService {
    ImplantBusinessDto addImplantBusiness(CreateImplantBusinessDto createDto);
    Page<ImplantBusinessDto> getAllImplantBusinesses(Pageable pageable);
}