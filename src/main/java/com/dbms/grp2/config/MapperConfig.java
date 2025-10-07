package com.dbms.grp2.config;

import com.dbms.grp2.dto.PatientCreateDto;
import com.dbms.grp2.model.Patient;
import com.dbms.grp2.service.PatientService;
import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MapperConfig {

    @Bean
    public ModelMapper modelMapper(){
        ModelMapper mapper = new ModelMapper();
        mapper.typeMap(PatientCreateDto.class, Patient.class)
                .addMappings(m -> m.skip(Patient::setPatientId));
        return mapper;
    }
}
