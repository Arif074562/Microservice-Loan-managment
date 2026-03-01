package com.cts.customer.mapper;

import com.cts.customer.dto.LoanApplicationRequestDTO;
import com.cts.customer.dto.LoanApplicationResponseDTO;
import com.cts.customer.entity.LoanApplication;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface LoanApplicationMapper {

    LoanApplicationResponseDTO toResponseDTO(LoanApplication entity);

    LoanApplication toEntity(LoanApplicationRequestDTO dto);

    List<LoanApplicationResponseDTO> toResponseDTOList(List<LoanApplication> entities);
}
