package com.dbms.grp2.service.impl;

import com.dbms.grp2.dto.CreateImplantBusinessDto;
import com.dbms.grp2.dto.ImplantBusinessDto;
import com.dbms.grp2.model.ImplantBusiness;
import com.dbms.grp2.repository.ImplantBusinessRepository;
import com.dbms.grp2.repository.ImplantRepository;
import com.dbms.grp2.repository.TransactionRepository;
import com.dbms.grp2.service.ImplantBusinessService;
import jakarta.persistence.EntityNotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class ImplantBusinessServiceImpl implements ImplantBusinessService {

    private final ImplantBusinessRepository implantBusinessRepository;
    private final ImplantRepository implantRepository;
    private final TransactionRepository transactionRepository; // Assuming you have this
    private final ModelMapper modelMapper;

    @Autowired
    public ImplantBusinessServiceImpl(ImplantBusinessRepository implantBusinessRepository,
                                      ImplantRepository implantRepository,
                                      TransactionRepository transactionRepository,
                                      ModelMapper modelMapper) {
        this.implantBusinessRepository = implantBusinessRepository;
        this.implantRepository = implantRepository;
        this.transactionRepository = transactionRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public ImplantBusinessDto addImplantBusiness(CreateImplantBusinessDto createDto) {
        if (!implantRepository.existsById(createDto.getImplantId())) {
            throw new EntityNotFoundException("Implant not found with ID: " + createDto.getImplantId());
        }
        if (!transactionRepository.existsById(createDto.getTransactionId())) {
            throw new EntityNotFoundException("Transaction not found with ID: " + createDto.getTransactionId());
        }
        ImplantBusiness implantBusiness = modelMapper.map(createDto, ImplantBusiness.class);
        ImplantBusiness savedRecord = implantBusinessRepository.save(implantBusiness);
        return modelMapper.map(savedRecord, ImplantBusinessDto.class);
    }
    @Override
    public Page<ImplantBusinessDto> getAllImplantBusinesses(Pageable pageable) {
        Page<ImplantBusiness> recordsPage = implantBusinessRepository.findAll(pageable);
        return recordsPage.map(record -> modelMapper.map(record, ImplantBusinessDto.class));
    }
}