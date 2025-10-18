package com.dbms.grp2.service.impl;

import com.dbms.grp2.dto.CreateImplantDto;
import com.dbms.grp2.dto.ImplantDto;
import com.dbms.grp2.dto.UpdateImplantDto;
import com.dbms.grp2.model.Implant;
import com.dbms.grp2.repository.ImplantRepository;
import com.dbms.grp2.service.ImplantService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ImplantServiceImpl implements ImplantService {

    private final ImplantRepository implantRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public ImplantServiceImpl(ImplantRepository implantRepository, ModelMapper modelMapper) {
        this.implantRepository = implantRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public ImplantDto addImplant(CreateImplantDto createDto) {
        Implant implant = modelMapper.map(createDto, Implant.class);
        Implant savedImplant = implantRepository.save(implant);
        return modelMapper.map(savedImplant, ImplantDto.class);
    }
    @Override
    public Page<ImplantDto> getAllImplants(Pageable pageable) {
        Page<Implant> implantsPage = implantRepository.findAll(pageable);
        return implantsPage.map(implant -> modelMapper.map(implant, ImplantDto.class));
    }
    @Override
    public Optional<ImplantDto> getImplantById(Long implantId) {
        return implantRepository.findById(implantId)
                .map(implant -> modelMapper.map(implant, ImplantDto.class));
    }
    @Override
    public Optional<ImplantDto> updateImplant(Long implantId, UpdateImplantDto updateDto) {
        Optional<Implant> implantOptional = implantRepository.findById(implantId);

        if (implantOptional.isEmpty()) {
            return Optional.empty();
        }
        Implant existingImplant = implantOptional.get();
        if (updateDto.getAvailable() != null) {
            existingImplant.setAvailable(updateDto.getAvailable());
        }
        if (updateDto.getPrice() != null) {
            existingImplant.setPrice(updateDto.getPrice());
        }
        if (updateDto.getSterilizationDate() != null) {
            existingImplant.setSterilizationDate(updateDto.getSterilizationDate());
        }
        Implant updatedImplant = implantRepository.save(existingImplant);
        return Optional.of(modelMapper.map(updatedImplant, ImplantDto.class));
    }
}