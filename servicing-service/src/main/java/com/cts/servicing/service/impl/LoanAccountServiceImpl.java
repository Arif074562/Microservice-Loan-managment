package com.cts.servicing.service.impl;

import com.cts.servicing.dto.LoanAccountRequestDTO;
import com.cts.servicing.dto.LoanAccountResponseDTO;
import com.cts.servicing.entity.LoanAccount;
import com.cts.servicing.enums.LoanAccountStatus;
import com.cts.servicing.exception.ResourceNotFoundException;
import com.cts.servicing.mapper.LoanAccountMapper;
import com.cts.servicing.repository.LoanAccountRepository;
import com.cts.servicing.service.LoanAccountService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class LoanAccountServiceImpl implements LoanAccountService {

    private final LoanAccountRepository loanAccountRepository;
    private final LoanAccountMapper loanAccountMapper;

    @Override
    public LoanAccountResponseDTO create(LoanAccountRequestDTO request) {
        log.info("Creating loan account for application: {}", request.getApplicationId());
        LoanAccount entity = loanAccountMapper.toEntity(request);
        if (entity.getStartDate() == null) entity.setStartDate(LocalDate.now());
        entity.setStatus(LoanAccountStatus.ACTIVE);
        entity = loanAccountRepository.save(entity);
        log.info("Loan account created: {}", entity.getLoanAccountId());
        return loanAccountMapper.toResponseDTO(entity);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<LoanAccountResponseDTO> findAll(Pageable pageable) {
        return loanAccountRepository.findAll(pageable).map(loanAccountMapper::toResponseDTO);
    }

    @Override
    @Transactional(readOnly = true)
    public LoanAccountResponseDTO getById(Long id) {
        LoanAccount entity = loanAccountRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Loan account not found with id: " + id));
        return loanAccountMapper.toResponseDTO(entity);
    }

    @Override
    public LoanAccountResponseDTO updateStatus(Long id, LoanAccountStatus status) {
        LoanAccount entity = loanAccountRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Loan account not found with id: " + id));
        entity.setStatus(status);
        entity = loanAccountRepository.save(entity);
        return loanAccountMapper.toResponseDTO(entity);
    }
}
