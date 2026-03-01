package com.cts.customer.controller;

import com.cts.customer.common.ApiResponse;
import com.cts.customer.dto.LoanApplicationRequestDTO;
import com.cts.customer.dto.LoanApplicationResponseDTO;
import com.cts.customer.enums.ApplicationStatus;
import com.cts.customer.service.LoanApplicationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/loan-applications")
@RequiredArgsConstructor
@Slf4j
@Validated
public class LoanApplicationController {

    private final LoanApplicationService loanApplicationService;

    @PostMapping
    public ResponseEntity<ApiResponse<LoanApplicationResponseDTO>> submit(@Valid @RequestBody LoanApplicationRequestDTO request) {
        log.info("POST /api/loan-applications");
        LoanApplicationResponseDTO dto = loanApplicationService.submit(request);
        return ResponseEntity.ok(ApiResponse.success("Loan application submitted", dto));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<Page<LoanApplicationResponseDTO>>> list(Pageable pageable) {
        log.info("GET /api/loan-applications");
        Page<LoanApplicationResponseDTO> page = loanApplicationService.findAll(pageable);
        return ResponseEntity.ok(ApiResponse.success("Loan applications retrieved", page));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<LoanApplicationResponseDTO>> getById(@PathVariable Long id) {
        log.info("GET /api/loan-applications/{}", id);
        LoanApplicationResponseDTO dto = loanApplicationService.getById(id);
        return ResponseEntity.ok(ApiResponse.success("Loan application retrieved", dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<LoanApplicationResponseDTO>> update(@PathVariable Long id,
                                                                         @Valid @RequestBody LoanApplicationRequestDTO request) {
        log.info("PUT /api/loan-applications/{}", id);
        LoanApplicationResponseDTO dto = loanApplicationService.update(id, request);
        return ResponseEntity.ok(ApiResponse.success("Loan application updated", dto));
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<ApiResponse<LoanApplicationResponseDTO>> updateStatus(@PathVariable Long id,
                                                                               @RequestBody ApplicationStatus status) {
        log.info("PATCH /api/loan-applications/{}/status", id);
        LoanApplicationResponseDTO dto = loanApplicationService.updateStatus(id, status);
        return ResponseEntity.ok(ApiResponse.success("Status updated", dto));
    }

    @GetMapping("/customer/{cid}")
    public ResponseEntity<ApiResponse<List<LoanApplicationResponseDTO>>> getByCustomerId(@PathVariable("cid") Long customerId) {
        log.info("GET /api/loan-applications/customer/{}", customerId);
        List<LoanApplicationResponseDTO> list = loanApplicationService.getByCustomerId(customerId);
        return ResponseEntity.ok(ApiResponse.success("Loan applications retrieved", list));
    }
}
