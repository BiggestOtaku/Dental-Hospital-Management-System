package com.dbms.grp2.service.impl;

import com.dbms.grp2.dto.CreateRawMaterialDto;
import com.dbms.grp2.dto.RawMaterialDto;
import com.dbms.grp2.dto.UpdateRawMaterialAvailabilityDto;
import com.dbms.grp2.model.RawMaterial;
import com.dbms.grp2.repository.RawMaterialRepository;
import com.dbms.grp2.service.RawMaterialService;
import jakarta.persistence.EntityNotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import com.dbms.grp2.repository.ImplantRepository;


@Service
public class RawMaterialServiceImpl implements RawMaterialService {

    private final RawMaterialRepository rawMaterialRepository;
    private final ModelMapper modelMapper;
    private final ImplantRepository implantRepository;

    @Autowired
    public RawMaterialServiceImpl(RawMaterialRepository rawMaterialRepository,ImplantRepository implantRepository, ModelMapper modelMapper) {
        this.rawMaterialRepository = rawMaterialRepository;
        this.modelMapper = modelMapper;
        this.implantRepository=implantRepository;
    }

    @Override
    public RawMaterialDto addRawMaterial(CreateRawMaterialDto createDto) {
        RawMaterial rawMaterial = modelMapper.map(createDto, RawMaterial.class);
        RawMaterial savedRawMaterial = rawMaterialRepository.save(rawMaterial);
        return modelMapper.map(savedRawMaterial, RawMaterialDto.class);
    }
    @Override
    public Page<RawMaterialDto> getAllRawMaterials(Pageable pageable) {
        Page<RawMaterial> rawMaterialsPage = rawMaterialRepository.findAll(pageable);
        return rawMaterialsPage.map(rawMaterial -> modelMapper.map(rawMaterial, RawMaterialDto.class));
    }
    @Override
    public List<RawMaterialDto> getRawMaterialsByName(String materialName) {
        List<RawMaterial> materials = rawMaterialRepository.findByMaterialName(materialName);
        return materials.stream()
                .map(material -> modelMapper.map(material, RawMaterialDto.class))
                .collect(Collectors.toList());
    }
    @Override
    public Optional<RawMaterialDto> updateRawMaterialAvailability(Long materialId, UpdateRawMaterialAvailabilityDto updateDto) {

        Optional<RawMaterial> rawMaterialOptional = rawMaterialRepository.findById(materialId);


        if (rawMaterialOptional.isEmpty()) {
            return Optional.empty();
        }

        RawMaterial existingMaterial = rawMaterialOptional.get();
        existingMaterial.setAvailable(updateDto.getAvailable());

        RawMaterial updatedMaterial = rawMaterialRepository.save(existingMaterial);
        return Optional.of(modelMapper.map(updatedMaterial, RawMaterialDto.class));
    }
    @Override
    public List<RawMaterialDto> getRawMaterialsForImplant(Long implantId) {
        if (!implantRepository.existsById(implantId)) {
            throw new EntityNotFoundException("Implant not found with ID: " + implantId);
        }

        List<RawMaterial> materials = rawMaterialRepository.findMaterialsByImplantId(implantId);

        return materials.stream()
                .map(material -> modelMapper.map(material, RawMaterialDto.class))
                .collect(Collectors.toList());
    }

}