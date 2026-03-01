package com.cts.underwriting.mapper;

import com.cts.underwriting.dto.UnderwritingDecisionRequestDTO;
import com.cts.underwriting.dto.UnderwritingDecisionResponseDTO;
import com.cts.underwriting.entity.UnderwritingDecision;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface UnderwritingDecisionMapper {

    UnderwritingDecisionResponseDTO toResponseDTO(UnderwritingDecision entity);

    UnderwritingDecision toEntity(UnderwritingDecisionRequestDTO dto);

    List<UnderwritingDecisionResponseDTO> toResponseDTOList(List<UnderwritingDecision> entities);
}
