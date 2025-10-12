package com.dbms.grp2.controller;

import com.dbms.grp2.dto.CreateRawMaterialDto;
import com.dbms.grp2.dto.RawMaterialDto;
import com.dbms.grp2.dto.UpdateRawMaterialAvailabilityDto;
import com.dbms.grp2.service.RawMaterialService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/admin")
public class AdminRawMaterialController {

    private final RawMaterialService rawMaterialService;

    @Autowired
    public AdminRawMaterialController(RawMaterialService rawMaterialService) {
        this.rawMaterialService = rawMaterialService;
    }
    @PostMapping("/add-raw-material")
    public ResponseEntity<RawMaterialDto> addRawMaterial(@RequestBody CreateRawMaterialDto createDto) {
        RawMaterialDto createdRawMaterial = rawMaterialService.addRawMaterial(createDto);
        return new ResponseEntity<>(createdRawMaterial, HttpStatus.CREATED);
    }
    @GetMapping("/raw-materials")
    public ResponseEntity<Page<RawMaterialDto>> getAllRawMaterials(Pageable pageable) {
        Page<RawMaterialDto> rawMaterials = rawMaterialService.getAllRawMaterials(pageable);
        return ResponseEntity.ok(rawMaterials);
    }
    @GetMapping("/get-raw-material/{name}")
    public ResponseEntity<List<RawMaterialDto>> getRawMaterialsByName(@PathVariable("name") String materialName) {
        List<RawMaterialDto> materials = rawMaterialService.getRawMaterialsByName(materialName);

        if (materials.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(materials);
    }
    @PatchMapping("/update-raw-material/{id}")
    public ResponseEntity<RawMaterialDto> updateAvailability(
            @PathVariable("id") Long materialId,
            @Valid @RequestBody UpdateRawMaterialAvailabilityDto updateDto) {

        Optional<RawMaterialDto> updatedMaterialOptional = rawMaterialService.updateRawMaterialAvailability(materialId, updateDto);

        return updatedMaterialOptional
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

}