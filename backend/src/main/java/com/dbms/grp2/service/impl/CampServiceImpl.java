package com.dbms.grp2.service.impl;

import com.dbms.grp2.dto.CampDTO;
import com.dbms.grp2.dto.CampResponseDTO;
import com.dbms.grp2.model.Camp;
import com.dbms.grp2.model.Transaction;
import com.dbms.grp2.repository.CampRepository;
import com.dbms.grp2.repository.TransactionRepository;
import com.dbms.grp2.service.CampService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CampServiceImpl implements CampService {

    private final CampRepository campRepository;
    private final TransactionRepository transactionRepository;
    private final ModelMapper modelMapper;

    @Override
    public Camp addCamp(CampDTO campDTO) {
        Transaction transaction = transactionRepository.findById(campDTO.getTransactionId())
                .orElseThrow(() -> new EntityNotFoundException("Transaction not found with id: " + campDTO.getTransactionId()));

        Camp camp = modelMapper.map(campDTO, Camp.class);
        camp.setCampId(null);
        camp.setTransaction(transaction);
        return campRepository.save(camp);
    }
    @Override
    public Optional<CampResponseDTO> getCampById(Long id) {
        return campRepository.findById(id)
                .map(camp -> modelMapper.map(camp, CampResponseDTO.class));
    }
    @Override
    public Page<CampResponseDTO> getAllCamps(Pageable pageable) {
        Page<Camp> campPage = campRepository.findAll(pageable);
        return campPage.map(camp -> modelMapper.map(camp, CampResponseDTO.class));
    }
}