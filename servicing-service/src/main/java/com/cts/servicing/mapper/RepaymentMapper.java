package com.cts.servicing.mapper;

import com.cts.servicing.dto.RepaymentRequestDTO;
import com.cts.servicing.dto.RepaymentResponseDTO;
import com.cts.servicing.entity.Repayment;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface RepaymentMapper {

    RepaymentResponseDTO toResponseDTO(Repayment entity);

    Repayment toEntity(RepaymentRequestDTO dto);

    List<RepaymentResponseDTO> toResponseDTOList(List<Repayment> entities);
}
