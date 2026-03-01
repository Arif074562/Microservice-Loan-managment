package com.cts.product.mapper;

import com.cts.product.dto.EligibilityRuleRequestDTO;
import com.cts.product.dto.EligibilityRuleResponseDTO;
import com.cts.product.entity.EligibilityRule;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface EligibilityRuleMapper {

    EligibilityRuleResponseDTO toResponseDTO(EligibilityRule entity);

    EligibilityRule toEntity(EligibilityRuleRequestDTO dto);

    List<EligibilityRuleResponseDTO> toResponseDTOList(List<EligibilityRule> entities);
}
