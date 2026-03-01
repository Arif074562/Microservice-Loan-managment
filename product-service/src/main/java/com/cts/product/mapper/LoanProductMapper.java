package com.cts.product.mapper;

import com.cts.product.dto.LoanProductRequestDTO;
import com.cts.product.dto.LoanProductResponseDTO;
import com.cts.product.entity.LoanProduct;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface LoanProductMapper {

    LoanProductResponseDTO toResponseDTO(LoanProduct entity);

    LoanProduct toEntity(LoanProductRequestDTO dto);

    List<LoanProductResponseDTO> toResponseDTOList(List<LoanProduct> entities);
}
