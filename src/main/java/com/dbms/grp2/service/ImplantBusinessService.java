package com.dbms.grp2.service;

import com.dbms.grp2.dto.CreateImplantBusinessDto;
import com.dbms.grp2.dto.ImplantBusinessDto;

public interface ImplantBusinessService {
    ImplantBusinessDto addImplantBusiness(CreateImplantBusinessDto createDto);
}