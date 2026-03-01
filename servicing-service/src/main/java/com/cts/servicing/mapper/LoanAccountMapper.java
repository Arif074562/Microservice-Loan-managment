package com.cts.servicing.mapper;

import com.cts.servicing.dto.LoanAccountRequestDTO;
import com.cts.servicing.dto.LoanAccountResponseDTO;
import com.cts.servicing.entity.LoanAccount;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface LoanAccountMapper {

    LoanAccountResponseDTO toResponseDTO(LoanAccount entity);

    LoanAccount toEntity(LoanAccountRequestDTO dto);

    List<LoanAccountResponseDTO> toResponseDTOList(List<LoanAccount> entities);
}
