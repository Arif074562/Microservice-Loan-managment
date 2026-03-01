package com.cts.disbursement.mapper;

import com.cts.disbursement.dto.DisbursementRequestDTO;
import com.cts.disbursement.dto.DisbursementResponseDTO;
import com.cts.disbursement.entity.Disbursement;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface DisbursementMapper {

    DisbursementResponseDTO toResponseDTO(Disbursement entity);

    Disbursement toEntity(DisbursementRequestDTO dto);

    List<DisbursementResponseDTO> toResponseDTOList(List<Disbursement> entities);
}
