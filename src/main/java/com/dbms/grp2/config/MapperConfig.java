package com.dbms.grp2.config;

import com.dbms.grp2.dto.AppointmentDto;
import com.dbms.grp2.dto.PatientCreateDto;
import com.dbms.grp2.model.Appointment;
import com.dbms.grp2.model.Patient;
import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MapperConfig {

    @Bean
    public ModelMapper modelMapper() {
        ModelMapper modelMapper = new ModelMapper();
        modelMapper.getConfiguration().setAmbiguityIgnored(true);
        modelMapper.createTypeMap(PatientCreateDto.class, Patient.class)
                .addMappings(mapper -> mapper.skip(Patient::setPatientId));



        return modelMapper;
    }
}